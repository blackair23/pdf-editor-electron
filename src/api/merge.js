const { PDFDocument } = require('pdf-lib');
// const { html } = require('../lib.js');
import {html} from '../lib.js'
// const { electron } = require('electron');
// const { PDFDocument } = electron; 
// Function to handle selecting PDF files
const handleFileSelection = async () => {
  const fileInput = document.getElementById('input-file');
  const selectedFiles = await fileInput.files; // Get selected files
  if (!selectedFiles || selectedFiles.length <= 1) {
    alert('Please select two or more PDF files to merge.');
    return;
  }

  const pdfPaths = [];
  for (const file of selectedFiles) {
    console.log(file)
    pdfPaths.push({
      path: file.path,
      name: file.name,
    }); // Extract file paths
  }

  console.log(pdfPaths)
  // const pdfDoc = await PDFDocument.load(pdfPaths[0].path)
  // console.log('it runs');
  // const pages = pdfDoc.getPages()
  // console.log(pages[0]);
  // pages[0].drawText('You can modify PDFs too!')
  // const pdfBytes = await pdfDoc.save()


  let cardHolder = document.getElementById('card-holder');
  pdfPaths.forEach(e => {

    const template =html`
        <div class="card w-32 bg-base-300 shadow-xl">
        <figure class="px-5 pt-5">
          <!-- <img src="../images/pdf.png" alt="Shoes" class="rounded-xl" /> -->
        </figure>
        <div class="card-body items-center text-center m-0 p-1.5">
          <p class="text-xs">${e.name}</p>
        </div>
      </div>
    `
    // const cardDiv = document.createElement('div');
    // cardDiv.classList.add('card', 'w-32', 'bg-base-300', 'shadow-xl');

    // const figureElement = document.createElement('figure');
    // figureElement.classList.add('px-5', 'pt-5');
//-------------------------------------------------
    // Add an image element if you have the image source
    // const imageElement = document.createElement('img');
    // imageElement.src = '../images/pdf.png';
    // imageElement.alt = 'Shoes';
    // imageElement.classList.add('rounded-xl');
    // figureElement.appendChild(imageElement); // Uncomment if using image
    //-------------------------------------
      // <div class="skeleton w-32 h-32"></div>
      // const scelet = document.createElement('div');
      // scelet.classList.add('skeleton', 'w-32', 'h-32');
      // figureElement.appendChild(scelet); // Uncomment if using image

      // const cardBodyDiv = document.createElement('div');
      // cardBodyDiv.classList.add('card-body', 'items-center', 'text-center', 'm-0', 'p-1.5');

      // const paragraphElement = document.createElement('p');
      // paragraphElement.classList.add('text-xs');
      // paragraphElement.textContent = e.name;

      // cardBodyDiv.appendChild(paragraphElement);
      // cardDiv.appendChild(figureElement);
      // cardDiv.appendChild(cardBodyDiv);

      // Append the card to an existing element in your HTML (replace with your selector)
      // cardHolder.appendChild(cardDiv);
      cardHolder.appendChild(template);
      // cardHolder.innerHTML= template;

  });

};

// Attach event listener to the file input element
const fileInput = document.getElementById('input-file');
fileInput.addEventListener('change', handleFileSelection);