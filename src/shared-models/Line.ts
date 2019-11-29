import ILine from "./ILine";
import Point from "./Point";

export default class Line implements ILine {
  p1: Point;
  p2: Point;

  constructor(p1: Point, p2: Point) {
    this.p1 = p1;
    this.p2 = p2;
  }
}
