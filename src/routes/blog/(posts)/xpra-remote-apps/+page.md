---
title: Running Remote App GUIs Locally with Xpra
date: "2026-07-08"
description: How I forward individual application windows from a remote Linux machine to my local Fedora desktop using Xpra over SSH.
tags:
  - fedora
  - xpra
  - remote
  - linux
  - gui
  - ssh
  - guide
---

I have a remote Linux machine I SSH into regularly. Most of the time a terminal is enough. Sometimes I need a GUI — Chrome for a site that only works there, Discord while something else runs on the remote box.

[Xpra](https://xpra.org/) forwards individual application windows over the network. The app runs on the remote host; the window shows up on my local desktop as if it were native. One command, one window.

This post documents the setup I actually use.

## System

| | |
|---|---|
| Local OS | Fedora 44 |
| Local desktop | Sway (Wayland) |
| Xpra client | `xpra v6.5.1-r0` |
| Remote access | SSH |
| Remote host | Linux machine on my LAN (`192.168.1.100`) |

Xpra is installed on **both** sides. The `ssh://` syntax handles starting the remote server when needed — you do not manually launch `xpra start` on the remote first.

## What Xpra does

- Run a program on the remote machine inside an Xpra session
- Forward that program's window(s) to your local display

Think of it as `screen` or `tmux`, but for GUI windows.

## 1. Install Xpra on Fedora

Fedora does not host Xpra packages in its official repos. The Xpra project publishes a Fedora repo on GitHub — add that, then install:

```bash
REPO="xpra"
sudo wget -O /etc/yum.repos.d/xpra.repo \
  https://raw.githubusercontent.com/Xpra-org/xpra/master/packaging/repos/Fedora/${REPO}.repo
sudo dnf install xpra
```

The repo file also documents `xpra-lts` and `xpra-beta` variants — I stuck with `xpra` (stable).

Confirm the install:

```bash
xpra --version
```

On my machine that prints `xpra v6.5.1-r0`.

Install the same package on the remote host. SSH access between the two machines must already work — Xpra piggybacks on that.

## 2. Start a session

The simplest invocation opens a remote Xpra session and attaches your local client:

```bash
xpra start ssh://osman@192.168.1.100
```

Replace the user and address with your SSH target — hostname, IP, or `~/.ssh/config` alias all work.

The first run may take a few seconds while Xpra starts the server process on the remote side over SSH. After that, you get a session with no application yet — useful if you want to launch things manually inside it.

## 3. Launch a specific application

This is what I use day to day. One flag, one app:

```bash
xpra start ssh://osman@192.168.1.100 --start google-chrome-stable
```

Another from my history:

```bash
xpra start ssh://osman@192.168.1.100 --start discord
```

The remote Xpra server starts, runs the command on the remote machine, and the window appears locally. Chrome and Discord both worked without extra configuration on my setup.

You can pass any command the remote shell understands. If the binary is not in the default `PATH` for non-interactive SSH, use the full path or wrap it in a script.

## 4. Verify

After `xpra start ssh://... --start <app>`, the application window should appear on your local desktop within a few seconds.

If the window never shows up, check SSH first (`ssh osman@192.168.1.100 echo ok`) before debugging Xpra.

## For more information

See the [Xpra documentation](https://xpra.org/) for session management, compression, codecs, and troubleshooting beyond what I use here.
