const { app, BrowserWindow } = require('electron');
const path = require('path');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        // أيقونة البرنامج (لو الصورة مش موجودة هيفتح عادي بأيقونة افتراضية)
        icon: path.join(__dirname, 'src/assets/images/logo.png'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // السطر ده هو اللي بيربط الإلكترون بالأنجلر
    // تأكد إن المسار dist/new/browser/index.html موجود فعلاً بعد ما تعمل build
    win.loadFile(path.join(__dirname, 'dist/new/browser/index.html'));س
    // لو حبيت تفتح أدوات المطورين عشان تشوف الأخطاء (امسح السطرين اللي تحت لو مش عايزهم)
    // win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});