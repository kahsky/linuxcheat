const St = imports.gi.St;
const GLib = imports.gi.GLib;
const Applet = imports.ui.applet;
const PopupMenu = imports.ui.popupMenu;
const Settings = imports.ui.settings;

const UUID = "linuxcheat-basic@kahsky";

// ─── Données bilingues ─────────────────────────────────────────────────────────
const COLUMNS = [
    {
        key: "terminal",
        en: "Terminal", fr: "Terminal",
        hdr: "#27ae60", cmd_color: "#2ecc71", bg: "rgba(46,204,113,0.08)", border: "#27ae60",
        items: [
            { cmd: "clear",       en: "Clears the terminal screen",              fr: "Efface l'écran du terminal",              ex: "clear" },
            { cmd: "ll",          en: "Detailed file list (alias ls -la)",       fr: "Liste détaillée (alias ls -la)",           ex: "ll /var/www" },
            { cmd: "df -h",       en: "Available disk space",                    fr: "Espace disque disponible",                 ex: "df -h" },
            { cmd: "uname -r",    en: "Linux kernel version",                    fr: "Version du kernel Linux",                  ex: "uname -r" },
            { cmd: "cd ~",        en: "Go to home folder",                       fr: "Aller dans le dossier home",               ex: "cd ~" },
            { cmd: "grep",        en: "Search text in a file",                   fr: "Rechercher du texte dans un fichier",      ex: 'grep "error" /var/log/syslog' },
            { cmd: "tail -f",     en: "Follow end of a file in real time",       fr: "Lire la fin d'un fichier en direct",       ex: "tail -f /var/log/apache2/error.log" },
            { cmd: "pkill",       en: "Kill a process by name",                  fr: "Tuer un processus par son nom",            ex: "pkill firefox" },
            { cmd: "cp",          en: "Copy a file or folder",                   fr: "Copier un fichier ou dossier",             ex: "cp -r /src /dest" },
            { cmd: "touch",       en: "Create an empty file or update timestamp",fr: "Créer un fichier vide ou mettre à jour sa date", ex: "touch fichier.txt" },
            { cmd: "nano",        en: "Terminal text editor",                    fr: "Éditeur de texte en terminal",             ex: "nano /etc/hosts" },
        ]
    },
    {
        key: "system",
        en: "System", fr: "Système",
        hdr: "#c0392b", cmd_color: "#e74c3c", bg: "rgba(231,76,60,0.08)", border: "#c0392b",
        items: [
            { cmd: "sudo reboot",               en: "Restart the system",                    fr: "Redémarre le système",                       ex: "sudo reboot" },
            { cmd: "sudo shutdown now",          en: "Shut down the server immediately",       fr: "Éteint le serveur immédiatement",            ex: "sudo shutdown now" },
            { cmd: "chown -R user:group /path",  en: "Change owner recursively",              fr: "Change le propriétaire récursivement",       ex: "chown -R www-data:www-data /var/www" },
            { cmd: "chmod -R 755 /path",         en: "Change permissions recursively",        fr: "Change les droits récursivement",            ex: "chmod -R 755 /var/www" },
        ],
        extra: {
            key: "apache",
            en: "Apache", fr: "Apache",
            hdr: "#8e44ad", cmd_color: "#9b59b6", bg: "rgba(155,89,182,0.08)", border: "#8e44ad",
            items: [
                { cmd: "sudo systemctl restart apache2", en: "Restart Apache",              fr: "Redémarre Apache",              ex: "sudo systemctl restart apache2" },
                { cmd: "sudo systemctl status apache2",  en: "Show Apache status",          fr: "Affiche le statut Apache",      ex: "sudo systemctl status apache2" },
                { cmd: "sudo systemctl stop apache2",    en: "Stop Apache",                 fr: "Arrête Apache",                 ex: "sudo systemctl stop apache2" },
                { cmd: "sudo systemctl start apache2",   en: "Start Apache",                fr: "Démarre Apache",                ex: "sudo systemctl start apache2" },
                { cmd: "sudo apache2ctl configtest",     en: "Test Apache configuration",   fr: "Teste la configuration",       ex: "sudo apache2ctl configtest" },
            ]
        }
    },
    {
        key: "apt",
        en: "Packages APT", fr: "Packages APT",
        hdr: "#d35400", cmd_color: "#e67e22", bg: "rgba(230,126,34,0.08)", border: "#d35400",
        items: [
            { cmd: "sudo apt update",      en: "Update package list",              fr: "Met à jour la liste des paquets",       ex: "sudo apt update" },
            { cmd: "sudo apt upgrade -y",  en: "Upgrade all installed packages",    fr: "Met à jour tous les paquets installés", ex: "sudo apt upgrade -y" },
            { cmd: "sudo apt install",     en: "Install a package",                 fr: "Installe un paquet",                    ex: "sudo apt install nginx" },
            { cmd: "sudo apt remove",      en: "Remove a package",                  fr: "Supprime un paquet",                    ex: "sudo apt remove nginx" },
            { cmd: "sudo apt autoremove",  en: "Remove unused packages",            fr: "Supprime les paquets inutiles",         ex: "sudo apt autoremove" },
        ],
        extra: {
            key: "files",
            en: "Files", fr: "Fichiers",
            hdr: "#2980b9", cmd_color: "#3498db", bg: "rgba(52,152,219,0.08)", border: "#2980b9",
            items: [
                { cmd: "find / -name",   en: "Find a file by name",          fr: "Chercher un fichier par nom",     ex: 'find / -name "*.conf" 2>/dev/null' },
                { cmd: "tar -czf",       en: "Create a .tar.gz archive",      fr: "Créer une archive .tar.gz",       ex: "tar -czf archive.tar.gz dossier/" },
                { cmd: "tar -xzf",       en: "Extract a .tar.gz archive",     fr: "Extraire une archive .tar.gz",    ex: "tar -xzf archive.tar.gz" },
                { cmd: "rm -rf",         en: "Delete folder/files (DANGER)",  fr: "Supprimer dossier/fichiers (DANGER)", ex: "rm -rf /tmp/test/" },
                { cmd: "mkdir -p",       en: "Create nested folders",         fr: "Créer dossiers imbriqués",        ex: "mkdir -p /var/www/site/public" },
            ]
        }
    },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function esc(str) {
    return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

// ─── Applet ────────────────────────────────────────────────────────────────────
function LinuxCheatBasicApplet(metadata, orientation, panel_height, instance_id) {
    this._init(metadata, orientation, panel_height, instance_id);
}

LinuxCheatBasicApplet.prototype = {
    __proto__: Applet.IconApplet.prototype,

    _init: function(metadata, orientation, panel_height, instance_id) {
        Applet.IconApplet.prototype._init.call(this, orientation, panel_height, instance_id);
        this.set_applet_icon_symbolic_name("utilities-terminal");
        this.set_applet_tooltip("Linux Cheat Sheet Basic");

        this.settings = new Settings.AppletSettings(this, UUID, instance_id);
        this.settings.bind("language", "language", this._onSettingsChanged.bind(this));

        this.menuManager = new PopupMenu.PopupMenuManager(this);
        this.menu = new Applet.AppletPopupMenu(this, orientation);
        this.menuManager.addMenu(this.menu);

        this._buildMenu();
    },

    _onSettingsChanged: function() {
        this._buildMenu();
    },

    _t: function(item) {
        return (this.language === "fr") ? item.fr : item.en;
    },

    _makeBlock: function(group) {
        let blockBox = new St.BoxLayout({
            vertical: true,
            style: "border: 1px solid " + group.border + "; border-radius: 6px; padding: 0; spacing: 0; background-color: " + group.bg + ";"
        });

        let headerLabel = new St.Label({
            style: "font-size: 13px; font-weight: bold; padding: 4px 8px; background-color: " + group.border + "; border-radius: 5px 5px 0 0; color: #ffffff;"
        });
        headerLabel.clutter_text.set_markup('<b>' + esc(this._t(group)) + '</b>');
        blockBox.add_child(headerLabel);

        for (let item of group.items) {
            let capturedCmd = item.ex && item.ex !== item.cmd ? item.ex : item.cmd;
            let capturedDesc = this._t(item);

            let entryBox = new St.BoxLayout({
                vertical: true,
                reactive: true,
                track_hover: true,
                style: "padding: 5px 8px; spacing: 1px; border-top: 1px solid rgba(255,255,255,0.05);"
            });

            let cmdLabel = new St.Label({ style: "font-size: 12px;" });
            cmdLabel.clutter_text.set_markup(
                '<tt><b><span foreground="' + group.cmd_color + '">' + esc(item.cmd) + '</span></b></tt>'
            );

            let descLabel = new St.Label({ style: "font-size: 11px;" });
            descLabel.clutter_text.set_markup(
                '<span foreground="#dddddd">' + esc(this._t(item)) + '</span>'
            );

            entryBox.add_child(cmdLabel);
            entryBox.add_child(descLabel);

            if (item.ex && item.ex !== item.cmd) {
                let exLabel = new St.Label({ style: "font-size: 10px;" });
                exLabel.clutter_text.set_markup(
                    '<i><span foreground="#888888">ex: ' + esc(item.ex) + '</span></i>'
                );
                entryBox.add_child(exLabel);
            }

            entryBox.connect('enter-event', function() {
                entryBox.set_style("padding: 5px 8px; spacing: 1px; border-top: 1px solid rgba(255,255,255,0.05); background-color: rgba(255,255,255,0.1);");
            });
            entryBox.connect('leave-event', function() {
                entryBox.set_style("padding: 5px 8px; spacing: 1px; border-top: 1px solid rgba(255,255,255,0.05);");
            });
            entryBox.connect('button-press-event', () => {
                this._copyToClipboard(capturedCmd, capturedDesc);
                this.menu.close();
                return true;
            });

            blockBox.add_child(entryBox);
        }

        return blockBox;
    },

    _buildMenu: function() {
        this.menu.removeAll();

        let headerItem = new PopupMenu.PopupMenuItem("", { reactive: false });
        let subtitle = this.language === "fr" ? "clic sur une commande pour copier" : "click a command to copy";
        headerItem.label.clutter_text.set_markup(
            '<b><span foreground="#ffffff" size="large"> Linux Cheat Sheet</span></b>' +
            '<span foreground="#aaaaaa" size="small">   — ' + esc(subtitle) + '</span>'
        );
        this.menu.addMenuItem(headerItem);
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

        let outerBox = new St.BoxLayout({
            vertical: false,
            style: "spacing: 10px; padding: 8px 12px;"
        });

        for (let col of COLUMNS) {
            let colBox = new St.BoxLayout({
                vertical: true,
                style: "spacing: 8px; min-width: 310px;"
            });

            colBox.add_child(this._makeBlock(col));

            if (col.extra) {
                colBox.add_child(this._makeBlock(col.extra));
            }

            outerBox.add_child(colBox);
        }

        this.menu.box.add_child(outerBox);
    },

    _copyToClipboard: function(cmd, desc) {
        let clipboard = St.Clipboard.get_default();
        clipboard.set_text(St.ClipboardType.CLIPBOARD, cmd);
        this.set_applet_tooltip("Copied: " + cmd);
        GLib.spawn_command_line_async(
            'notify-send -i utilities-terminal -t 2000 "Command copied" "' +
            desc.replace(/"/g, "'") + '\n' + cmd.replace(/"/g, "'") + '"'
        );
    },

    on_applet_clicked: function(event) {
        this.menu.toggle();
    }
};

function main(metadata, orientation, panel_height, instance_id) {
    return new LinuxCheatBasicApplet(metadata, orientation, panel_height, instance_id);
}
