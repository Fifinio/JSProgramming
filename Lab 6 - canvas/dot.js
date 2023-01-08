class Dot {
    xPos = 0;
    yPos = 0;
    vx = 0;
    vy = 0;
    mass = 10;

    constructor(xPosition, yPosition, velocityX, velocityY, mass) {
        this.xPos = xPosition;
        this.yPos = yPosition;
        this.vx = velocityX;
        this.vy = velocityY;
        this.mass = mass;
    }

    update(){
        this.xPos += this.vx;
        this.yPos += this.vy;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.mass, 0, Math.PI * 2);
        ctx.fillStyle = Math.floor(Math.random()*16777215).toString(16);
        ctx.fill();
        ctx.closePath();
    }
}