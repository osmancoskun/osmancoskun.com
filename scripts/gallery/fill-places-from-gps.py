#!/usr/bin/env python3
"""Fill gallery photo place fields from GPS EXIF via reverse geocoding.

Usage:
  ./scripts/gallery/fill-places-from-gps.py 2025-06-baku ~/Downloads
  ./scripts/gallery/fill-places-from-gps.py 2025-06-baku ~/Downloads --dry-run

Requires exiftool. Uses OpenStreetMap Nominatim (1 req/s).
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
import time
import urllib.parse
import urllib.request
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
ENTRIES_DIR = ROOT / "src/lib/gallery/entries"
USER_AGENT = "osmancoskun.com-gallery/1.0 (personal photo gallery)"
GEocode_CACHE: dict[tuple[float, float], dict] = {}


def parse_args() -> argparse.Namespace:
	parser = argparse.ArgumentParser(description=__doc__)
	parser.add_argument("slug", help="Album slug, e.g. 2025-06-baku")
	parser.add_argument("sources", type=Path, help="Directory with original photos")
	parser.add_argument(
		"--glob",
		action="append",
		default=[],
		help="Source glob (repeatable). Default: common image extensions",
	)
	parser.add_argument(
		"--exclude",
		action="append",
		default=[],
		help="Basenames to skip, e.g. IMG_0960.JPEG",
	)
	parser.add_argument(
		"--dry-run",
		action="store_true",
		help="Print changes without writing JSON",
	)
	return parser.parse_args()


def load_album(slug: str) -> tuple[Path, dict]:
	path = ENTRIES_DIR / f"{slug}.json"
	if not path.exists():
		raise SystemExit(f"Album entry not found: {path}")
	return path, json.loads(path.read_text())


def source_files(sources: Path, patterns: list[str], exclude: set[str]) -> list[Path]:
	if not sources.is_dir():
		raise SystemExit(f"Sources directory not found: {sources}")

	if patterns:
		files: list[Path] = []
		for pattern in patterns:
			files.extend(sources.glob(pattern))
	else:
		files = []
		for ext in ("*.jpg", "*.jpeg", "*.JPG", "*.JPEG", "*.heic", "*.HEIC", "*.png", "*.webp"):
			files.extend(sources.glob(ext))

	unique = sorted({path.resolve() for path in files if path.name not in exclude})
	return unique


def exif_datetime_key(iso: str) -> datetime:
	return datetime.fromisoformat(iso).replace(tzinfo=None)


def read_exif(path: Path) -> tuple[float, float, datetime] | None:
	result = subprocess.run(
		["exiftool", "-n", "-GPSLatitude", "-GPSLongitude", "-DateTimeOriginal", str(path)],
		capture_output=True,
		text=True,
	)
	if result.returncode != 0:
		return None

	values: dict[str, str] = {}
	for line in result.stdout.splitlines():
		if ":" not in line:
			continue
		key, value = line.split(":", 1)
		values[key.strip()] = value.strip()

	lat_raw = values.get("GPS Latitude")
	lon_raw = values.get("GPS Longitude")
	dt_raw = values.get("Date/Time Original")
	if not lat_raw or not lon_raw or not dt_raw:
		return None

	return float(lat_raw), float(lon_raw), datetime.strptime(dt_raw, "%Y:%m:%d %H:%M:%S")


def reverse_geocode(lat: float, lon: float) -> dict:
	key = (round(lat, 4), round(lon, 4))
	if key in GEocode_CACHE:
		return GEocode_CACHE[key]

	query = urllib.parse.urlencode(
		{
			"format": "jsonv2",
			"lat": lat,
			"lon": lon,
			"zoom": 18,
			"addressdetails": 1,
		}
	)
	request = urllib.request.Request(
		f"https://nominatim.openstreetmap.org/reverse?{query}",
		headers={"User-Agent": USER_AGENT, "Accept-Language": "en"},
	)
	with urllib.request.urlopen(request, timeout=30) as response:
		data = json.load(response)

	GEocode_CACHE[key] = data
	time.sleep(1.05)
	return data


def place_label(data: dict, fallback: str | None) -> str:
	address = data.get("address", {})
	name = data.get("name")
	category = data.get("category")
	skip = {fallback.lower(), "baku", "baki"} if fallback else {"baku", "baki"}

	if name and category in {"tourism", "amenity", "historic", "building", "leisure", "shop"}:
		return name

	for key in ("neighbourhood", "suburb", "quarter", "city_district", "district", "borough"):
		value = address.get(key)
		if value and value.lower() not in skip:
			return value

	road = address.get("road") or address.get("pedestrian")
	suburb = address.get("suburb") or address.get("neighbourhood")
	if road and suburb and suburb.lower() not in skip:
		return f"{road}, {suburb}"
	if road:
		return road

	for key in ("city", "town", "village", "municipality"):
		value = address.get(key)
		if value:
			return value

	return fallback or data.get("display_name", "").split(",")[0]


def format_alt_date(iso: str) -> str:
	dt = datetime.fromisoformat(iso)
	return dt.strftime("%-d %B %Y") if sys.platform != "win32" else dt.strftime("%#d %B %Y")


def build_source_index(files: list[Path]) -> dict[datetime, tuple[Path, float, float]]:
	index: dict[datetime, tuple[Path, float, float]] = {}
	for path in files:
		exif = read_exif(path)
		if exif is None:
			print(f"skip (no GPS/datetime): {path.name}", file=sys.stderr)
			continue
		lat, lon, taken_at = exif
		index[taken_at] = (path, lat, lon)
	return index


def main() -> None:
	args = parse_args()
	entry_path, album = load_album(args.slug)
	fallback = album.get("place")
	files = source_files(args.sources, args.glob, set(args.exclude))
	source_index = build_source_index(files)

	if not source_index:
		raise SystemExit("No source files with GPS/datetime found.")

	updated = 0
	missing = 0

	for photo in album["photos"]:
		taken_at = exif_datetime_key(photo["takenAt"])
		match = source_index.get(taken_at)
		if match is None:
			print(f"no source match: photo {photo['id']} ({photo['takenAt']})", file=sys.stderr)
			missing += 1
			continue

		source_path, lat, lon = match
		label = place_label(reverse_geocode(lat, lon), fallback)
		old_place = photo.get("place")
		old_alt = photo.get("alt")

		if old_place == label and old_alt == f"{label}, {format_alt_date(photo['takenAt'])}":
			print(f"{photo['id']} unchanged: {label}")
			continue

		photo["place"] = label
		photo["alt"] = f"{label}, {format_alt_date(photo['takenAt'])}"
		updated += 1
		print(f"{photo['id']} {source_path.name} -> {label}")

	if missing:
		print(f"\n{missing} photo(s) could not be matched.", file=sys.stderr)

	if args.dry_run:
		print(f"\nDry run: {updated} photo(s) would be updated.")
		return

	if updated == 0:
		print("No changes.")
		return

	entry_path.write_text(json.dumps(album, indent="\t", ensure_ascii=False) + "\n")
	print(f"\nUpdated {updated} photo(s) in {entry_path.relative_to(ROOT)}")


if __name__ == "__main__":
	main()
