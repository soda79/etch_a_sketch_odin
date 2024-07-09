const container = document.querySelector(".grid_container");
const slider = document.querySelector(".slider");
const marker = document.querySelector(".marker_btn");
const eraser = document.querySelector(".eraser_btn");
const reset = document.querySelector(".reset_btn")
const rgb = document.querySelector(".RGB_btn");
const opacity = document.querySelector(".opacity_btn");
const knobHorizontal = document.querySelector(".horizontal");
const knobVertical = document.querySelector(".vertical")

let scale = 100;
gridSet();
nodeListCreate();
marker.classList.add("activated");

slider.oninput = (()=>{
    scale = slider.value;
    grid.remove();
    gridSet();
    nodeListCreate();
    markedDivs();
})

function gridSet(){
    grid = document.createElement("div")
    grid.classList.add("grid")
    container.appendChild(grid);

    for(let i=0; i<scale; i++){
        column = document.createElement("div");
    
        grid.appendChild(column);
        column.classList.add("column");
        
        for(let j=0; j<scale;j++){
            block = document.createElement("div");
            column.appendChild(block);
            block.classList.add("block");
        }
    }
}


const btnArray = [marker, eraser, reset, rgb, opacity];

function active(n){
    btnArray[n].classList.add("activated")
    let btnInactive = btnArray.slice();
    btnInactive.splice(n,1);
    for(i of btnInactive){i.classList.remove("activated")}
}

function nodeListCreate(){
    allBlocks = document.querySelectorAll(".block");
}

markedDivs();

function markedDivs(){
    const n = 0;
    active(n);
    opacityReset();
    for(let i=0; i<(scale*scale); i++){
        allBlocks[i].addEventListener("mouseover", ()=>{allBlocks[i].style.backgroundColor="black";})
    }
}


function erasedDivs(){
    const n = 1;
    active(n);
    opacityReset();
    for(let i=0; i<(scale*scale); i++){
        allBlocks[i].addEventListener("mouseover", ()=>{allBlocks[i].style.backgroundColor="silver";})
    }
}

function resetDivs(){
    const n = 0;
    active(n);
    markedDivs();
    for(let i=0; i<(scale*scale); i++){
        allBlocks[i].style.backgroundColor="silver";
        allBlocks[i].style.opacity="1";
    }
}

function rgbDivs(){
    const n = 3;
    active(n);
    opacityReset();
    for(let i=0; i<(scale*scale); i++){
        allBlocks[i].addEventListener("mouseover", ()=>{
            const r1 = Math.floor(Math.random()*256);
            const r2 = Math.floor(Math.random()*256);
            const r3 = Math.floor(Math.random()*256);
            const result = "rgb(" + r1 + "," + r2 + "," + r3 + ")";
                
            allBlocks[i].style.backgroundColor=result;
        });
    }
}

function opacityDivs(){
    const n = 4
    active(n);
    for(let i=0; i<(scale*scale); i++){
        let j = 0;
        allBlocks[i].addEventListener("mouseover", ()=>{
            j+=0.1;
            allBlocks[i].style.backgroundColor="black";
            allBlocks[i].style.opacity=j;
        });
    }
}

function opacityReset(){
    for(let i=0; i<(scale*scale); i++){
        allBlocks[i].addEventListener("mouseover", ()=>{allBlocks[i].style.opacity="1"});
    }
}

var currentX = 0;
var currentY = 0;

container.addEventListener("mousemove", function(e){
    count+=2.6

    if(e.x > currentX){
        knobHorizontal.style.transform = "rotate(" + count + "deg)"
    }
    else if(e.x < currentX){
        knobHorizontal.style.transform = "rotate(" + "-" + count + "deg)"
    }

    if(e.y < currentY){
        knobVertical.style.transform = "rotate(" + count + "deg)"
    }
    else if(e.y > currentY){
        knobVertical.style.transform = "rotate(" + "-" + count + "deg)"
    }

    currentX = e.x;
    currentY = e.y
})

var count = 0;

marker.addEventListener("click", markedDivs);
eraser.addEventListener("click", erasedDivs);
reset .addEventListener("click", resetDivs);
rgb.addEventListener("click", rgbDivs);
opacity.addEventListener("click", opacityDivs);






