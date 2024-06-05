const {PDFDocument} = require('pdf-lib')
import { saveFile } from "../api/save.js";
import { html, page, render } from "../lib.js";
const fs = require('fs');

const selectedCardIndices = []; 

const removeTemplate = () => html `

<section id="remove">
<div class="place-content-center text-center mt-6">
  <h1 class="text-5xl font-bold">Remove PDF pages</h1>
  <p class="py-6">Select and remove the PDF pages you don’t need. Get a new file without your deleted pages.</p>
  <input @change=${handleFileSelection} id="input-file" type="file" accept="application/pdf" class="file-input w-full max-w-xs file-input-primary" />
</div>
<div id="card-holder" class="mt-16 mb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 justify-between justify-items-center">
      <p class="items-center text-center m-0 p-1.5">No files uploaded!</p>
  </div>

  <div class=" flex w-full justify-center">
    <button @click=${handleRemove} class="btn btn-error">Remove</button>
  </div>

</section>
`;

const handleFileSelection = async () => {
  const fileInput = document.getElementById('input-file');
  const selectedFiles = await fileInput.files; // Get selected files
  console.log(selectedFiles[0]);
  if (!selectedFiles || selectedFiles.length == 0) {
    alertPopup('No file selected', 'Please select file.', 'Close')
    return;
  }
  let fsFile = fs.readFileSync(selectedFiles[0].path);
  let currentFile = await PDFDocument.load(fs.readFileSync(selectedFiles[0].path));
  const pages = currentFile.getPages()
  console.log(pages);
  console.log(pages.length);

  const cardHolder= document.getElementById('card-holder');
  cardHolder.innerHTML = '';
  render(pages.map((_, i) => cardTemplate(i)), cardHolder);
  console.log(pages);
};

const cardTemplate = (index) => html `
    <div  class="place-content-center justify-center card w-32 bg-base-300 shadow-xl">
      <figure class="px-5 pt-5">
        <!-- <img src="../images/pdf.png" alt="Shoes" class="rounded-xl" /> -->
          <div class="card-body items-center text-center">
            <p class="text-sm">${index+1}</p>
        </div>
      </figure>
      <button id=${index} @click=${() => handlePageIndex(index)} class="btn btn-primary ${selectedCardIndices.includes(index) ? 'btn-outline' : ''}"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
    </div>
`;

const handleRemove = async () => {
    const pageRemovedPdf = await PDFDocument.create();
    // Fetch an existing PDF document
    const fileInput = document.getElementById('input-file');
    const selectedFiles = await fileInput.files; // Get selected files

      const file = selectedFiles[0];
      const fileBytes = await file.arrayBuffer(); // Get file bytes
      const pdfDoc = await PDFDocument.load(fileBytes); // Load PDF document

      // Array to keep track of pages to keep
      const pagesToKeep = [];

      // Get the total number of pages in the document
      const totalPages = pdfDoc.getPageCount();

      // Create a set from selectedCardIndices for fast lookup
      const selectedIndicesSet = new Set(selectedCardIndices);

      // Collect pages that are not selected for removal
      for (let i = 0; i < totalPages; i++) {
          if (!selectedIndicesSet.has(i)) {
              pagesToKeep.push(i);
          }
      }

      // Copy the pages to keep into the new document
      const copiedPages = await pageRemovedPdf.copyPages(pdfDoc, pagesToKeep);
      copiedPages.forEach((page) => pageRemovedPdf.addPage(page));

      // fs.writeFileSync(`D:/pdf-new/page-removed-${selectedFiles[0].name}.pdf`,await pageRemovedPdf.save());
  
      const savingTheFile = await pageRemovedPdf.save();
      saveFile(savingTheFile, 'pages-removed-', selectedFiles[0].name);

}

const handlePageIndex = (index) => {

  const btn = document.getElementById(index);

  console.log('from function i-> ',index)
  const cardIndex = selectedCardIndices.indexOf(index); // Check if index already exists
  if (cardIndex === -1) {
    // Add index if not already selected
    selectedCardIndices.push(index);
    btn.classList = 'btn btn-neutral'
  } else {
    // Remove index if already selected (toggling effect)
    selectedCardIndices.splice(cardIndex, 1);
    btn.classList = 'btn btn-primary'
  }
  console.log(selectedCardIndices);
};



export function removeView(ctx) {
    ctx.render(removeTemplate());
}