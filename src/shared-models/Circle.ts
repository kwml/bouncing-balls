import ICircle from "./ICircle";

export default class Circle implements ICircle {
  radius: number;

  position: {
    x: number;
    y: number;
  };

  constructor(radius: number, posX: number, posY: number) {
    this.radius = radius;
    this.position = {
      x: posX,
      y: posY
    };
  }
}
