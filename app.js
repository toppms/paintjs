const canvas = document.getElementById("js-Canvas");
//fixel control Context "2d"
const ctx = canvas.getContext("2d");
//fixel을 다루는 윈도우의 크기를 지정
const colors = document.getElementsByClassName("js-Color");
const range = document.getElementById("js-Range");
const mode = document.getElementById("js-Mode");
const save = document.getElementById("js-Save");
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
//선 생상과 선 너비 설정
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}
function startPainting() {
    painting = true;
}
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
         //클릭하지 않고 움직였을 때 paht 시작
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else {
        //클릭하고 움직였을 때 
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}
function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}
function handleCanvasClick() {
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}
function handleCM(event) {
    event.preventDefault();
}
function handleSaveClick() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
}
if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}
if(range) {
    range.addEventListener("input",handleRangeChange);
}
if(mode) {
    mode.addEventListener("click",handleModeClick);
}
if(save) {
    save.addEventListener("click",handleSaveClick);
}
Array.from(colors).forEach(color => 
    color.addEventListener("click",handleColorClick));