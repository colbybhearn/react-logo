import React from 'react'

class Canvas extends React.Component{

    processInstructions = (ctx) => {

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(300, 150);
    ctx.stroke();

        this.props.instructions.forEach((inst) => {
            console.log('processing instruction');
            this.processInstruction(inst, ctx);
        });
    }

    
    processInstruction = (inst, ctx) =>{
        console.log('processInstruction: ',inst);
        inst.process(ctx);
        switch(inst.command){
            case 'GO':
                break;
        }
    }

    componentDidMount = () =>{
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(0, 0, 150, 75);
        this.processInstructions(ctx);
    }

    render(){
        return (
            <div className='canvasContainer'>
                
                <canvas id='canvas'>

                </canvas>
            </div>
        )
    }
}

export default Canvas;