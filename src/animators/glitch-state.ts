import * as PIXI from 'pixi.js';
import { GlitchFilter } from '@pixi/filter-glitch';

class GlitchState {
    public isActive = false;

    switch(): PIXI.Filter[] {
        if (!this.isActive) {
            this.isActive = true;
            return [];
        }
        this.isActive = false;
        return [new GlitchFilter()];
    }
}

export default GlitchState;