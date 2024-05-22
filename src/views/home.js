import { html } from "../lib.js";

const homeTemplate = () => html `
<section id="home" >
<div class="hero min-h-max bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Work with PDFs in one place</h1>
      <p class="py-6">Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.</p>
      <button class="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>

<div class="grid grid-rows-e grid-flow-col gap-4 place-content-center mt-6">

  <a href="/merge" class="card w-72 bg-base-100 shadow-xl btn-ghost">
    <div class="card-body">
      <figure  class="w-10 object-left"><img src="./Electron Pdf Edditor/images/merge.png" alt="merge" /></figure>
      <h2 class="card-title">Merge!</h2>
      <p>Combine PDFs in the order you want with the easiest PDF merger available.</p>
    </div>
  </a>

  <a href="/split" class="card w-72 bg-base-100 shadow-xl btn-ghost">
    <div class="card-body">
      <figure class="w-10 object-left"><img  src="./Electron Pdf Edditor/images/file.png" alt="Split" /></figure>
      <h2 class="card-title">Split!</h2>
      <p>Separate one page or a whole set for easy conversion into independent PDF files</p>
    </div>
  </a>

  <a href="/remove" class="card w-72 bg-base-100 shadow-xl btn-ghost">
    <div class="card-body">
      <figure class="w-14 object-left"><img  src="./Electron Pdf Edditor/images/remove-file.png" alt="remove" /></figure>
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