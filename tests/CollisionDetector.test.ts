import CollisionDetector from "../src/shared-models/CollisionDetector";
import Line from "../src/shared-models/Line";
import Point from "../src/shared-models/Point";
import Circle from "../src/shared-models/Circle";

describe("Collision Detector", () => {
  const collisionDetector = new CollisionDetector();

  it("Detects an intersecting collision between a line and a circle", () => {
    const line = new Line(new Point(0, 0), new Point(0, 20));
    const circle = new Circle(5, 5, 10);

    expect(collisionDetector.lineCircleCollision(line, circle)).toBe(true);
  });

  it("Detects a touching collision between a line and a circle", () => {
    const line = new Line(new Point(0, 0), new Point(0, 20));
    const circle = new Circle(5, 5, 5);

    expect(collisionDetector.lineCircleCollision(line, circle)).toBe(true);
  });

  it("Detects a no-collision between a line and a circle", () => {
    const line = new Line(new Point(0, 0), new Point(0, 20));
    const circle = new Circle(5, 6, 10);

    expect(collisionDetector.lineCircleCollision(line, circle)).toBe(false);
  });

  it("Detects an intersecting collision between a circle and a circle", () => {
    const circle1 = new Circle(5, 5, 10);
    const circle2 = new Circle(5, 5, 15);

    expect(collisionDetector.circleCircleCollision(circle1, circle2)).toBe(true);
  });

  it("Detects a touching collision between a circle and a circle", () => {
    const circle1 = new Circle(5, 5, 10);
    const circle2 = new Circle(5, 5, 20);

    expect(collisionDetector.circleCircleCollision(circle1, circle2)).toBe(true);
  });

  it("Detects a no-collision between a circle and a circle", () => {
    const circle1 = new Circle(5, 5, 10);
    const circle2 = new Circle(5, 5, 21);

    expect(collisionDetector.circleCircleCollision(circle1, circle2)).toBe(false);
  });
});
