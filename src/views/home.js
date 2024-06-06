import { confetti } from "../api/confetty.js";
import { html } from "../lib.js";

const { ipcRenderer } = require('electron');
const path = require('path');

ipcRenderer.on('load-images', (event, imagesPath) => {
  document.querySelectorAll('img').forEach(img => {
    const imgName = img.getAttribute('data-src');
    if (imgName) {
      img.src = path.join(imagesPath, imgName);
    }
  });
});

const homeTemplate = () => html `
<section id="home" >
  <div class="hero min-h-max bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Work with PDFs in one place</h1>
        <p class="py-6">Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.</p>
        <button @click=${confetti} class="btn btn-primary">Get Started</button>
      </div>
    </div>
  </div>
  <div className='fixed top-0 left-0 w-full h-full pointer-events-none' id="confetti-container"></div>
  <div class="grid grid-rows-e grid-flow-col gap-4 place-content-center mt-6">
    <a href="/merge" class="card w-72 bg-base-100 shadow-xl btn-ghost">
      <div class="card-body">
        <figure class="w-10 object-left">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M224,96V216a8,8,0,0,1-8,8H96a8,8,0,0,1-8-8V168H40a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8H160a8,8,0,0,1,8,8V88h48A8,8,0,0,1,224,96Z"/></svg>
        </figure>
        <h2 class="card-title">Merge!</h2>
        <p>Combine PDFs in the order you want with the easiest PDF merger available.</p>
      </div>
    </a>
    <a href="/split" class="card w-72 bg-base-100 shadow-xl btn-ghost">
      <div class="card-body">
        <figure class="w-10 object-left">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M216,56v60a4,4,0,0,1-4,4H44a4,4,0,0,1-4-4V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Zm-4,80H44a4,4,0,0,0-4,4v60a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V140A4,4,0,0,0,212,136Z"/></svg>
        </figure>
        <h2 class="card-title">Split!</h2>
        <p>Separate one page or a whole set for easy conversion into independent PDF files</p>
      </div>
    </a>
    <a href="/remove" class="card w-72 bg-base-100 shadow-xl btn-ghost">
      <div class="card-body">
        <figure class="w-10 object-left">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34Zm-56,88a8,8,0,0,1-11.32,11.32L128,163.31l-18.34,18.35a8,8,0,0,1-11.32-11.32L116.69,152,98.34,133.66a8,8,0,0,1,11.32-11.32L128,140.69l18.34-18.35a8,8,0,0,1,11.32,11.32L139.31,152ZM152,88V44l44,44Z"/></svg>
        </figure>
        <h2 class="card-title">Remove!</h2>
        <p>Select and remove the PDF pages you don’t need. Get a new file without your deleted pages.</p>
      </div>
    </a>
  </div>
</section>
`;

export function homeView(ctx) {
    ctx.render(homeTemplate());
}