// import Sortable from 'sortablejs/modular/sortable.complete.esm.js';
// const {PDFDocument} = require('pdf-lib');
// const {Sortable} = require('sortablejs');
// import Sortable from 'sortablejs';

// import Sortable from "sortablejs";
import Sortable from "../../node_modules/sortablejs/modular/sortable.complete.esm.js";

// Sortable.create('card-holder', {animation: 150});
const draggableGrid = () => {
    console.log('sortable');
    Sortable.create(document.getElementById('card-holder'), 
    {
        animation: 250,
        ghostClass: 'opacity-50'
    });
}

export {
    draggableGrid,
};

// // let dragDestIndex;
// // let draggedEl;
// // let draggedElIndex;
// // let rearranging = false;
// // let rearrangingDuration = 350;

// const dragStart = (e) => {
//     const draggables = document.querySelectorAll(".draggable");
//     const conteiners = document.querySelectorAll(".conteiner");
    
//     e.target.classList.add('opacity-50')
//     e.target.classList.add('dragging')
//     // console.log('drag-Start =>', e);

//     // let sortedArr = [];

//     // for (let i = 0; i < draggables.length; i++) {
//     //     const elementIndex = $(draggables[i]).data('index');
//     //     sortedArr[elementIndex] = draggables[i];
//     // }
//     // console.log(sortedArr);
//     // draggables = sortedArr;
//     // draggedElIndex = e.target.data('index');
//     // console.log('dragging element at position ', draggedElIndex);

// }
// const dragEnd = (e) => {
//     const draggables = document.querySelectorAll(".draggable");
//     const conteiners = document.querySelectorAll(".conteiner");
    
//     // console.log('drag-End => ',e.target.classList);
//     e.target.classList.remove('opacity-50')
//     e.target.classList.remove('dragging')
//     // console.log('drag-End => ',e.target.classList);

// }


// const dragOver = (e) => {
//     e.preventDefault()
//     const conteiner = document.querySelector(".conteiner");
//     const draggable = document.querySelector('.dragging');
   
//     const closestElement = dragAfterElement(conteiner, e.clientX, e.clientY);

//     console.log(closestElement.children.div);

//     if (closestElement == null) {
//         conteiner.appendChild(draggable);
//         console.log('after')
//         //     console.log('last')
//     } else {
//         // conteiner.insertBefore(draggable, closestElement);
//         conteiner.insertBefore(draggable, closestElement);
//         console.log('before')
//         //     if (closestElement.before) {
//         // } else {
//         //     console.log('after')
//         //     conteiner.insertBefore(draggable, closestElement.nextElementSibling);
//         // }
//     }

    
// }



// function dragAfterElement(container, x, y) {
//     const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
//     return draggableElements.reduce((closest, child) =>{
//         const box = child.getBoundingClientRect();
//         const offsetX = x - box.left - box.width / 2;
//         const offsetY = y - box.top;
//         console.log('X--->',offsetX);
//         console.log('Y--->',offsetY);
//         // console.log(closest);
//         if(offsetX < 0 && offsetX > closest.offsetX ) {
//             return {
//                 offsetX:offsetX,
//                 element: child
//             }
//         }else {
//             return closest;
//         }
//         // if(offsetY < 0 && offsetY > closest.offsetY) {
//         //     return {
//         //         offsetY:offsetY,
//         //         element: child
//         //     }
//         // }else {
//         //     return closest;
//         // }
//     }, {offsetX: Number.NEGATIVE_INFINITY, offsetY: Number.POSITIVE_INFINITY}).element;
// }

// export {
//     dragStart,
//     dragEnd,
//     dragOver
// };

// // ----------8************************************************88
// // ----------8************************************************88
// // ----------8************************************************88
// // ----------8************************************************88
// // ----------8************************************************88

// // let dragDestIndex;
// // let draggedEl;
// // let draggedElIndex;
// // let rearranging = false;
// // const rearrangingDuration = 350;
// // let draggableElArr = Array.from(document.querySelectorAll('.draggable'));

// // function arrangeItems(itemEls, columnsCount, containerEl, elHeight) {
// //     const container = document.querySelector(".conteiner");
  
// //     // Set height of elements
// //     const elWidth = container.clientWidth / columnsCount;
// //     elHeight = elHeight || elWidth;
  
// //     itemEls.forEach((item, i) => {
// //       item.dataset.index = i;
// //       const pos = {
// //         x: (i % columnsCount),
// //         y: Math.floor(i / columnsCount)
// //       };
  
// //       item.style.top = `${pos.y * elHeight}px`;
// //       item.style.left = `${pos.x * elWidth}px`;
// //       item.style.width = `calc(${100 / columnsCount}% - 10px)`;
// //       item.style.height = `calc(${elHeight}px - 10px)`;
// //       item.style.boxSizing = 'border-box';
// //     });
// //   }

// // // Rearrange the items in an array
// // function rearrangeItems(arr, movedItemIndex, destinationIndex) {
// //     const movedEl = arr.splice(movedItemIndex, 1)[0];
// //     arr.splice(destinationIndex, 0, movedEl);
// //     return arr;
// // };

// // // arrangeItems(Array.from(document.querySelectorAll('.draggable')), 3, '.conteiner');

// // // Drag event handlers
// // const dragStart = (e) => {
// //     const draggableElements = document.querySelectorAll(".draggable");
// //     const container = document.querySelector(".conteiner");
// //     draggedEl = e.target;
// //     const sortedArr = [];
// //     draggedEl.classList.add('opacity-50', 'dragging');
// //     // draggedElIndex = [...draggableElements].indexOf(draggedEl);
// //     // console.log('Dragging element at position', draggedElIndex);
// //     draggableElArr.forEach((el, i) => {
// //         const elIndex = el.dataset.index;
// //         sortedArr[elIndex] = el;
// //       });
// //       draggableElArr = sortedArr;
// //       draggedElIndex = e.target.dataset.index;
// //     console.log('dragging element at position ', draggedElIndex);

// // };

// // const dragEnd = (e) => {
// //     e.target.classList.remove('opacity-50', 'dragging');
// // };

// // const dragOver = (e) => {
// //     e.preventDefault();
// //     const container = document.querySelector(".conteiner");
// //     const draggable = document.querySelector('.dragging');
// //     // const closestElement = dragAfterElement(container, e.clientX, e.clientY);

// //     if (rearranging) {
// //         return;
// //       }

// //     dragDestIndex = e.target.dataset.index;
// //     console.log('dragging over position ', dragDestIndex);
// //     draggedElIndex = draggedEl.dataset.index;



// //     if (draggedElIndex !== dragDestIndex) {
// //         rearranging = true;
// //         console.log('dragging element at position ', draggedElIndex, ' to new dest at position ', dragDestIndex);
// //         const rearrangedEls = rearrangeItems(draggableElArr, draggedElIndex, dragDestIndex);
// //         arrangeItems(rearrangedEls, 3, '.conteiner');
// //         setTimeout(() => { rearranging = false; }, rearrangingDuration);
// //       }
// //     // if (closestElement) {
// //     //     const dragDestIndex = [...container.children].indexOf(closestElement);
// //     //     if (draggedElIndex !== dragDestIndex) {
// //     //         const draggableElements = [...container.querySelectorAll(".draggable")];
// //     //         const rearrangedEls = rearrangeItems(draggableElements, draggedElIndex, dragDestIndex);
// //     //         arrangeItems(rearrangedEls, 4, '.conteiner');
// //     //         draggedElIndex = dragDestIndex;
// //     //         setTimeout(() => { rearranging = false; }, rearrangingDuration);
// //     //     }
// //     // // }
// // };

// // const drop = (e) => {
// //     e.preventDefault();
// //     rearranging = false;
// // };
// // function dragAfterElement(container, x, y) {
// //     // const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
// //     const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
// //     return draggableElements.reduce((closest, child) => {
// //         const box = child.getBoundingClientRect();
// //         const offset = y - box.top - box.height / 2;
// //         if (offset < 0 && offset > closest.offset) {
// //             return { offset: offset, element: child };
// //         } else {
// //             return closest;
// //         }
// //     }, { offset: Number.NEGATIVE_INFINITY }).element;
// // }


// // export {
// //     dragStart,
// //     dragEnd,
// //     dragOver,
// //     // drop,
// //     // arrangeItems,
// // };