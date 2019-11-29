// See: https://burakkanber.com/blog/modeling-physics-javascript-gravity-and-drag/
export default class PhysicsEngine {
  rho: number;
  ag: number;
  fps: number;

  constructor(fps: number, rho: number, ag: number) {
    this.fps = fps;
    this.rho = rho;
    this.ag = ag;
  }

  calculateVelocityX(velX: number, cd: number, area: number, mass: number) {
    let fx = 0;
    let ax = 0;
    if (velX != 0) {
      fx = -0.5 * cd * area * this.rho * velX * velX * (velX / Math.abs(velX));
      ax = fx / mass;
    }

    //Calculating the accleration of the ball
    //F = ma or a = F/m
    ax = fx / mass;

    const nextVelX = velX + ax * this.fps;
    return nextVelX;
  }

  calculateVelocityY(velY: number, cd: number, area: number, mass: number) {
    let fy = 0;
    let ay = 0;
    if (velY != 0) {
      fy = -0.5 * cd * area * this.rho * velY * velY * (velY / Math.abs(velY));
      ay = this.ag + fy / mass;
    }

    //Calculating the accleration of the ball
    //F = ma or a = F/m
    ay = this.ag + fy / mass;

    const nextVelY = velY + ay * this.fps;
    return nextVelY;
  }

  calculatePositionX(posX: number, velX: number) {
    const nextPosX = posX + velX * this.fps * 100;
    return nextPosX;
  }

  calculatePositionY(posY: number, velY: number) {
    const nextPosY = posY + velY * this.fps * 100;
    return nextPosY;
  }
}
