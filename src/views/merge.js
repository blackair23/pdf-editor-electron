const {PDFDocument} = require('pdf-lib')
import { draggableGrid } from "../api/draggable.js";
// import {  dragEnd, dragOver, dragStart } from "../api/draggable.js";
import { html, page, render } from "../lib.js";
const fs = require('fs');


const mergeTemplate = () => html `
<section id="merge" class="max-w-full justify-center  justify-items-center place-content-center">
  <div class="place-content-center text-center mt-6 ">
    <h1 class="text-5xl font-bold">Merge PDF files</h1>
    <p class="py-6">Combine PDFs in the order you want with the easiest PDF merger available.</p>
    <input @change=${handleFileSelection} id="input-file" type="file" class="file-input w-full max-w-xs file-input-primary" multiple="multiple" />
  </div>

  <div id="card-holder" class="conteiner place-content-center  grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-2 xl:p-5 justify-center justify-items-center">  
  <!-- <div id="card-holder" class="conteiner place-content-center  mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 justify-center justify-items-center">   -->
 
  <!-- <div id="card-holder" class="flex m-5 grid grid grid-cols-1 gap-4 grid-flow-row auto-rows-max w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center justify-center"> -->
      <p class="text-center text-center m-0 p-1.5">No files uploaded!</p>
  </div>

  <div class=" flex w-full justify-center">
    <!-- <button @click=${handleMerge} class="btn btn-error">Merge</button> -->
    <button  class="btn btn-error">Merge</button>
  </div>

</section>`;


const cardTemplate = (card) => html `
    <div  class="focus:opacity-75 hover:cursor-move card w-32 bg-base-300 shadow-xl draggable" draggable="true">
      <figure class="px-3 pt-3">
        <!-- <img src="../images/pdf.png" alt="Shoes" class="rounded-xl" /> -->
        <div class="skeleton w-32 h-32 bg-neutral">${card.index}</div>
        </figure>
        <div class="place-content-center justify-center card-body items-center text-center">
          <p class="text-xs">${card.name}</p>
        </div>
    </div>
`;


const handleFileSelection = async () => {
  const fileInput = document.getElementById('input-file');
  const selectedFiles = await fileInput.files; // Get selected files
  console.log(selectedFiles);
  if (!selectedFiles || selectedFiles.length == 0) {
    alert('Please select two or more PDF files to merge.');
    document.getElementById('input-file').value = '';
    // return;
    fileInput.value= '';
    selectedFiles ='';
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

  draggableGrid();
};

const handleMerge = async () =>{
  const fileInput = document.getElementById('input-file');
  const selectedFiles = await fileInput.files; // Get selected files
  const pdfPaths = [];
  for (const file of selectedFiles) {
    pdfPaths.push({
      path: file.path,
      name: file.name,
    }); // Extract file paths
  };

  console.log('mergeee!')

    const mergedPdf = await PDFDocument.create();

    for (let document of pdfPaths) {
      let currentFile = await PDFDocument.load(fs.readFileSync(document.path));
  
      const copiedPages = await mergedPdf.copyPages(currentFile, currentFile.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));    
    }

    fs.writeFileSync(`D:/pdf-new/merged-${pdfPaths[0].name}.pdf`,await mergedPdf.save());
    alert('Ready!');

    page.redirect('/');

}


export function mergeView(ctx) {
    const files = [];
    ctx.render(mergeTemplate(files));
}