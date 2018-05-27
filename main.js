const { app, Tray, Menu, BrowserWindow, remote } = require("electron");
const {spawn}     = require ("child_process");
const path = require("path");

const iconPath = path.join(__dirname, "favicon.png");
let appIcon = null;
let win = null;


const defaultBrowser = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

app.on("ready", function() {
  win = new BrowserWindow({
    height: 300,
    width: 300,
    show: true
  });
  appIcon = new Tray(iconPath);

  var contextMenu = Menu.buildFromTemplate([
    {
      label: "Códigos de acesso",
      icon: path.join(__dirname, 'icon.png'),
      click: () => {
        win.show();
      }
    },
    {
      type: "separator"
    },
    {
      label: "YMI Favorites",
      submenu: [
        {
          label: "Portal Loja do Tricot",
          click: () => {
            spawn(defaultBrowser, ['http://lojaportaldotricot.ymi.com.br/']);
          }
        },
        {
          label: "Tok&Stock",
          click: () => {

            spawn(defaultBrowser, ['http://tokstok.ymi.com.br/']);
          }
        }
      ]
    },
    {
      type: "separator"
    },
    {
      label: "Yami Teamwork",
      click: () => {
        spawn(defaultBrowser, ['http://intranet.yami.com.br']);
      }
    },
    {
      label: "Yami Github",
      click: () => {
        spawn(defaultBrowser, ['http://github.com/Yamidev']);
      }
    },
    {
      label: "YMI PHPMyAdmin",
      click: () => {
        spawn(defaultBrowser, ['http://phpmyadmin.yami.com.br']);
      }
    },
    {
      label: "MySQLWorkbench",
      click: () => {
        spawn('/Applications/MySQLWorkbench.app/Contents/MacOS/MySQLWorkbench');
      }
    },
    {
      label: "Terminal",
      click: () => {
        spawn('/Applications/Utilities/Terminal.app/Contents/MacOS/Terminal');
      }
    },
    {
      type: "separator"
    },
    {
      label: "VPN",
      type: "radio",
      checked: true
    },
    {
      label: "Toggle DevTools",
      accelerator: "Alt+Command+I",
      click: () => {
        win.show();
        win.toggleDevTools();
      }
    },
    {
      label: "Quit",
      accelerator: "Command+Q",
      selector: "terminate:"
    }
  ]);
  appIcon.setToolTip("Yami");
  appIcon.setContextMenu(contextMenu);

  win.loadURL("file://" + path.join(__dirname, "./react/build/index.html"));
  // win.loadURL("http://localhost:3000/");

});
