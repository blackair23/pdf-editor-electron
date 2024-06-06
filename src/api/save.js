import {page } from "../lib.js";

const saveFile = (content, action, fileName) => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: "application/pdf"});
    element.href = URL.createObjectURL(file);
    element.download = `${action}-${fileName}`;
    element.click();
    console.log(element);
    page.redirect('/');
}

export {
    saveFile,
};
