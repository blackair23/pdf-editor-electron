const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 700
  })
  win.once('ready-to-show', () => {
    win.show();
    // Set the menu to null after the window is ready to show
    win.setMenu(null);
  });
  win.loadFile('./src/index.html')
}

app.whenReady().then(() => {
  createWindow()
})