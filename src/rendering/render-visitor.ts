import Visitor from "./visitor-interface";
import Scene from "../scenes/card-scene";

class RenderVisitor implements Visitor {
  public graphics: PIXI.Graphics;
  setGraphics(obj: PIXI.Graphics) {
    this.graphics = obj;
  }
  visit(scene: Scene) {
    scene.sceneObjects.forEach(obj => obj.accept(this));
  }
}

export default RenderVisitor;