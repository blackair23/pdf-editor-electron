
const {PDFDocument} = require('pdf-lib')
import { html, page, render } from "../lib.js";
const fs = require('fs');

const selectedCardIndices = []; 
const splitTemplate = () => html `

<section id="split">
<div class="place-content-center text-center mt-6">
  <h1 class="text-5xl font-bold">Split PDF file</h1>
  <p class="py-6">Separate one page or a whole set for easy conversion into independent PDF files.</p>
  <input @change=${handleFileSelection} id="input-file" type="file" class="file-input w-full max-w-xs file-input-primary" />
</div>
<div id="card-holder" class="flex m-5 grid grid grid-cols-1 gap-4 grid-flow-row auto-rows-max w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center justify-center">
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
    alert('Please select file.');
    return;
  }

  let currentFile = await PDFDocument.load(fs.readFileSync(selectedFiles[0].path));
  const pages = currentFile.getPages()
  console.log(pages);
  console.log(pages.length);

  const cardHolder= document.getElementById('card-holder');
  cardHolder.innerHTML = '';
  render(pages.map((_, i) => cardTemplate(i)), cardHolder);
  console.log(pages)
};

const cardTemplate = (index) => html `
    <div  class="card w-32 bg-base-300 shadow-xl">
      <figure class="px-5 pt-5">
        <!-- <img src="../images/pdf.png" alt="Shoes" class="rounded-xl" /> -->
        
      </figure>
      <div class="card-body items-center text-center">
        <p class="text-xs">${index}</p>
      </div>
      <button @click=${() => handlePageIndex(index)} class="btn btn-primary ${selectedCardIndices.includes(index) ? 'btn-outline' : ''}"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
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

      fs.writeFileSync(`D:/pdf-new/page-removed-${selectedFiles[0].name}.pdf`,await pageRemovedPdf.save());
      alert('Ready!');
  
      page.redirect('/');

}

const handlePageIndex = (index) => {
  console.log('from function i-> ',index)
  const cardIndex = selectedCardIndices.indexOf(index); // Check if index already exists
  if (cardIndex === -1) {
    // Add index if not already selected
    selectedCardIndices.push(index);
  } else {
    // Remove index if already selected (toggling effect)
    selectedCardIndices.splice(cardIndex, 1);
  }
  console.log(selectedCardIndices);
  
};

export function splitView(ctx) {
    ctx.render(splitTemplate());
}