import ICircle from "../shared-models/ICircle";

export default class BallModel implements ICircle {
  radius: number;
  cd: number;
  mass: number
  area: number 
  color: string;

  position: {
    x: number,
    y: number
  };

  velocity: {
    x: number,
    y: number
  };

  constructor(posX = 0, posY = 0, velX = 10, velY = 10) {
    this.position = {
      x: posX,
      y: posY
    };
    this.velocity = {
      x: velX,
      y: velY
    };

    this.radius = 10; // 1px = 1cm
    this.cd = 0.47;
    this.mass = 0.1; // kg
    this.area = (Math.PI * this.radius * this.radius) / 10000;  // we divide by 10000 to convert from cm to m^2 as 1px = 1cm
    this.color = "green";
  }

  updateVelocity(velX: number, velY: number) {
    this.velocity.x = velX;
    this.velocity.y = velY;
  }

  updatePosition(posX: number, posY: number) {
    this.position.x = posX;
    this.position.y = posY;
  }
}
