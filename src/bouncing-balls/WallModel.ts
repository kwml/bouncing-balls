import ILine from "../shared-models/ILine";
import Point from "../shared-models/Point";

export default class WallModel implements ILine {
  p1: Point;
  p2: Point;
  e: number; // restitution coefficient

  constructor(p1: Point, p2: Point, e: number) {
    this.p1 = p1;
    this.p2 = p2;
    this.e = e;
  }
}