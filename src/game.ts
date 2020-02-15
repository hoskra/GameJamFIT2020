import * as PIXI from 'pixi.js';


class Game extends PIXI.Application {

  private obj: PIXI.Graphics;

  constructor() {
    super({
      view: <HTMLCanvasElement>document.getElementById('gameCanvas'),
      backgroundColor: 0x000000,
      width: 800,
      height: 450
    });

    this.obj = new PIXI.Graphics();
    this.obj.beginFill(0xFF0000);
    this.obj.drawRect(0, 0, 400, 400);
    this.obj.pivot.set(200, 200);
    this.obj.endFill();
    this.obj.position.set(this.view.width / 2, this.view.height / 2);

    this.stage.addChild(this.obj);

    // initialize game loop
    this.ticker.add(deltaTime => this.update(deltaTime));
  }

  // game loop
  update(deltaTime: number) {
    this.obj.rotation += 0.01 * deltaTime;
  }
}

new Game();