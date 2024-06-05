
const alertPopup = (header, text, btn) => {

    document.getElementById('my_modal_1').showModal();
    document.getElementById('popUpHeader').innerHTML = header;
    document.getElementById('popUpText').innerHTML = text;
    document.getElementById('popUpBtn').innerHTML = btn;

}

export {
    alertPopup,
}