import BallModel from "./BallModel";
import WallModel from "./WallModel";
import PhysicsEngine from "../shared-models/PhysicsEngine";
import CollisionDetector from "../shared-models/CollisionDetector";
import Point from "../shared-models/Point";

export default class GameModel {
  worldWidth: number;
  worldHeight: number;

  leftWall: WallModel;
  topWall: WallModel;
  rightWall: WallModel;
  bottomWall: WallModel;
  
  balls: Array<BallModel>;

  physicsEngine: PhysicsEngine;
  collisionDetector: CollisionDetector;
  
  constructor(worldWidth: number, worldHeight: number, physicsEngine: PhysicsEngine, collisionDetector: CollisionDetector)
  {
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;

    this.balls = new Array<BallModel>();
    this.leftWall = new WallModel(new Point(0, 0), new Point(0, this.worldHeight), -0.5);
    this.topWall = new WallModel(new Point(0, 0), new Point(this.worldWidth, 0), -0.5);
    this.rightWall = new WallModel(new Point(this.worldWidth, 0), new Point(this.worldWidth, this.worldHeight), -0.5);
    this.bottomWall = new WallModel(new Point(0, this.worldHeight), new Point(this.worldWidth, this.worldHeight), -0.5);

    this.physicsEngine = physicsEngine;
    this.collisionDetector = collisionDetector;
  }

  createBall(posX: number, posY: number, velX: number, velY: number) {
    const ball = new BallModel(posX, posY, velX, velY);
    this.balls.push(ball);
  }

  update = () => {
    for (let i = 0; i < this.balls.length; i++) {
      let ball = this.balls[i];
      
      let ballVelX = this.physicsEngine.calculateVelocityX(ball.velocity.x, ball.cd, ball.area, ball.mass);
      let ballVelY = this.physicsEngine.calculateVelocityY(ball.velocity.y, ball.cd, ball.area, ball.mass);

      let ballPosX = this.physicsEngine.calculatePositionX(ball.position.x, ball.velocity.x);
      let ballPosY = this.physicsEngine.calculatePositionX(ball.position.y, ball.velocity.y);

      ball.updateVelocity(ballVelX, ballVelY);
      ball.updatePosition(ballPosX, ballPosY);

      for (let j = 0; j < this.balls.length; j++) {
        let ball2 = this.balls[j];
        
        // Check to see if it's another ball, if so, proceed to check whether a collison has occurred
        if (ball.position.x != ball2.position.x && ball.position.y != ball2.position.y) {
          const hasCollidedWithBall = this.collisionDetector.circleCircleCollision(ball, ball2);
          if (hasCollidedWithBall) {
            // see: http://ericleong.me/research/circle-circle/#dynamic-circle-circle-collision
            const distX = ball.position.x - ball2.position.x;
            const distY = ball.position.y - ball2.position.y;
            const d = Math.sqrt(distX * distX + distY * distY);
        
            const ny = (ball2.position.y - ball.position.y) / d;
            const nx = (ball2.position.x - ball.position.x) / d;
            const p =
              (2 * (ball.velocity.x * nx + ball.velocity.y * ny - ball2.velocity.x * nx - ball2.velocity.y * ny)) /
              (ball.mass + ball2.mass);

            const colPointX = (ball.position.x * ball2.radius + ball2.position.x * ball.radius) / 
                              (ball.radius + ball2.radius);
            const colPointY = (ball.position.y * ball2.radius + ball2.position.y * ball.radius) /
                              (ball.radius + ball2.radius);

            ballVelX = ball.velocity.x - p * ball.mass * nx;
            ballVelY = ball.velocity.y - p * ball.mass * ny;
            ballPosX = colPointX + (ball.radius * (ball.position.x - ball2.position.x)) / d;
            ballPosY = colPointY + (ball.radius * (ball.position.y - ball2.position.y)) / d;
            
            const ball2VelX = ball2.velocity.x + p * ball2.mass * nx;
            const ball2VelY = ball2.velocity.y + p * ball2.mass * ny;
            const ball2PosX = colPointX + (ball2.radius * (ball2.position.x - ball.position.x)) / d;
            const ball2PosY = colPointY + (ball2.radius * (ball2.position.y - ball.position.y)) / d;

            ball.updateVelocity(ballVelX, ballVelY);
            ball.updatePosition(ballPosX, ballPosY);

            ball2.updateVelocity(ball2VelX, ball2VelY);
            ball2.updatePosition(ball2PosX, ball2PosY);
          }
        }
      }

      let leftWallCollision = this.collisionDetector.lineCircleCollision(this.leftWall, ball);
      if (leftWallCollision) {
        // Reverse direction, apply restitution and correct possition
        ball.updateVelocity(ball.velocity.x * this.leftWall.e, ball.velocity.y);
        ball.updatePosition(ball.radius, ball.position.y);
      }

      let topWallCollision = this.collisionDetector.lineCircleCollision(this.topWall, ball);
      if (topWallCollision) {
        // Reverse direction, apply restitution and correct possition
        ball.updateVelocity(ball.velocity.x, ball.velocity.y * this.topWall.e);
        ball.updatePosition(ball.position.x, ball.radius);
      }

      let rightWallCollision = this.collisionDetector.lineCircleCollision(this.rightWall, ball);
      if (rightWallCollision) {
        // Reverse direction, apply restitution and correct possition
        ball.updateVelocity(ball.velocity.x * this.rightWall.e, ball.velocity.y);
        ball.updatePosition(this.worldWidth - ball.radius, ball.position.y);
      }

      let bottomWallCollision = this.collisionDetector.lineCircleCollision(this.bottomWall, ball);
      if (bottomWallCollision) {
        // Reverse direction, apply restitution and correct possition
        ball.updateVelocity(ball.velocity.x, ball.velocity.y * this.bottomWall.e);
        ball.updatePosition(ball.position.x, this.worldHeight - ball.radius);
      }
    }
  };

  end() {
    this.balls = new Array<BallModel>();
  }
}
