import * as PIXI from 'pixi.js';

class NightState {

    enable() {
      let colorMatrix = new PIXI.filters.ColorMatrixFilter();
      colorMatrix.greyscale(0.3, true);
      return colorMatrix;
    }

    disable() {
      return [];
    }
}

export default NightState;