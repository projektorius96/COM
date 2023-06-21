import './style.css'

import Konva from 'konva';
import { fullViewportWidth, fullViewportHeight } from './src/viewport.js'

var stage = new Konva.Stage({
  container: 'app',
  width: fullViewportWidth,
  height: fullViewportHeight,
});

var layer = new Konva.Layer();

var simpleText = new Konva.Text({
  x: fullViewportWidth / 16,
  y: fullViewportHeight / 12,
  text: 'Write some text', /* <= Later I could make it as [non-printable], but blink-able char  */
  fontSize: 16,
  fontFamily: 'Calibri',
  fill: 'black',
});

var textNodeDetection = new Konva.Transformer({
  nodes: [simpleText],
  /* empty array disables all Anchors */
  enabledAnchors: [/* 'middle-left', 'middle-right' */],
  // // set minimum width of text
  // boundBoxFunc: function (oldBox, newBox) {
  //   /* console.log(simpleText.x() + simpleText.text().length); */
  //   newBox.width = Math.max(simpleText.x() + simpleText.text().length, newBox);
  //   return newBox;
  // },
});
// textNodeDetection.on('transform', function () {
//   /* ... */
// });

globalThis.Transformer = textNodeDetection;

// add the shapes to the layer
layer.add(...[textNodeDetection, simpleText]);

// add the layer to the stage
stage.add(layer);

/* === Rich text editing right inside canvas (Konva.js) === */

// DEV_NOTE # the real issue today is text detection, but this could be solved with Transformer @https://konvajs.org/docs/sandbox/Editable_Text.html#sidebar
// Refer README.md for more...
stage.content.addEventListener("click", function(){
  this.firstElementChild.tabIndex = 1;
  this.firstElementChild.focus();
  this.firstElementChild.addEventListener("keydown", (e)=>{


    if (e.code === 'Backspace'){
      let currentText = String(simpleText.getAttr("text"));
      simpleText.setAttr("text", currentText.substring(0, currentText.length-1));
    }
    else {
      simpleText.setAttr("text", simpleText.getAttr("text") + e.key);
    }

  })
})