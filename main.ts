
import { BrowserWindow, globalShortcut } from 'electron';
import configuration from './configSetting';

export default class Main {
    static mainWindow: Electron.BrowserWindow;
    static application: Electron.App;
    static BrowserWindow;
    static globalShortcut;

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static onClose() {
        // Dereference the window object. 
        Main.mainWindow = null;
    }

    private static onReady() {
        if (!configuration.readSettings('shortcutKeys')) {
            configuration.saveSettings('shortcutKeys', ['ctrl', 'shift']);
        }

        Main.mainWindow = new Main.BrowserWindow({ width: 368, height: 700 });
        Main.mainWindow
            .loadURL('file://' + __dirname + '/index.html');

        Main.setGlobalShortcuts();
        Main.mainWindow.on('closed', Main.onClose);
    }

    private static setGlobalShortcuts() {
        globalShortcut.unregisterAll();

        const shortcutKeysSetting = configuration.readSettings('shortcutKeys');
        const shortcutPrefix = shortcutKeysSetting.length === 0 ? '' : shortcutKeysSetting.join('+') + '+';

        globalShortcut.register(shortcutPrefix + '1', function () {
            Main.mainWindow.webContents.send('global-shortcut', 0);
        });
        globalShortcut.register(shortcutPrefix + '2', function () {
            Main.mainWindow.webContents.send('global-shortcut', 1);
        });
    }


    static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        // we pass the Electron.App object and the  
        // Electron.BrowserWindow into this function 
        // so this class has no dependencies. This 
        // makes the code easier to write tests for 
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
    }
}
