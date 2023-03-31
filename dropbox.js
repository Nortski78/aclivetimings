import { publish } from "./pubsub.js";

export function initDropBox() { 
    console.log("dropbox initialised");
}

let lapsData = "";

const droparea = document.querySelector(".drop_zone");

const prevents = (e) => e.preventDefault();
const active = () => droparea.classList.add("green-border");
const inactive = () => droparea.classList.remove("green-border");

const handleDrop = (e) => {
    const file = e.dataTransfer.files[0],
    reader = new FileReader();
    reader.onload = function (event) {
        //console.log(event.target.result);
        lapsData = event.target.result;
        publish('filedropped', lapsData);
        //console.log(lapsData);
    };
    console.log(file);
    reader.readAsText(file);   
}

//events

["dragenter", "dragover", "dragleave", "drop"].forEach(evtName => {
    droparea.addEventListener(evtName, prevents);
});

["dragenter", "dragover"].forEach(evtName => {
    droparea.addEventListener(evtName, active);
});

["dragleave", "drop"].forEach(evtName => {
    droparea.addEventListener(evtName, inactive);
});

droparea.addEventListener("drop", handleDrop);

