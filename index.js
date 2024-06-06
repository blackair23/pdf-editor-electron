const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

app.commandLine.appendSwitch('disable-features', 'AutofillServerCommunication,Autofill');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    icon: path.join(__dirname, 'images', 'pdf.png'),
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false,
    }
  });

  win.once('ready-to-show', () => {
    win.show();
    win.setMenu(null);
    win.webContents.openDevTools();
  });
  win.loadFile(path.join(__dirname, 'src', 'index.html'));

  // Send the path to the images folder to the renderer process
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('load-images', path.join(__dirname, 'images'));
  });
  
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// const { app, BrowserWindow, ipcMain } = require('electron');
// const path = require('path');

// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

// app.commandLine.appendSwitch('disable-features', 'AutofillServerCommunication,Autofill');

// function createWindow() {
//   const win = new BrowserWindow({
//     width: 1000,
//     height: 700,
//     // icon: path.join(__dirname,'images', 'pdf.png'),
//     icon: path.join(__dirname, 'src', 'images', 'pdf.png'),
//     webPreferences: {
//       contextIsolation: false,
//       nodeIntegration: true,
//       webSecurity: false,
//     }
//   });
//   win.once('ready-to-show', () => {
//     win.show();
//     win.setMenu(null);
//     win.webContents.openDevTools();
//   });
//   win.loadFile(path.join(__dirname, 'src', 'index.html'));

//   // Send the path to the images folder to the renderer process
//   win.webContents.on('did-finish-load', () => {
//     // win.webContents.send('load-images', path.join(__dirname, 'images'));
//     win.webContents.send('load-images', path.join(__dirname, 'src', 'images'));
//   });
// }

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });



// *******************************************************************************

// const { app, BrowserWindow, dialog } = require('electron');
// const path = require('path');

// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS']=true;

// app.commandLine.appendSwitch('disable-features', 'AutofillServerCommunication,Autofill');

// function createWindow () {
//   const win = new BrowserWindow({
//     width: 1000,
//     height: 700,
//     icon:'./images/pdf.png',
//     webPreferences: {
//       contextIsolation: false,
//       nodeIntegration: true,
//       // preload: path.join(__dirname, 'src','preload.js')
//       webSecurity: false,
//     }
//   });
//   win.once('ready-to-show', () => {
//     win.show();
//     // Set the menu to null after the window is ready to show
//     win.setMenu(null);
//     win.webContents.openDevTools();
//   });
//   win.loadFile('./src/index.html');


// }

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });

// app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//         createWindow();
//     }
// });



// *******************************************************************************




// export {
//   createFolder,
// };
// -----------------------------------V2
// const { app, BrowserWindow } = require('electron');
// const path = require('path');

// const createWindow = () => {
//     const win = new BrowserWindow({
//         width: 1000,
//         height: 700,
//         webPreferences: {
//             nodeIntegration: false,
//             contextIsolation: true,
//             enableRemoteModule: false,
//             preload: path.join(__dirname,'src','preload.js') // Use preload script for secure, isolated access to Node.js
//         }
//     });

//     win.loadFile(path.join(__dirname, 'src', 'index.html'));
//     win.webContents.openDevTools();

//     win.once('ready-to-show', () => {
//         win.show();
//         win.setMenu(null);
//     });
// };

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });

// app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//         createWindow();
//     }
// });




// -----------------------------------V2

// const { app, BrowserWindow } = require('electron');
// const path = require('path');

// const createWindow = () => {
//     const win = new BrowserWindow({
//         width: 1000,
//         height: 700,
//         webPreferences: {
//           nodeIntegration: false, // Recommended for security
//           contextIsolation: true,  // Recommended for security
//           enableRemoteModule: true, // Recommended for security
//           // Disabling eval (less secure)
//           allowRunningInsecureContent: true, // Not recommended in general
//           sandbox: false // Not recommended in general
//         }
//     });

//     win.loadFile(path.join(__dirname, 'src', 'index.html'));
//     win.webContents.openDevTools();

//     win.once('ready-to-show', () => {
//         win.show();
//         win.setMenu(null);
//     });
// };

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });

// app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//         createWindow();
//     }
// });
