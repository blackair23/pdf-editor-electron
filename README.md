# PDF Editor

A simple PDF editor built with JavaScript, Electron, Lit-HTML, Page.js, and PDF-Lib. This application allows users to split, merge, and delete pages from PDF files. It also includes a drag-and-drop sorting feature for merging pages.

## Features

- **Split PDF**: Split a PDF into multiple documents.
- **Merge PDF**: Combine multiple PDF files into one. Includes drag-and-drop sorting of files.
- **Delete Pages**: Remove specific pages from a PDF.

## Technologies Used

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Electron](https://www.electronjs.org/)
- [Lit-HTML](https://lit.dev/)
- [Page.js](https://visionmedia.github.io/page.js/)
- [PDF-Lib](https://pdf-lib.js.org/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/blackair23/pdf-editor-electron.git
   cd pdf-editor-electron

2. **Install dependencies:**

    ```bash
    npm install

3. **Usage**

    Run the application:

    ```bash
    npm start

## Features Overview:
- **Split PDF**:  Select a PDF file, specify the pages to split, and save the resulting documents.
- **Merge PDF**: Drag and drop PDF files into the merge area, sort them as needed, and merge them into a single document.
- **Delete Pages**: Open a PDF file, select the pages to delete, and save the modified document.

## Building the Application

**Pack the application**

    `npm run make` 

This will use Electron Forge to package the app into the out folder.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any bugs or feature requests.

