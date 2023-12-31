// button elements
const colorBtn = document.querySelector("#colorButton");
const rgbBtn = document.querySelector("#rgbToggler");
const neonBtn = document.querySelector("#neonToggler");
const eraserBtn = document.querySelector("#eraserButton");
const clearBtn = document.querySelector("#clearButton");
const sizeBtn = document.querySelector("#sizeButton");
const closeBtn = document.querySelectorAll("#closeButton");

// container elements
const mainGridContainer = document.querySelector(".main__canvas__grids");
const sizeSelectorModal = document.querySelector(".popUpSizeSelector");
const colorPickerModal = document.querySelector(".popUpColorPicker");
const backDrop = document.querySelector(".backdrop");

// TODO: Functions for the buttons
colorBtn.addEventListener("click", () => {
  if (
    colorPickerModal.style.display == "none" ||
    colorPickerModal.style.display == ""
  ) {
    colorPickerModal.style.display = "flex";
    backDrop.style.display = "block";
  } else {
    colorPickerModal.style.display = "none";
    backDrop.style.display = "none";
  }
});

closeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const parentContainer = btn.parentNode;
    parentContainer.style.display = "none";
    backDrop.style.display = "none";
  });
});
