import React from 'react'

class Canvas extends React.Component{
     processInstructions = () => {
        this.props.instructions.forEach((inst) => {            
            this.processInstruction(inst);            
        }); 

        if(this.penDown)
            this.ctx.stroke(); // draw the last path
    }

    processInstruction = async (inst) => {
        //await new Promise(r => setTimeout(r, 200));
        if(inst.turtle){            
            this.drawTurtle(inst);
            return;
        }

        let adjP = {
            x: this.pos.x + inst.pos.x,
            y: this.pos.y - inst.pos.y
        }
        //inst with penDown means draw a line to here
        
        //if the pen was down and is still down
        if(this.penDown && inst.penDown){
            console.log('line')
            this.ctx.lineTo(adjP.x,adjP.y);
        }

        // if the pen was down and is now up
        if(this.penDown && !inst.penDown){
            console.log('pen raised')
            this.ctx.stroke(); // draw the last path
            this.ctx.moveTo(adjP.x,adjP.y);
        }

        // if the pen was up and is still up
        if(!this.penDown && !inst.penDown){
            console.log('gap')
            this.ctx.moveTo(adjP.x,adjP.y);    
        }

        // if the pen was up, but is now down
        if(!this.penDown && inst.penDown){
            console.log('pen lowered')
            this.ctx.beginPath();
            this.ctx.lineTo(adjP.x,adjP.y);
        }

        this.penDown = inst.penDown;
    }

    drawTurtle = (inst) => {

        let {angle} = inst;

        let adjP = {
            x: this.pos.x + inst.pos.x,
            y: this.pos.y - inst.pos.y
        };

        if(this.penDown)
            this.ctx.stroke();

        console.log(inst);
        this.ctx.moveTo(adjP.x,adjP.y);
        this.ctx.beginPath();
        const turtleRadius = 10;
        
        const p0Delta = {
            x: .5*turtleRadius * Math.cos(angle*Math.PI/180),
            y: .5*turtleRadius * Math.sin(angle*Math.PI/180)
          };

        adjP.x+=p0Delta.x;
        adjP.y-=p0Delta.y;

        angle = angle+140;
        const p1Delta = {
            x: 1.5*turtleRadius * Math.cos(angle*Math.PI/180),
            y: 1.5*turtleRadius * Math.sin(angle*Math.PI/180)
          };

        let p1= {
            x: adjP.x +p1Delta.x,
            y: adjP.y -p1Delta.y
        }

        angle += 40
        const p2Delta = {
            x: .75*turtleRadius * Math.cos(angle*Math.PI/180),
            y: .75*turtleRadius * Math.sin(angle*Math.PI/180)
          };

        let p2= {
            x: adjP.x +p2Delta.x,
            y: adjP.y -p2Delta.y
        }
        
        angle = angle+40
        const p3Delta = {
            x: 1.5*turtleRadius * Math.cos(angle*Math.PI/180),
            y: 1.5*turtleRadius * Math.sin(angle*Math.PI/180)
          };

        let p3= {
            x: adjP.x +p3Delta.x,
            y: adjP.y -p3Delta.y
        }
        
        this.ctx.lineTo(p1.x,p1.y);
        this.ctx.lineTo(p2.x,p2.y);
        this.ctx.lineTo(p3.x,p3.y);
        this.ctx.lineTo(adjP.x,adjP.y);
        this.ctx.closePath();
        if(this.penDown){
            this.ctx.fillStyle = "green";
            this.ctx.fill();
        }            
        else
            this.ctx.stroke();
        //this.penDown=false;
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
        this.penDown=true;
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
