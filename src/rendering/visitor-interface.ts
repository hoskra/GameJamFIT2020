import Scene from "../scenes/card-scene";

interface Visitor {
    visit(scene: Scene);
    setGraphics(obj: PIXI.Graphics);
}

export default Visitor;