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
const errorMessage = document.querySelector(".sizeErrorMessage");

// color value
const colorPicker = document.querySelector("#colorPicker");
let colorValue = "#222424";
colorPicker.addEventListener("input", () => {
  colorValue = colorPicker.value;
  colorBtn.style.color = colorValue;
  colorBtn.style.borderColor = colorValue;
});

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

  deactivateRgb();
  deactivateErase();
});

sizeBtn.addEventListener("click", () => {
  if (
    sizeSelectorModal.style.display == "none" ||
    sizeSelectorModal.style.display == ""
  ) {
    sizeSelectorModal.style.display = "flex";
    backDrop.style.display = "block";
  } else {
    sizeSelectorModal.style.display = "none";
    backDrop.style.display = "none";
  }
});

// size selector function
const enterBtn = document.querySelector(".enterSizeButton");
enterBtn.addEventListener("click", selectSize);
closeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const parentContainer = btn.parentNode;
    parentContainer.style.display = "none";
    backDrop.style.display = "none";
  });
});

// clear function
clearBtn.addEventListener("click", () => {
  const grid = document.querySelectorAll(".gridRow");
  grid.forEach((box) => {
    box.style.backgroundColor = "white";
    box.style.borderColor = "#3e3f41";
  });
});

// eraser function
let eraserOn = false;
eraserBtn.addEventListener("click", () => {
  if (eraserOn) {
    eraserBtn.style.backgroundColor = "#3e3f41";
    eraserBtn.style.color = "white";
    eraserOn = false;
    deactivateNeon();
    deactivateRgb();
    deactivateColor();
  } else {
    eraserBtn.style.backgroundColor = "white";
    eraserBtn.style.color = "#3e3f41";
    eraserOn = true;
  }
});

// select size function
function selectSize() {
  const value = document.querySelector("#sizeSelectorInput").value;
  if (value > 100 || value < 1 || isNaN(value)) {
    errorMessage.style.visibility = "visible";
    setTimeout(() => {
      errorMessage.style.visibility = "hidden";
    }, 2000);
    return;
  }

  applySize(value);
}
// apply size function
function applySize(size) {
  mainGridContainer.innerHTML = "";
  for (let i = 0; i < size; i++) {
    const gridCol = document.createElement("div");
    gridCol.classList.add("gridColumn");

    for (let j = 0; j < size; j++) {
      const gridRow = document.createElement("div");
      gridRow.classList.add("gridRow");
      gridCol.appendChild(gridRow);
    }
    mainGridContainer.appendChild(gridCol);
  }
}

// change color function
function changeColor(grid) {
  let mouseDown = false;

  grid.forEach((box) => {
    box.addEventListener("mousedown", () => {
      mouseDown = true;
      colorGrid(box);
    });

    box.addEventListener("mouseup", () => {
      mouseDown = false;
    });

    box.addEventListener("mouseenter", () => {
      if (mouseDown) {
        colorGrid(box);
      }
    });

    function colorGrid(box) {
      if (eraserOn) {
        rgbMode = false;
        neonMode = false;
        box.style.backgroundColor = "white";
        box.style.borderColor = "#3e3f41";
      } else {
        box.style.backgroundColor = colorValue;
      }

      if (rgbMode) {
        box.style.backgroundColor = `rgb(${randomNumber(
          1,
          255
        )}, ${randomNumber(1, 255)}, ${randomNumber(1, 255)})`;
      }

      if (neonMode) {
        box.style.borderColor = `rgb(${randomNumber(1, 255)}, ${randomNumber(
          1,
          255
        )}, ${randomNumber(1, 255)})`;
      }
    }
  });
}

// neon function
let neonMode = false;
neonBtn.addEventListener("click", () => toggleNeon());
function toggleNeon() {
  neonMode = !neonMode;
  if (neonMode) {
    neonBtn.style.backgroundColor = "#1b1c20";
    neonColor();
    deactivateErase();
  } else {
    neonBtn.style.backgroundColor = "#3e3f41";
    neonBtn.style.borderColor = "#222424";
  }
}
// neon styles function
function neonColor() {
  setTimeout(() => {
    let neon = `rgb(${randomNumber(150, 255)}, ${randomNumber(
      150,
      255
    )}, ${randomNumber(150, 255)})`;
    neonBtn.style.borderColor = neon;
    neonBtn.style.color = neon;
    if (neonMode) {
      neonColor();
    } else {
      neonBtn.style.borderColor = "#222424";
      neonBtn.style.color = "white";
    }
  }, 1000);
}

// rgb function
let rgbMode = false;
rgbBtn.addEventListener("click", () => {
  rgbMode = !rgbMode;
  if (rgbMode) {
    rgbColor();
    deactivateColor();
    deactivateErase();
  }
});
// rgb changes color function
function rgbColor() {
  setTimeout(() => {
    let rgb = `rgb(${randomNumber(1, 255)}, ${randomNumber(
      1,
      255
    )}, ${randomNumber(1, 255)})`;
    rgbBtn.style.borderColor = rgb;
    rgbBtn.style.color = rgb;
    if (rgbMode) {
      rgbColor();
    } else {
      rgbBtn.style.borderColor = "#222424";
      rgbBtn.style.color = "white";
    }
  }, 1000);
}

// generate random number
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//change color event delegates
mainGridContainer.addEventListener("mouseover", (event) => {
  const target = event.target;

  if (target.classList.contains("gridRow")) {
    const gridRow = document.querySelectorAll(".gridRow");

    changeColor(gridRow);
  }
});

// deactivate function
function deactivateColor() {
  colorBtn.style.color = "white";
  colorBtn.style.borderColor = "#222424";
  colorBtn.style.backgroundColor = "#3e3f41";
}

function deactivateNeon() {
  neonMode = false;
  neonBtn.style.color = "white";
  neonBtn.style.borderColor = "#222424";
  neonBtn.style.backgroundColor = "#3e3f41";
}

function deactivateErase() {
  eraserOn = false;
  eraserBtn.style.color = "white";
  eraserBtn.style.borderColor = "#222424";
  eraserBtn.style.backgroundColor = "#3e3f41";
}

function deactivateRgb() {
  rgbMode = false;
  rgbBtn.style.color = "white";
  rgbBtn.style.borderColor = "#222424";
  rgbBtn.style.backgroundColor = "#3e3f41";
}
