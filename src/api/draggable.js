import Sortable from "../../node_modules/sortablejs/modular/sortable.complete.esm.js";

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

