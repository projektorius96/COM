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
  text: '|', /* <= Later I could make it as [non-printable], but blink-able char  */
  fontSize: 16,
  fontFamily: 'Calibri',
  fill: 'black',
});

// add the shapes to the layer
layer.add(simpleText);

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