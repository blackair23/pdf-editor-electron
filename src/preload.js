// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electron', {
//     send: (channel, data) => {
//         // whitelist channels
//         let validChannels = ['toMain'];
//         if (validChannels.includes(channel)) {
//             ipcRenderer.send(channel, data);
//         }
//     },
//     receive: (channel, func) => {
//         let validChannels = ['fromMain'];
//         if (validChannels.includes(channel)) {
//             // Deliberately strip event as it includes `sender`
//             ipcRenderer.on(channel, (event, ...args) => func(...args));
//         }
//     }
// });


// const { PDFDocument } = require('pdf-lib');
// const { contextBridge } = require('electron');

// contextBridge.exposeInMainWorld('electron', {
//   PDFDocument
// });

const { contextBridge } = require('electron');
const path = require('node:path')
console.log('*preload ready*');

console.log('Current directory:', __dirname);

try {
  const { PDFDocument } = require('pdf-lib');
  console.log('pdf-lib module loaded successfully');
  
  contextBridge.exposeInMainWorld('pdfLib', {
    PDFDocument: PDFDocument
  });
} catch (error) {
  console.error('Error loading pdf-lib:', error);
}