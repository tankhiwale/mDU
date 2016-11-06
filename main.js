const electron = require('electron')
const AppWindowPositioner = require('electron-positioner')
const { app, BrowserWindow, Tray } = electron

let tray = null;
let appWindow = null;
let appWindowPositioner = null;

if(app.dock) app.dock.hide();

app.on('ready', () => {
    tray = new Tray('resources/images/tray/logo.png');
    tray.setToolTip('du app');
    tray.setHighlightMode('selection');

    appWindow = new BrowserWindow({height: 270, width : 670, show: false});
    appWindow.loadURL('file://' + __dirname + '/index.html');
    appWindowPositioner = new AppWindowPositioner(appWindow);

    var trayBounds = tray.getBounds();
    var position = appWindowPositioner.calculate('trayRight', trayBounds);
    appWindow.setPosition(position.x, position.y);


    tray.on('click', () => {
        appWindow.isVisible() ? appWindow.hide() : appWindow.show()
    })
})
