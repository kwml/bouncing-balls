import "./index.css";
import PhysicsEngine from "./shared-models/PhysicsEngine";
import CollisionDetector from "./shared-models/CollisionDetector";
import GameModel from "./bouncing-balls/GameModel";

const WORLD_WIDTH = 600;
const WORLD_HEIGHT = 400;
const FPS = 1 / 60;
const RHO = 1.22; // density of fluid (air)
const AG = 9.81; // earth's gravity

const physicsEngine = new PhysicsEngine(FPS, RHO, AG);
const collisionDetector = new CollisionDetector();
const gameModel = new GameModel(WORLD_WIDTH, WORLD_HEIGHT, physicsEngine, collisionDetector);

class ViewModel {
    canvas: HTMLCanvasElement;
    gameLoopInterval;
    
    setup(){
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas.width = WORLD_WIDTH;
        this.canvas.height = WORLD_HEIGHT;
        this.canvas.onmouseup = this.handleCanvasMouseClick;
    }

    startGame(){
        this.gameLoopInterval = setInterval(this.gameLoop, 1000 * FPS);
        this.gameLoop();
    }

    private gameLoop = () => {
        gameModel.update();

        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
        
        for(let i = 0; i < gameModel.balls.length; i++){
            ctx.beginPath();
            ctx.fillStyle = gameModel.balls[i].color;
            ctx.arc(
                gameModel.balls[i].position.x, 
                gameModel.balls[i].position.y,
                gameModel.balls[i].radius,
                0,
                2 * Math.PI, true);
            ctx.fill();
            ctx.closePath();
        }
    }

    private handleCanvasMouseClick = (event: MouseEvent) => {
        const mouseX = event.pageX - this.canvas.offsetLeft;
        const mouseY = event.pageY - this.canvas.offsetTop;

        // calculate random velocity
        const sign = Math.random() < 0.5 ? -1 : 1;
        const newBallVelX = sign * Math.random() * 10;
        const newBallVelY = sign * Math.random() * 10;
        
        gameModel.createBall(mouseX, mouseY, newBallVelX, newBallVelY);
    }

    endGame(){
        gameModel.end();
        clearInterval(this.gameLoopInterval);
    }
}

const viewModel = new ViewModel();

window.onload = () => {
    viewModel.setup();
    viewModel.startGame();
}

window.onunload = () => {
    viewModel.endGame();
}