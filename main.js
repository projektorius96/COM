import './style.css'

import Konva from 'konva';
import { fullViewportWidth, fullViewportHeight } from './src/viewport.js'

document.addEventListener('DOMContentLoaded', ()=>{
  console.log(textNodeDetection.width(), simpleText.width(), simpleText.text().length * simpleText.fontSize()); 
})

var stage = new Konva.Stage({
  container: 'app',
  width: fullViewportWidth,
  height: fullViewportHeight,
});

var layer = new Konva.Layer();

var simpleText = new Konva.Text({
  x: fullViewportWidth / 16,
  y: fullViewportHeight / 12,
  text: 'Press Delete on your keyboard to remove this placeholder text...', /* <= Later I could make it as [non-printable], but blink-able char  */
  fontSize: 32,
  fontFamily: 'Roboto',
  fill: 'black',
});

var textNodeDetection = new Konva.Transformer({
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

// DEV_NOTE # the real issue today is text detection, but this could be solved with Transformer @https://konvajs.org/docs/sandbox/Editable_Text.html#sidebar
// Refer README.md for more...
stage.content.addEventListener("click", function(){
  this.firstElementChild.tabIndex = 1;
  this.firstElementChild.focus();

  // let counter = 0;
  // let timer = setInterval(()=>{
  //   if(counter % 2){
  //     simpleText.text("")
  //   }
  //   else {
  //     simpleText.text("|")
  //   }
  //   counter++;
  // }, 1000)

  this.firstElementChild.addEventListener("keydown", (e)=>{

    // DEV_NOTE # too much handling, leaving this "make-up" for later to solve ...
    // clearInterval(timer)
    // if (simpleText.text().match("|")){
    //   simpleText.setAttr("text", "")
    // }

    // emulate event via keydown action rather than via action of resizing the textNodeDetection boundingBox
    textNodeDetection.dispatchEvent(
      new CustomEvent('transform')
    )

    let currentText = simpleText.getAttr("text");
    switch (e.code) {
      // DEV_NOTE__IMPORTANT # unhandles control sequences such as , 'Tab', 'Shift', 'CapsLocks', etc. yields weird bug that du/tri/nth-plicates the e.key appended to simpleText
      case 'Backspace':
        simpleText.setAttr("text", currentText.substring(0,currentText.length-1));
        break;
      case 'Delete':
        simpleText.setAttr("text", currentText.substring(0,-1));
        break;
      case 'Enter':
        simpleText.setAttr("text", currentText + "\n");
        break;
      case 'Tab':
        simpleText.setAttr("text", simpleText.getAttr("text") + "\t");
        break;
      default:
        simpleText.setAttr("text", simpleText.getAttr("text") + e.key);
    }

  })
})