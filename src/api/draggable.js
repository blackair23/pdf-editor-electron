import Sortable from "../../node_modules/sortablejs/modular/sortable.complete.esm.js";

const draggableGrid = () => {
    Sortable.create(document.getElementById('card-holder'), 
    {
        animation: 250,
        ghostClass: 'opacity-50'
    });
}

export {
    draggableGrid,
};

