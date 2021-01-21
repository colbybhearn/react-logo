import React from 'react'

class Canvas extends React.Component{

    constructor(){
        super();        
        this.data={
            pos: {
                x:0,
                y:0
            },
            angle:90,
            penDown: true,            
        }
    }

    processInstructions = () => {

        
        this.props.instructions.forEach((inst) => {
            console.log('processing instruction');
            this.processInstruction(inst);
        });
        if(this.data.penDown)
            this.data.ctx.stroke();
        this.drawTurtle();
    }

    drawTurtle = () => {
        
        this.data.ctx.moveTo(this.data.pos.x,this.data.pos.x);
        this.data.ctx.beginPath();
        const turtleRadius = 10;

        
        let angle = this.data.angle-180;
        const p0Delta = {
            x: .5*turtleRadius * Math.cos(angle*Math.PI/180),
            y: .5*turtleRadius * -Math.sin(angle*Math.PI/180)
          };

        this.data.pos.x+=p0Delta.x;
        this.data.pos.y+=p0Delta.y;



        angle = this.data.angle+110;
        const p1Delta = {
            x: 1.5*turtleRadius * Math.cos(angle*Math.PI/180),
            y: 1.5*turtleRadius * -Math.sin(angle*Math.PI/180)
          };

        let p1= {
            x: this.data.pos.x +p1Delta.x,
            y: this.data.pos.y +p1Delta.y
        }

        angle = this.data.angle
        const p2Delta = {
            x: 2*turtleRadius * Math.cos(angle*Math.PI/180),
            y: 2*turtleRadius * -Math.sin(angle*Math.PI/180)
          };

        let p2= {
            x: this.data.pos.x +p2Delta.x,
            y: this.data.pos.y +p2Delta.y
        }

        
        angle = this.data.angle+-110
        const p3Delta = {
            x: 1.5*turtleRadius * Math.cos(angle*Math.PI/180),
            y: 1.5*turtleRadius * -Math.sin(angle*Math.PI/180)
          };

        let p3= {
            x: this.data.pos.x +p3Delta.x,
            y: this.data.pos.y +p3Delta.y
        }



        
        this.data.ctx.lineTo(p1.x,p1.y);
        this.data.ctx.lineTo(p2.x,p2.y);
        this.data.ctx.lineTo(p3.x,p3.y);
        this.data.ctx.lineTo(this.data.pos.x,this.data.pos.y);
        this.data.ctx.closePath();
        this.data.ctx.stroke();
    }
    
    processInstruction = (inst) =>{
        //console.log('processInstruction: ', inst);
        inst.do(this.data);
    }

    componentDidMount = () =>{        
        this.canvas = document.getElementById("canvas");
        this.data.ctx = this.canvas.getContext("2d");
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
        this.data.ctx.clearRect(0,0,this.data.ctx.canvas.width,this.data.ctx.canvas.height);
        this.data.ctx.beginPath();
    }

    init = () => {
        this.clear();
        this.data.pos={
            x: this.data.ctx.canvas.getBoundingClientRect().width/2,
            y: this.data.ctx.canvas.getBoundingClientRect().height/2
        }
        this.data.penDown = true;
        this.data.angle= 90;
        this.data.ctx.moveTo(this.data.pos.x, this.data.pos.y);
        this.data.ctx.strokeStyle = "#FF0000";
        this.processInstructions();
    }

    componentDidUpdate(){
        this.init();   
    }
}

export default Canvas;
