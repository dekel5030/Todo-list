import {
    loadButtonImages,
    addProjectClick,
    selectTabChange
  } from './mainView.js';

document.addEventListener("DOMContentLoaded", () => {
    loadButtonImages();
    attachTabListeners();
    document.getElementById("add-project").addEventListener("click", addProjectClick);
});


function attachTabListeners() {
    const tabButtons = document.querySelectorAll("button.tab, button.selected-tab");

    tabButtons.forEach(button => {
        button.addEventListener("click", selectTabChange);
    });
}
