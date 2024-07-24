const gridContainer = document.querySelector("#grid-container");
const optionsContainer = document.querySelector("#options-container");
const setGridButton = document.querySelector("#set-grid-button");
const setGridInput = document.querySelector("#set-grid-input");
const colorSelector = document.querySelector("#color-selector");
const randomizerButton = document.querySelector("#randomizer-button");
const eraserButton = document.querySelector("#eraser-button");
const dumpButton = document.querySelector("#dump-button");
const saveToPalette = document.querySelector("#palette-save");
const paletteGrid = document.querySelector("#palette-grid");

let activeColor = "black"; //default pixel color, overwritten by user selection in the color input element

let randomizerActive = false; //a boolean switch variable to check the status of the randomizer button
let eraserActive = false; // same as randomizer, but for the eraser element


function createGrid(pixelsPerRow) {
    for (let i = 0; i < pixelsPerRow; i++ ) { 
        const gridRow = document.createElement("div");
        gridRow.classList.add("grid-row");

        for (let j = 0; j < pixelsPerRow; j++) {
            const newPixel = document.createElement("div");
            newPixel.classList.add("pixel");
            newPixel.style.width = `${800 / pixelsPerRow}px`;
            newPixel.style.height = `${800 / pixelsPerRow}px`;
            gridRow.appendChild(newPixel);
        }
    gridContainer.appendChild(gridRow);
    }
};

setGridButton.addEventListener("click", () => {
    const numbersOnly = /[0-9]/;
    
    if(setGridInput.value > 100) {
        setGridInput.value = "";
        alert("Side length must be less than 100 to stop your computer from exploding");
    } else {
        if (!setGridInput.value.match(numbersOnly)) {
            setGridInput.value = "";
            alert("You must enter a number");
        } else if (setGridInput.value.match(numbersOnly)) {
            gridContainer.innerHTML = "";
            createGrid(setGridInput.value);
            setGridInput.value = "";
        }
    }
    setGridInput.focus();
});

gridContainer.addEventListener("mouseover", (e) => {
    let pixelArray = document.querySelectorAll(".pixel");
    pixelArray = [...pixelArray];

    let target = e.target;

    if (randomizerActive === true) { //if the randomizer button is active, then randomize the color of pixels on mouseover
        if (pixelArray.indexOf(target) >= 0) {
            target.style.backgroundColor = randomColorGenerator();
        }
    } else if (eraserActive === true) { //if the eraser button is active, then randomize the color of pixels on mouseover
        if (pixelArray.indexOf(target) >= 0) {
            target.style.backgroundColor = "white";
        }
    } 
    else { // default case of setting the background color of pixel to the current active color (set through the color input element)
        if (pixelArray.indexOf(target) >= 0) {
            target.style.backgroundColor = activeColor;
        }
    }
});

colorSelector.addEventListener("input", () => {
    randomizerOff();
    eraserOff();
    activeColor = colorSelector.value;
});

/*
function randomColorGenerator() {
    let hue = Math.round(Math.random() * 360);
    let saturation = Math.round(Math.random() * 100);
    let lightness = Math.round(Math.random() * 100);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
*/

//generates a random RGB value every time it is called

function randomColorGenerator() {
    let red = Math.round(Math.random() * 255);
    let green = Math.round(Math.random() * 255);
    let blue = Math.round(Math.random() * 255);
    return `rgb(${red}, ${green}, ${blue})`;
}

randomizerButton.addEventListener("click", () => {
    if (randomizerActive === false) {
        randomizerButton.style.backgroundColor = "green";
        randomizerActive = true;
        eraserOff()
    } else {
        randomizerOff();
    };
});

eraserButton.addEventListener("click", () => {
    if (eraserActive === false) {
        eraserButton.style.backgroundColor = "green";
        eraserActive = true;
        randomizerOff();
    } else {
        eraserOff();
    };
});

dumpButton.addEventListener("click", () => {
    let promptResponse = prompt("BEWARE: The button you just clicked will set every pixel to the same color as the one you currently have selected. This will overwrite all content on the canvas currently. Type 'yes' to confirm this action.") === 'yes';
    
    if (promptResponse) {
        activeColor = colorSelector.value;
        const pixelList = document.querySelectorAll(".pixel");
    
        pixelList.forEach((pixel) => {
            pixel.style.backgroundColor = activeColor;
        }) 
    }
});

function randomizerOff() {
    randomizerButton.style.backgroundColor = "#EFEFEF";
    randomizerActive = false;
}

function eraserOff() {
    eraserButton.style.backgroundColor = "#EFEFEF";
    eraserActive = false;
}

saveToPalette.addEventListener("click", () => {
    let paletteColors = document.querySelectorAll(".palette-color");
    
    for (let i = paletteColors.length - 1; i > 0; i--) {
        paletteColors[i].style.backgroundColor = paletteColors[i - 1].style.backgroundColor;
        console.log(paletteColors);
    }

    paletteColors[0].style.backgroundColor = activeColor;   
})

paletteGrid.addEventListener("click", (e) => {
    let target = e.target;
    activeColor = target.style.backgroundColor;
    colorSelector.value = activeColor;
});

console.log(255.)


setGridInput.focus();


