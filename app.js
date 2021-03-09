const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const color = document.getElementsByClassName('color');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');

const defaultColor = "#2d2d2d"
const defaultSize = 700;

canvas.width = defaultSize;
canvas.height = defaultSize;

ctx.fillStyle = '#ffffff';
ctx.fillRect(0,0,defaultSize,defaultSize);

ctx.fillStyle = defaultColor;
ctx.strokeStyle = defaultColor;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting(){
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting) {
    ctx.beginPath();
    ctx.moveTo(x,y);
    // console.log("creating path in", x,y);
    // path는 마우스가 움직이는 동안 계속해서 생성되지만 실행은 되지않음
  } else {
    ctx.lineTo(x,y);
    ctx.stroke();
    // console.log("creating line in", x,y);
    // 클릭하는 순간 path가 실행되어 클릭이 종료되는 순간까지 line이 만들어짐.

  }
}

function canvasClick(){
  if(filling) {
    ctx.fillRect(0,0,defaultSize,defaultSize);
  }
}

function clickRightNope(event){
  event.preventDefault();
}

function saveClickRight(){
  const image = canvas.toDataURL();
  const link = document.createElement('a');
  link.href = image;
  link.download = "paintjs";
  link.click();
}
if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", canvasClick);
  canvas.addEventListener("contextmenu", clickRightNope);
}

function changeColor(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

Array.from(color).forEach(color =>
  color.addEventListener("click",changeColor));
  // color => color 는 배열의 대표 이름! 무얼 하든 상관없다.
  // yap => yap okay!!

function rangeChange(event){
  const stroke = event.target.value;
  ctx.lineWidth = stroke;
}

  if(range) {
    range.addEventListener("input", rangeChange);
  }

  function modeChange(event) {
    if(filling === true) {
      filling = false;
      mode.innerText = "Fill";
    } else {
      filling = true;
      mode.innerText = "Paint";
    }
  }
  if(mode) {
    mode.addEventListener("click",modeChange);
  }

  if(save) {
    save.addEventListener("click", saveClickRight);
  }