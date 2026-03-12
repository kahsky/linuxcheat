# Linux Cheat Sheet — Basic (`linuxcheat-basic@kahsky`)

A Cinnamon panel applet that displays essential Linux commands in a large multi-column popup, like a printed cheat sheet. Click any command to copy it to the clipboard.

> *"One is glad to be of service."* — Bicentennial Man

**Author:** Karl Bustamante (kahsky)
**License:** GNU General Public License v3.0

---

## Features

- All commands visible at once in a **3-column layout** (no submenus)
- 6 color-coded categories: Terminal, System, Apache, Packages APT, Files
- Each entry shows: command + description + usage example
- Click a command → copies it to clipboard + desktop notification
- **Bilingual:** English (default) / French — switchable in settings

### Available translations

| Language | Code | Status |
|----------|------|--------|
| English  | `en` | ✓ Default |
| French   | `fr` | ✓ Available |

### Included commands

| Category | Commands |
|----------|----------|
| **Terminal** | `clear`, `ll`, `df -h`, `uname -r`, `cd ~`, `grep`, `tail -f`, `pkill`, `cp`, `touch`, `nano` |
| **System** | `sudo reboot`, `sudo shutdown now`, `chown -R`, `chmod -R` |
| **Apache** | `systemctl restart/status/stop/start apache2`, `apache2ctl configtest` |
| **Packages APT** | `apt update`, `apt upgrade`, `apt install`, `apt remove`, `apt autoremove` |
| **Files** | `find`, `tar -czf`, `tar -xzf`, `rm -rf`, `mkdir -p` |

---

## Installation

### Method 1 — Manual (recommended)

1. Copy the applet folder into your Cinnamon applets directory:

```bash
cp -r linuxcheat-basic@kahsky ~/.local/share/cinnamon/applets/
```

2. Restart Cinnamon:

```bash
cinnamon --replace &
```

3. Right-click the panel → **Add applets to the panel**
4. Search for **Linux Cheat Sheet (Basic)** and click **+**

### Method 2 — From this repository

```bash
git clone https://github.com/kahsky/linux-cheat-applets.git
cp -r linux-cheat-applets/linuxcheat-basic@kahsky ~/.local/share/cinnamon/applets/
cinnamon --replace &
```

---

## Changing the Language

Right-click the applet icon in the panel → **Configure** → select **English** or **Français**.

The popup rebuilds instantly.

---

## Files

| File | Description |
|------|-------------|
| `applet.js` | Main applet logic |
| `metadata.json` | Applet metadata (UUID, name, version) |
| `settings-schema.json` | Settings definition (language selector) |
| `README.md` | This file |
| `LICENSE` | GNU GPL v3 license |

---

## License

This program is free software: you can redistribute it and/or modify it under the terms of the **GNU General Public License** as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

See the [LICENSE](LICENSE) file for the full license text.
