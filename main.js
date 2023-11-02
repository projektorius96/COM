import './style.css'
import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'app',
  width: innerWidth,
  height: innerHeight,
});

const layer = new Konva.Layer();

const simpleText = new Konva.Text({
  x: innerWidth / 16,
  y: innerHeight / 12,
  text: '', /* <= Later I could make it as [non-printable], but blink-able char  */
  fontSize: 32,
  fontFamily: 'Roboto',
  fill: 'black',
});

const textNodeDetection = new Konva.Transformer({
  nodes: [simpleText],
  width: (simpleText.text().length * simpleText.fontSize()),
  borderStroke: 'red',
  rotateEnabled: false,
  /* empty array disables all bounding-box anchors as follows : */
  enabledAnchors: [/* 'middle-left', 'middle-right' */],
});

textNodeDetection.on('transform', function(){
  /* console.log(this.width(), simpleText.width(), simpleText.text().length * simpleText.fontSize()); */
  this.setAttrs({
    width: Math.max(simpleText.width() * simpleText.scaleX(), simpleText.text().length * simpleText.fontSize()),
    scaleX: 1,
    scaleY: 1,
  });
})

// add the shapes to the layer
layer.add(...[/* textNodeDetection,  */simpleText]);

// add the layer to the stage
stage.add(layer);

/* === Rich text editing right inside canvas (Konva.js) === */
const canvas = layer.getCanvas()._canvas;
stage.content.addEventListener("click", async function(){

  await document.documentElement.requestFullscreen();
  /* document.exitFullscreen() */
  
  canvas.tabIndex = 1;
  canvas.focus();
  canvas.style.outline = "none";

  // DEV_NOTE # text_cursor (ibeam) work very buggy, better find a way to keep blinking a wee cursor-like shape that follows along
  // let counter = 0;
  /* let text_cursor = new RegExp('\u{1D100}').source; */
  // setInterval(()=>{
  //   if(counter % 2){
  //     simpleText.setAttr("text", simpleText.text().replace(text_cursor, ""))
  //   }
  //   else {
  //     simpleText.setAttr("text", simpleText.text() + text_cursor)
  //   }
  //   counter++;
  // }, 750)

})

canvas.addEventListener("keydown", async function(e){

  // DEV_NOTE # let's emulate event via keydown action rather than action of resizing the textNodeDetection boundingBox
  textNodeDetection.dispatchEvent(
    new CustomEvent('transform')
  )

  let currentText = simpleText.getAttr("text");
    switch (e.code){
      case 'Backspace':
        simpleText.setAttr("text", currentText.substring(0,currentText.length-1));
        break;
      case 'Delete':
        simpleText.setAttr("text", currentText.substring(0,-1));
        break;
      case 'Enter':
        simpleText.setAttr("text", currentText + "\n");
        break;
      case 'AltLeft':
      case 'ControlLeft':
      case 'ShiftLeft':
      case 'CapsLock':
      // # possible some other cases that results to e.code ...
        e.preventDefault()
        break;
      case 'Tab':
          e.preventDefault()
          simpleText.setAttr("text", simpleText.getAttr("text") + "\t\t\t\t");
        break;
      default:
        console.log(e.code)
        /** {@link https://www.w3.org/TR/uievents-code/#key-alphanumeric-writing-system} 
         * - opt in the rest of writing system keys as is 
         * */
        simpleText.setAttr("text", simpleText.getAttr("text") + e.key);
    }

})