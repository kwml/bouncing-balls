import BallModel from "../src/bouncing-balls/BallModel";

describe("Ball", () => {
  const ball = new BallModel(0, 0);

  it("Updates the ball position", () => {
    const posX = 5;
    const posY = 5;

    ball.updatePosition(posX, posY);

    expect(ball.position.x).toBe(posX);
    expect(ball.position.y).toBe(posY);
  });

  it("Updates the ball velocity", () => {
    const velX = 5;
    const velY = 5;

    ball.updateVelocity(velX, velY);

    expect(ball.velocity.x).toBe(velX);
    expect(ball.velocity.y).toBe(velY);
  });
});
