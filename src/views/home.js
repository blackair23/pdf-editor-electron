import { html } from "../lib.js";

const homeTemplate = () => html `
<section id="home" >
<div class="hero min-h-max bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Work with PDFs in one place</h1>
      <p class="py-6">Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.</p>
      <button @click=${generateConfetti} class="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
<div className='fixed top-0 left-0 w-full h-full pointer-events-none' id="confetti-container"></div>
<div class="grid grid-rows-e grid-flow-col gap-4 place-content-center mt-6">

  <a href="/merge" class="card w-72 bg-base-100 shadow-xl btn-ghost">
    <div class="card-body">
      <figure  class="w-10 object-left">
        <img src="file:/Electron Pdf Edditor/images/merge.png" alt="merge" />
      </figure>
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

const SHAPES = ['square', 'triangle'];
const COLOR_DIGIT = "ABCDEF1234567890";


    // const [isConfettiActive, setConfettiActive] = useState(false);
    // const containerRef = useRef(null);
    // useEffect(() => {
    //     if (isConfettiActive) {
    //         generateConfetti();
    //     }
    // }, [isConfettiActive]);

    const generateRandomColor = () => {
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += COLOR_DIGIT[Math.floor(Math.random() * COLOR_DIGIT.length)];
        }
        return color;
    };

    const generateConfetti = () => {
        const container = document.getElementById('confetti-container')  
          
        if (container) {
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                const positionX = Math.random() * window.innerWidth;
                const positionY = Math.random() * window.innerHeight;
                const rotation = Math.random() * 360;
                const size = Math.floor(Math.random() * (20 - 5 + 1)) + 5;            // Set confetti styles
                confetti.style.left = `${positionX}px`;
                confetti.style.top = `${positionY}px`;
                confetti.style.transform = `rotate(${rotation}deg)`;
                confetti.className = 'confetti ' + SHAPES[Math.floor(Math.random() * 3)];
                confetti.style.width = `${size}px`
                confetti.style.height = `${size}px`
                confetti.style.backgroundColor = generateRandomColor();            // Append confetti to the container
                container.appendChild(confetti);            
                // Remove confetti element after animation duration (4 seconds)
                setTimeout(() => {
                    container.removeChild(confetti);
                }, 2000);
            }
        }
    };

    // const handleClick = () => {
    //     setConfettiActive(true);
    //     // Reset the confetti after a short delay
    //     setTimeout(() => {
    //         setConfettiActive(false);
    //     }, 4000);
    // };
    // return (    
    //     <div>
    //     <button className='font-bold text-xl' onClick={handleClick}>Click for Confetti 🎉</button>
    //     <div className='fixed top-0 left-0 w-full h-full pointer-events-none' ref={containerRef} id="confetti-container"></div>
    // </div>
    // );



export function homeView(ctx) {
    ctx.render(homeTemplate());
}

