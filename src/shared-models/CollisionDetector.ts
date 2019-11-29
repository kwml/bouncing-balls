import ICircle from "./ICircle";
import ILine from "./ILine";

export default class CollisionDetector {
  constructor() {}

  // See: https://codereview.stackexchange.com/questions/192477/circle-line-segment-collision
  lineCircleCollision(line: ILine, circle: ICircle) {
    let dist: number;
    const v1x = line.p2.x - line.p1.x;
    const v1y = line.p2.y - line.p1.y;
    const v2x = circle.position.x - line.p1.x;
    const v2y = circle.position.y - line.p1.y;

    // get the unit distance along the line of the closest point to circle center
    const unitDistance = (v2x * v1x + v2y * v1y) / (v1y * v1y + v1x * v1x);

    // if the point is on the line segment get the distance squared
    // from that point to the circle center
    if (unitDistance >= 0 && unitDistance <= 1) {
      dist = (line.p1.x + v1x * unitDistance - circle.position.x) ** 2 + 
            (line.p1.y + v1y * unitDistance - circle.position.y) ** 2;
    } 
    else if (unitDistance < 0) {
        // closest point not on the line segment
        // p1 is closer
        // get dist square to circle
      dist = (line.p1.x - circle.position.x) ** 2 + (line.p1.y - circle.position.y) ** 2;
    }
    else {
        // closest point not on the line segment
        // p2 is closer
        // get dist square to circle
      dist = (line.p2.x - circle.position.x) ** 2 + (line.p2.y - circle.position.y) ** 2;
    }

    return dist <= circle.radius * circle.radius;
  }

  circleCircleCollision(circle1: ICircle, circle2: ICircle) {
    var distX = circle1.position.x - circle2.position.x;
    var distY = circle1.position.y - circle2.position.y;
    var distance = Math.sqrt(distX * distX + distY * distY);

    if (distance <= circle1.radius + circle2.radius) {
      return true;
    }

    return false;
  }
}
