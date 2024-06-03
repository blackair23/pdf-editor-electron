
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
<!-- <div id="card-holder" class="flex m-5 grid grid grid-cols-1 gap-4 grid-flow-row auto-rows-max w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center justify-center"> -->
  <div id="card-holder" class="mt-16 mb-2 grid grid-cols-1 p-4 gap-4 justify-center justify-items-center">  
    <p class="items-center text-center m-0 p-1.5">No files uploaded!</p>
  </div>

  <div class=" flex w-full justify-center">
    <div class="join">
    <select id="split-option" class="select select-bordered join-item ">
        <option value="exact">Split at exact page</option>
        <option value="every">Split every:</option>
      </select>
      <div>
        <div>
          <input id="page-input" class="input input-bordered join-item w-15" placeholder="Page"/>
        </div>
      </div>

      <div class="indicator" class="mb-16">
        <button  @click=${handleSplit} class="btn btn-error join-item">Split</button>
      </div>
    </div>
  </div>

</section>
`;

const handleFileSelection = async () => {
  const fileInput = document.getElementById('input-file');
  const selectedFiles = await fileInput.files; // Get selected files
  console.log(selectedFiles);
  if (!selectedFiles || selectedFiles.length == 0) {
    alert('Please select file to split.');
    return;
  }

  const pdfPaths = [];
  for (const file of selectedFiles) {
    pdfPaths.push({
      path: file.path,
      name: file.name,
    }); // Extract file paths
  };
  const cardHolder= document.getElementById('card-holder');
  cardHolder.innerHTML = '';
  render(pdfPaths.map(cardTemplate), cardHolder);
  console.log(pdfPaths)
};

const cardTemplate = (card) => html `
    <div class="card w-32 bg-base-300 shadow-xl">
      <figure class="px-3 pt-3">
        <!-- <img src="../images/pdf.png" alt="Shoes" class="rounded-xl" /> -->
        <div class="skeleton w-32 h-32 bg-neutral"></div>
        </figure>
        <div class="place-content-center justify-center card-body items-center text-center">
          <p class="text-xs">${card.name}</p>
        </div>
    </div>
`;

const handleSplit = async () => {
  const splitOption = document.getElementById('split-option').value;
  const pageInput = document.getElementById('page-input').value;
  console.log('split-> ', splitOption,'\nbypages ->', pageInput);

  if (splitOption === 'exact') {
    const splitPage = parseInt(pageInput, 10);
      if (isNaN(splitPage) || splitPage < 1) {
          alert('Please enter a valid page number.');
          document.getElementById('page-input').value = "";
          // return;
      }
      await splitPdfAtPage(splitPage);
  } else if (splitOption === 'every') {
      const numPagesPerChunk = parseInt(pageInput, 10);
      if (isNaN(numPagesPerChunk) || numPagesPerChunk < 1) {
          alert('Please enter a valid number of pages.');
          document.getElementById('page-input').value = "";
          // return;
        
      }
      await splitPdfIntoChunks(numPagesPerChunk);
  } else {
      alert('Please select a valid split option.');
  }

}
const splitPdfIntoChunks = async (numPagesPerChunk) => {
  // Existing implementation
  console.log('Split into chunks -> ', numPagesPerChunk);

  const fileInput = document.getElementById('input-file');
  const selectedFiles = fileInput.files;

  if (selectedFiles.length === 0) {
      alert('No file selected!');
      return;
  }

  const file = selectedFiles[0];
  const fileBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(fileBytes);
  const totalPages = pdfDoc.getPageCount();

  let startPage = 0;
  let chunkCount = 1;

  while (startPage < totalPages) {
      const endPage = Math.min(startPage + numPagesPerChunk, totalPages);
      const chunkPdf = await PDFDocument.create();
      const pages = await chunkPdf.copyPages(pdfDoc, Array.from({ length: endPage - startPage }, (_, i) => i + startPage));
      pages.forEach((page) => chunkPdf.addPage(page));
      fs.writeFileSync(`D:/pdf-new/split-P${chunkCount}-${file.name}.pdf`,await chunkPdf.save());
      
      

      startPage += numPagesPerChunk;
      chunkCount++;
  }

  alert('PDF split into chunks!');
  page.redirect('/');
};

const splitPdfAtPage = async (splitPage) => {
  console.log('Split at page ->', splitPage)
  // Existing implementation
  const fileInput = document.getElementById('input-file');
  const selectedFiles = fileInput.files;

  if (selectedFiles.length === 0) {
      alert('No file selected!');
      return;
  }

  const file = selectedFiles[0];
  const fileBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(fileBytes);
  const totalPages = pdfDoc.getPageCount();

  if (splitPage < 1 || splitPage >= totalPages) {
      alert('Invalid split page number!');
      return;
  }

  // First part
  const firstPartPdf = await PDFDocument.create();
  const firstPartPages = await firstPartPdf.copyPages(pdfDoc, Array.from({ length: splitPage }, (_, i) => i));
  firstPartPages.forEach((page) => firstPartPdf.addPage(page));
  fs.writeFileSync(`D:/pdf-new/split-P1-${selectedFiles[0].name}.pdf`,await firstPartPdf.save());

  // Second part
  const secondPartPdf = await PDFDocument.create();
  const secondPartPages = await secondPartPdf.copyPages(pdfDoc, Array.from({ length: totalPages - splitPage }, (_, i) => i + splitPage));
  secondPartPages.forEach((page) => secondPartPdf.addPage(page));
  fs.writeFileSync(`D:/pdf-new/split-P2-${selectedFiles[0].name}.pdf`,await secondPartPdf.save());
   
   alert('PDF split into two parts!');
   page.redirect('/');
};

export function splitView(ctx) {
    ctx.render(splitTemplate());
}