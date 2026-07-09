---
title: NVIDIA Proprietary Drivers on Fedora Sway
date: "2026-06-10"
description: How I installed NVIDIA proprietary drivers on Fedora Sway — RPM Fusion, kernel parameters, ly, and a custom Sway session after GDM and SDDM failed.
tags:
  - fedora
  - sway
  - nvidia
  - linux
  - wayland
  - drivers
  - guide
  - ly
---

Sway does not officially support NVIDIA's proprietary driver. I run it anyway on Fedora — but not with the stock session and not with GDM or SDDM. Both of those gave me a black screen after the proprietary driver was installed: login manager visible, session starts, no picture.

This post documents the setup that actually works on my machine, in the order I applied it.

## System and hardware

This guide was written and tested on the following setup. If your GPU or driver branch differs, the overall flow should still apply — but your package names may vary.

**Current system:**

| | |
|---|---|
| OS | Fedora 44 |
| Kernel | `7.1.3-200.fc44.x86_64` |
| Desktop | Sway (custom session) |
| Display manager | ly |
| GPU | NVIDIA GeForce RTX 3060 Ti |
| Driver packages | `akmod-nvidia-595.80`, `xorg-x11-drv-nvidia-595.80`, `xorg-x11-drv-nvidia-cuda-595.80` |

**GPUs and driver branches I tried:**

| GPU | Driver branch | Notes |
|---|---|---|
| GTX 1060 | `akmod-nvidia-580xx` / `xorg-x11-drv-nvidia-580xx` | Early attempts on Pascal; installed and removed a few times while debugging |
| RTX 3060 Ti | `akmod-nvidia` / `xorg-x11-drv-nvidia-cuda` (595.xx) | Current machine; same Sway + ly + kernel param setup |

The 580xx packages were specific to the GTX 1060 period. On the RTX 3060 Ti I switched to the rolling `akmod-nvidia` package, which tracks the latest RPM Fusion branch (595.80 at the time of writing). Kernel parameters, `nvidia.conf`, and the custom Sway session did not change between the two cards.

## 1. Enable RPM Fusion (nonfree)

Fedora does not ship the proprietary NVIDIA driver. I only added the **nonfree** RPM Fusion repo — that was enough for the NVIDIA packages I needed.

From my shell history:

```bash
sudo dnf install https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
```

After that, these repo files showed up under `/etc/yum.repos.d/`:

- `rpmfusion-nonfree.repo`
- `rpmfusion-nonfree-updates.repo`
- `rpmfusion-nonfree-updates-testing.repo` (disabled by default)

The enabled ones I actually use:

```
rpmfusion-nonfree
rpmfusion-nonfree-updates
```

No separate `rpmfusion-free` repo on my system — nonfree alone covered the driver install.

## 2. Install the proprietary driver

Once RPM Fusion was in place, on the RTX 3060 Ti I installed:

```bash
sudo dnf install akmod-nvidia xorg-x11-drv-nvidia-cuda
```

On the older GTX 1060 setup I had previously used the 580xx branch instead:

```bash
sudo dnf install akmod-nvidia-580xx xorg-x11-drv-nvidia-580xx
```

Pick the branch that matches your GPU generation in RPM Fusion. The rolling `akmod-nvidia` package is what I run today on the 3060 Ti (595.80).
Reboot. Then confirm the module loaded:

```bash
nvidia-smi
lsmod | grep nvidia
```

If `nvidia-smi` fails, check `/var/log/akmods/` before touching anything Sway-related.

## 3. Kernel parameters

I did not use a modprobe drop-in. The full `GRUB_CMDLINE_LINUX` line from `/etc/default/grub` on my system:

```
GRUB_CMDLINE_LINUX="rhgb quiet nvidia-drm.modeset=1 rd.driver.blacklist=nouveau,nova_core modprobe.blacklist=nouveau,nova_core"
```

What each part does:

- `nvidia-drm.modeset=1` — kernel mode setting for Wayland
- `rd.driver.blacklist=nouveau,nova_core` — keep the open-source driver off at early boot
- `modprobe.blacklist=nouveau,nova_core` — same blacklist once the system is up

After editing `/etc/default/grub`, regenerate the bootloader config and reboot:

```bash
sudo grub2-mkconfig -o /boot/grub2/grub.cfg
sudo reboot
```

Verify modesetting after boot:

```bash
cat /sys/module/nvidia_drm/parameters/modeset
```

You want `Y`.

## 4. NVIDIA environment variables

Sway needs a few wlroots/NVIDIA variables. Mine live in `~/.config/environment.d/nvidia.conf`:

```
WLR_NO_HARDWARE_CURSORS=1
GBM_BACKEND=nvidia-drm
__GLX_VENDOR_LIBRARY_NAME=nvidia
```

`WLR_NO_HARDWARE_CURSORS=1` fixes the invisible cursor. Without it I had a working desktop and no pointer.

## 5. Why a custom Sway session — and why ly

Stock **GDM** and **SDDM** both failed with the proprietary driver: black screen at login, no output at all. The display manager itself was not usable on my setup.

The fix was a TTY-based display manager. I installed **ly** — minimal, runs on a TTY, no graphical greeter fighting the NVIDIA stack.

Then I created a **Sway (Custom)** session instead of using the default `sway.desktop`. Reasons:

- Sway refuses proprietary NVIDIA unless you pass `--unsupported-gpu`
- I needed a single entry point that sets Wayland env vars and starts Sway correctly
- A custom `.desktop` file survives package updates better than patching the stock one

### Session desktop file

`/usr/share/wayland-sessions/sway-custom.desktop`:

```ini
[Desktop Entry]
Name=Sway (Custom)
Comment=An i3-compatible Wayland compositor
Exec=/home/osman/start-sway.sh
Type=Application
```

Adjust the `Exec=` path to wherever you put your startup script.

### Startup script

`~/start-sway.sh`:

```bash
#!/bin/bash
# Export Wayland variables
export XDG_CURRENT_DESKTOP=sway
export XDG_SESSION_TYPE=wayland
export MOZ_ENABLE_WAYLAND=1
export CLUTTER_BACKEND=wayland

# Optional: Disable hardware cursor if you experience flickering
# export WLR_NO_HARDWARE_CURSORS=1

# Execute sway inside a dbus-run-session
exec dbus-run-session sway --unsupported-gpu
```

Make it executable:

```bash
chmod +x ~/start-sway.sh
```

I keep `WLR_NO_HARDWARE_CURSORS` in `~/.config/environment.d/nvidia.conf` instead of the script — one place for NVIDIA-specific vars, script for session bootstrap only.

At the ly login screen, select **Sway (Custom)** and log in.

## 6. Verify

Quick checks after login:

```bash
echo $GBM_BACKEND
echo $WLR_NO_HARDWARE_CURSORS
nvidia-smi
swaymsg -t get_version
```

You should see the NVIDIA driver active, environment variables set, and Sway running without the proprietary-driver refusal message.

## Common problems

| Symptom | What I checked |
|---|---|
| Black screen at GDM/SDDM | Switched to ly + custom Sway session |
| Sway refuses to start | Missing `--unsupported-gpu` |
| Invisible cursor | `WLR_NO_HARDWARE_CURSORS=1` in `environment.d` |
| `nvidia-smi` fails after kernel update | `akmods` rebuild — reboot and check `/var/log/akmods/` |
| Driver vs nouveau conflict | Kernel blacklist params in GRUB |

Logs when stuck:

```bash
journalctl -b | grep -iE 'nvidia|sway|ly'
```

## Closing notes

This is not an officially supported configuration. Sway upstream and the Fedora Sway spin both distance themselves from proprietary NVIDIA. I document it because it is what runs on my machine — ly on a TTY, custom session, RPM Fusion nonfree, and explicit kernel blacklists for nouveau.

If you want fewer moving parts on Fedora, GNOME or KDE handle NVIDIA with less friction. I wanted Sway, so I accepted the workarounds.
