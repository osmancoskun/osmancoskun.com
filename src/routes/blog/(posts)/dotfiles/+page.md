---
title: My Dotfiles
date: "2026-08-14"
description: My personal dotfiles — Sway, Waybar, Vim, Alacritty, and a setup script that links everything with GNU Stow.
tags:
  - dotfiles
  - sway
  - waybar
  - vim
  - linux
  - fedora
  - guide
---

I keep my desktop configs in a public repo: [github.com/osmancoskun/dotfiles](https://github.com/osmancoskun/dotfiles).

It is a Sway + Waybar setup with a small setup script. I tested it on Fedora, Debian/Ubuntu, and Arch. This post explains what is in the repo and how I use it. It is not a copy of the README.

## Repo layout

Everything is in one stow package:

```
~/.dotfiles/
├── home/                 # stow package → symlinked into $HOME
│   ├── .vimrc
│   └── .config/
│       ├── alacritty/
│       ├── sway/
│       └── waybar/
├── setup.sh              # setup script with menu
├── lib/                  # shell files used by setup.sh
├── tui/menu.sh           # text menu
├── scripts/setup/        # helper scripts
└── docker/               # test setup.sh in clean containers
```

The `home/` folder is the main part. Clone the repo, then:

```bash
git clone https://github.com/osmancoskun/dotfiles.git ~/.dotfiles
cd ~/.dotfiles
stow --restow --target="$HOME" home
```

Every file under `home/` becomes a symlink in `$HOME`. After `git pull`, run `stow --restow` again to update links. To remove links: `stow --delete --target="$HOME" home`.

If you only want the configs, that is all you need.

## Setup script

`setup.sh` helps set up a new machine. Run it with no arguments to open a menu:

```
  1) Update system
  2) Repository packages (git, jq, Node.js, yarn, pnpm, …)
  3) Third-party applications (Chrome, VS Code, Cursor, Discord, …)
  4) Dotfiles & shell (Oh My Zsh, chsh to zsh)
  5) Monitors — Sway (layout / outputs)
  6) Wallpaper (Bing / NASA / Wikipedia — swaybg)
  7) Waybar config — link ~/.config/waybar from dotfiles
  Q) Quit
```

You can also run each step directly:

```bash
./setup.sh repo       # pick repo packages
./setup.sh apps       # pick third-party apps
./setup.sh dotfiles   # Oh My Zsh + chsh
./setup.sh monitors   # Sway monitor wizard
./setup.sh wallpaper  # daily wallpaper installer
./setup.sh waybar     # link waybar config
```

For scripts, you can skip the menu and pass env vars:

```bash
REPO_APPS=git,jq,ripgrep,nodejs,yarn   ./setup.sh repo-install
DESKTOP_APPS=chrome,vscode,cursor      ./setup.sh apps-install
DOTFILES_APPS=omz,chsh                 ./setup.sh dotfiles-install
```

Logs go to `~/setup.log`. Third-party repos (Chrome, VS Code, Cursor, Cloudflare WARP, …) are added only when you pick one of those apps. If you only pick repo packages, no third-party repo is added.

The `lib/` folder has the code behind the menu: `detect.sh` finds your distro, `repo-packages.sh` and `desktop-apps.sh` handle the pickers, `repos.sh` adds third-party repos, `omz.sh` / `shell.sh` handle the shell step.

### What each step installs

You choose what to install. Nothing installs unless you pick it in the menu or pass keys in env vars.

**Step 2 — repository packages** (`./setup.sh repo` / `REPO_APPS=…`)

Only packages from your distro repos. No third-party repos.

| Key | What you get |
|---|---|
| `git` | Git |
| `openssh` | OpenSSH client (`ssh`, `scp`) |
| `nc` | netcat |
| `nettools` | `net-tools` + `iproute` |
| `jq` | jq |
| `htop` | htop |
| `ripgrep` | ripgrep (`rg`) |
| `fd` | fd |
| `bat` | bat |
| `zip` | zip + unzip |
| `tree` | tree |
| `build` | gcc, make (and C++ on Fedora) |
| `dnsutils` | dig / nslookup |
| `python` | Python 3 + pip |
| `nodejs` | Node.js + npm (from distro) |
| `yarn` | Yarn (from distro) |
| `pnpm` | pnpm (from distro) |

**Step 3 — third-party applications** (`./setup.sh apps` / `DESKTOP_APPS=…`)

Native packages only — **no Flatpak**. A third-party repo is added only for apps you pick.

| Key | App | Notes |
|---|---|---|
| `chrome` | Google Chrome (stable) | Adds Google repo |
| `vscode` | Visual Studio Code | Adds Microsoft repo |
| `warp` | Cloudflare WARP (`warp-cli`) | Adds Cloudflare repo |
| `cloudflared` | cloudflared | Downloads from GitHub if not in repos |
| `cursor` | Cursor | Adds Cursor repo |
| `discord` | Discord | RPM Fusion on Fedora; direct `.deb` on Debian |

**Step 4 — dotfiles & shell** (`./setup.sh dotfiles` / `DOTFILES_APPS=…`)

| Key | What it does |
|---|---|
| `omz` | Oh My Zsh + three plugins: `zsh-autosuggestions`, `zsh-syntax-highlighting`, `zsh-history-substring-search` |
| `chsh` | Sets default shell to zsh (install zsh first) |

Step 4 does **not** run `stow` or link configs. You still do that by hand (see above).

**Steps 5–7 — Sway helpers**

These set up parts of your machine. They do not install Sway:

- **5 Monitors** — wizard that writes a `config.d/` file for your screens
- **6 Wallpaper** — installs `wallpaper-daily.env` + sway autostart; you need `swaybg` and `curl` from your distro
- **7 Waybar** — links `~/.config/waybar` from the repo

Steps 5 and 7 are greyed out in the menu if `sway` is not installed.

### What setup.sh does not install

The setup script is for CLI tools, third-party apps, and shell setup. It does not install your full desktop or link dotfiles for you.

| Not included | How I get it |
|---|---|
| GNU Stow + symlinks | By hand: `stow --restow --target="$HOME" home` after clone |
| Sway, Waybar, Alacritty, Rofi | From my distro — I install them myself |
| NVIDIA drivers, display manager | Not in this repo (see my [Fedora Sway NVIDIA](/blog/fedora-sway-nvidia) post) |
| Flatpak apps | Not in `setup.sh` on purpose |
| A `.zshrc` in the repo | Step 4 only installs the Oh My Zsh template; my zsh config is not in the repo yet |
| Vim plugins | vim-plug installs them on first `vim` run, not via `setup.sh` |

For configs only: install `git` + `stow`, clone, and stow. Everything else is optional.

## Sway

Sway config is split between `home/.config/sway/config` and small files in `config.d/`. Files load in name order — the number at the start sets the order.

| Prefix | What it does |
|---|---|
| `10-*` | systemd session / cgroups |
| `50-*` | Window rules (browser, pavucontrol, polkit) + dual-monitor layout |
| `60-*` | Volume, brightness, media, screenshot keys |
| `65-*` | Pass-through mode for VMs |
| `90-*` | Start Waybar, swayidle |
| `91-*` | Daily wallpaper script |
| `95-*` | XDG autostart, polkit agent, user dirs |
| `99-*` | Solid colour background (fallback) |

The main `config` is mostly default Sway with a few changes: `$mod` on Super, vim-style `hjkl` keys, Alacritty as terminal, Rofi as launcher (`$mod+d`).

Window rules are in separate files — easy to turn on, off, or move. Dual-monitor layout starts from `50-dual-monitor-layout.conf`:

```ini
exec_always bash -c '"$HOME/.config/sway/scripts/apply-dual-monitor-layout.sh" >/dev/null 2>&1 &'
```

Reload after edits: `Mod+Shift+c`.

## Scripts

There are three groups of scripts.

### Sway — `home/.config/sway/scripts/`

**`apply-dual-monitor-layout.sh`** — sets up a 4K + 2K dual monitor layout. Runs from the sway config above. Logs to `~/.local/state/sway-dual-monitor.log`. Needs `jq` and `swaymsg`.

**`wallpaper-daily.sh`** — downloads daily wallpapers from Bing, NASA APOD, and/or Wikipedia, then shows them with `swaybg`. Saves files by date in `WALLPAPER_DATA_DIR`. Runs in the background from `config.d/91-wallpaper-daily.conf`.

Useful commands:

```bash
wallpaper-daily.sh --once          # download and apply today, then exit
wallpaper-daily.sh --daemon        # change wallpaper on a timer
wallpaper-daily.sh --apply FILE    # use a local image file
```

Settings are in `~/.config/sway/wallpaper-daily.env` (created by `./setup.sh wallpaper`):

```bash
WALLPAPER_PROVIDERS=bing,nasa
WALLPAPER_ROTATE_SEC=300
WALLPAPER_DATA_DIR="$HOME/.local/share/wallpapers/daily"
```

Note: `99-background-solid.conf` loads after `91-wallpaper-daily.conf`. If you never see wallpapers, the solid background may be covering them — turn off or delete that file.

### Waybar — `home/.config/waybar/`

**`disk-mounts.sh`** — shows disk used/total. Click to switch between disks. USB disks are added automatically.

```bash
DISKS=(/dev/nvme1n1 /dev/nvme0n1)   # change for your machine
```

**`net-cycle.sh`** — shows network icon + IP. Click to switch interface. Skips `lo`, `docker*`, `veth*`, etc.

Both scripts print JSON. `config.jsonc` already has `"return-type": "json"`.

### Setup helpers — `scripts/setup/`

| Script | What it does |
|---|---|
| `monitors.sh` | Sway monitor wizard |
| `wallpaper.sh` | Installs env file + sway autostart |
| `waybar.sh` | Links `~/.config/waybar` from the repo |

## Waybar

`config.jsonc` defines the bar layout and connects the custom modules above. `style.css` sets colours and size.

The disk tooltip shows `lsblk --tree` in a fixed-width font. The network module only shows real interfaces — not every Docker or libvirt interface.

After config changes: `pkill -SIGUSR2 waybar` or reload sway.

## Vim

`home/.vimrc` is a full Vim setup. [vim-plug](https://github.com/junegunn/vim-plug) installs itself on first run and downloads plugins with `PlugInstall --sync`. First run can take a while.

Leader key is Space. Undo is saved in `~/.vim/undodir`. Clipboard works with `unnamedplus`. No swap files.

### Plugins

**UI & theme**

| Plugin | What it does |
|---|---|
| `morhetz/gruvbox` | Colours |
| `vim-airline/vim-airline` + themes | Status line |
| `ryanoasis/vim-devicons` | File icons |

**Files & search**

| Plugin | What it does |
|---|---|
| `junegunn/fzf` + `fzf.vim` | File search (`<leader>ff`, `<leader>fg`, …) |
| `preservim/nerdtree` | File tree (`<leader>e`) |

**Editing**

| Plugin | What it does |
|---|---|
| `tpope/vim-surround` | Change brackets/quotes around text |
| `tpope/vim-commentary` | Comment / uncomment |
| `jiangmiao/auto-pairs` | Auto-close brackets |
| `mattn/emmet-vim` | HTML/CSS shortcuts (works with Svelte/HTML) |

**Languages & LSP (coc.nvim)**

| Plugin | What it does |
|---|---|
| `neoclide/coc.nvim` | LSP (code help) |
| `sheerun/vim-polyglot` | More syntax highlighting |
| `pangloss/vim-javascript` | JavaScript |
| `HerringtonDarkholme/yats.vim` | TypeScript |
| `maxmellon/vim-jsx-pretty` | JSX/React |
| `evanleck/vim-svelte` | **Svelte syntax** |
| `prettier/vim-prettier` | Format with Prettier |

**Git**

| Plugin | What it does |
|---|---|
| `tpope/vim-fugitive` | Git commands |
| `airblade/vim-gitgutter` | Show git changes in the margin |

**Other**

| Plugin | What it does |
|---|---|
| `kamykn/spelunker.vim` | Spell check |
| `sedm0784/vim-you-autocorrect` | Auto-correct (off by default, `<leader>a` to toggle) |
| `rishi-opensource/vim-claude-code` | Claude Code CLI in a split window |

### Svelte in Vim

Three things handle Svelte files:

1. **Syntax** — `evanleck/vim-svelte` highlights `.svelte` files
2. **LSP** — `coc-svelte` gives code completion and go-to-definition (installs with `:CocInstall` on first run)
3. **Format** — Prettier runs on save for `*.svelte`

coc extensions in `.vimrc`:

```
coc-tsserver, coc-json, coc-html, coc-css, coc-eslint,
coc-prettier, coc-pyright, coc-svelte, coc-snippets,
coc-pairs, coc-highlight, coc-spell-checker
```

Emmet treats Svelte like HTML — in `.vimrc`:

```
let g:user_emmet_settings = {
\  'svelte' : { 'extends' : 'html' },
\}
```

Web files (including Svelte) use 2-space tabs. Prettier on save for `*.js`, `*.jsx`, `*.ts`, `*.tsx`, `*.css`, `*.html`, `*.svelte`, `*.json`, and `*.py`.

### Keys I use most

| Key | Action |
|---|---|
| `<leader>ff` | Search files (FZF) |
| `<leader>fg` | Search in files (ripgrep) |
| `<leader>e` | Open/close file tree |
| `<leader>f` | Format code (coc) |
| `<leader>p` | Prettier format |
| `gd` / `gr` | Go to definition / find references |
| `K` | Show docs (coc, or `man` if no docs) |
| `<leader>rn` | Rename symbol |

### Tools Vim needs

Some plugins need CLI tools on your system. Many are the same as step 2 in `setup.sh`:

| Used by | Tool |
|---|---|
| FZF search | `ripgrep` (`rg`) |
| coc.nvim / Prettier | Node.js + npm |
| coc extensions | Installed inside Vim on first run |
| Git plugins | `git` |

The dotfiles repo does not install these. Pick `nodejs`, `ripgrep`, and `git` in menu step 2, or install them yourself.

## Alacritty

Very small config — `home/.config/alacritty/alacritty.toml`:

```toml
[font]
size = 12.0
[font.normal]
family = "Cascadia Code"
style = "Regular"
```

That is all. Sway uses Alacritty as the terminal. Everything else is default.

## Docker tests

`docker/` runs `setup.sh` in clean Fedora, Debian, and Arch containers:

```bash
./docker/run-smoke.sh              # Fedora (default)
./docker/run-smoke.sh debian
./docker/run-smoke.sh arch
./docker/run-smoke.sh all
```

The repo is mounted read-only at `/dotfiles`. Only the container changes. Good for checking that `setup.sh` still works without touching your real machine.

## Updating

```bash
cd ~/.dotfiles
git pull
stow --restow --target="$HOME" home
```

Reload sway (`Mod+Shift+c`) or restart waybar after config changes.

## More info

All details — every config file, env var, and setup step — are in the [repo README](https://github.com/osmancoskun/dotfiles). License is [WTFPL v2](https://github.com/osmancoskun/dotfiles/blob/main/LICENSE).
