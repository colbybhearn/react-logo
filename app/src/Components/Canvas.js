import React from 'react'

class Canvas extends React.Component{

    constructor(){
        super();        
        this.penDown=true;
    }

    processInstructions = () => {
        this.props.instructions.forEach((inst) => {            
            this.processInstruction(inst);
        });
        if(this.penDown)
            this.ctx.stroke(); // draw the last path
    }

    processInstruction = (inst) => {

        let adjP = {
            x: this.pos.x + inst.pos.x,
            y: this.pos.y - inst.pos.y
        }
        //inst with penDown means draw a line to here
        
        //if the pen was down and is still down
        if(this.penDown && inst.penDown){
            this.ctx.lineTo(adjP.x,adjP.y);
        }

        // if the pen was down and is now up
        if(this.penDown && !inst.penDown){
            this.ctx.stroke(); // draw the last path
            this.ctx.moveTo(adjP.x,adjP.y);
        }

        // if the pen was up and is still up
        if(!this.penDown && !inst.penDown){
            this.ctx.moveTo(adjP.x,adjP.y);    
        }

        // if the pen was up, but is now down
        if(!this.penDown && inst.penDown){
            this.ctx.beginPath();
            this.ctx.lineTo(adjP.x,adjP.y);
        }
    }

    drawTurtle = () => {
        
        this.ctx.moveTo(this.pos.x,this.pos.x);
        this.ctx.beginPath();
        const turtleRadius = 10;

        
        let angle = this.angle-180;
        const p0Delta = {
            x: .5*turtleRadius * Math.cos(angle*Math.PI/180),
            y: .5*turtleRadius * -Math.sin(angle*Math.PI/180)
          };

        this.pos.x+=p0Delta.x;
        this.pos.y+=p0Delta.y;

        angle = this.angle+110;
        const p1Delta = {
            x: 1.5*turtleRadius * Math.cos(angle*Math.PI/180),
            y: 1.5*turtleRadius * -Math.sin(angle*Math.PI/180)
          };

        let p1= {
            x: this.pos.x +p1Delta.x,
            y: this.pos.y +p1Delta.y
        }

        angle = this.angle
        const p2Delta = {
            x: 2*turtleRadius * Math.cos(angle*Math.PI/180),
            y: 2*turtleRadius * -Math.sin(angle*Math.PI/180)
          };

        let p2= {
            x: this.pos.x +p2Delta.x,
            y: this.pos.y +p2Delta.y
        }
        
        angle = this.angle+-110
        const p3Delta = {
            x: 1.5*turtleRadius * Math.cos(angle*Math.PI/180),
            y: 1.5*turtleRadius * -Math.sin(angle*Math.PI/180)
          };

        let p3= {
            x: this.pos.x +p3Delta.x,
            y: this.pos.y +p3Delta.y
        }
        
        this.ctx.lineTo(p1.x,p1.y);
        this.ctx.lineTo(p2.x,p2.y);
        this.ctx.lineTo(p3.x,p3.y);
        this.ctx.lineTo(this.pos.x,this.pos.y);
        this.ctx.closePath();
        this.ctx.stroke();
    }    

    componentDidMount = () =>{        
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.init();
    }

    render(){
        return (
            <div className='canvasContainer'>
                <canvas id='canvas' width='800' height='800'></canvas>
            </div>
        )
    }

    clear = () => {
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
        this.ctx.beginPath();
    }

    init = () => {
        this.clear();    
        this.pos={
            x: this.ctx.canvas.getBoundingClientRect().width/2,
            y: this.ctx.canvas.getBoundingClientRect().height/2
        }
        this.ctx.moveTo(this.pos.x, this.pos.y);        
        this.ctx.strokeStyle = "#009900";
        this.instructions = this.props.instructions;
        this.processInstructions();
    }

    componentDidUpdate(){
        this.init();   
    }
}

export default Canvas;
