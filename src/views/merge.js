const {PDFDocument} = require('pdf-lib')
import { alertPopup } from "../api/alerts.js";
import { draggableGrid } from "../api/draggable.js";
import { saveFile } from "../api/save.js";
import { shortenFileName } from "../api/shortenString.js";
import { html, page, render } from "../lib.js";
const fs = require('fs');


const mergeTemplate = () => html `
<section id="merge" class="max-w-full justify-center  justify-items-center place-content-center">
  <div class="place-content-center text-center mt-6 ">
    <h1 class="text-5xl font-bold">Merge PDF files</h1>
    <p class="py-6">Combine PDFs in the order you want with the easiest PDF merger available.</p>
    <input @change=${handleFileSelection} id="input-file" type="file" accept="application/pdf" class="file-input w-full max-w-xs file-input-primary" multiple="multiple" />
  </div>

  <div id="card-holder2" class="mt-16 mb-16 justify-center justify-items-center">  
    <p class="text-center text-center m-0 p-1.5">No files uploaded!</p>
  </div>
  <div id="card-holder" class="mt-16 mb-16 conteiner place-content-center  grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-2 xl:p-5 justify-center justify-items-center">  
  </div>

  <div class=" flex w-full justify-center">
    <button @click=${handleMerge} class="btn btn-error">Merge</button>
  </div>

</section>`;


const cardTemplate = (card) => html `
    <div data-path=${card.path} data-name=${card.name} class="focus:opacity-75 hover:cursor-move card w-32 bg-base-300 shadow-xl draggable" draggable="true">
      <figure class="px-3 pt-3">
        <div class="skeleton w-32 h-32 bg-neutral">${card.index}</div>
        </figure>
        <div class="place-content-center justify-center card-body items-center text-center">
          <p class="text-xs w-max">${card.sortName}</p>
        </div>
    </div>
`;

const handleFileSelection = async () => {
  const fileInput = document.getElementById('input-file');
  let selectedFiles = await fileInput.files; // Get selected files
  if (!selectedFiles || selectedFiles.length == 1) {
    alertPopup('Select more files!', 'Please select two or more PDF files to merge.', 'Close')
    document.getElementById('input-file').value = '';
    // return;
    fileInput.value= '';
    selectedFiles ='';
  }

  const pdfPaths = [];
  for (const file of selectedFiles) {
    pdfPaths.push({
      path: file.path,
      sortName: shortenFileName(file.name),
      name: file.name,
    }); // Extract file paths
  };
  const cardHolder= document.getElementById('card-holder2');
  
  cardHolder.innerHTML = '';


  render(pdfPaths.map(cardTemplate), document.getElementById('card-holder'));

  draggableGrid();
};

const handleMerge = async () =>{
  const allFilesByOrder = Array.from(document.querySelectorAll('.draggable'));
  const pdfPaths = [];
  for (const file of allFilesByOrder) {
    pdfPaths.push({
      path: file.getAttribute('data-path'),
      name: file.getAttribute('data-name'),
    }); // Extract file paths
  };


    const mergedPdf = await PDFDocument.create();

    for (let document of pdfPaths) {
      let currentFile = await PDFDocument.load(fs.readFileSync(document.path));
  
      const copiedPages = await mergedPdf.copyPages(currentFile, currentFile.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));    
    }
    const savingTheFile = await mergedPdf.save();
    saveFile(savingTheFile, 'merged', pdfPaths[0].name);
    
}


export function mergeView(ctx) {
    const files = [];
    ctx.render(mergeTemplate(files));
}

