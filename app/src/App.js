import React from 'react'
import logo from './logo.svg';
import './App.css';
import InstructionList from './Components/InstructionList.js'
import Canvas from './Components/Canvas.js'
import Input from './Components/Input.js'
class App extends React.Component{

  constructor(){
    super();
    this.state = {
      instructions: [],
      commandTemplates: this.getCommandTemplates()
    }
  }

  addInstruction = (inst) =>{

    const {instructions} = this.state;
    inst = this.formatInstruction(inst);
    let newItem = this.parseInstructionText(inst);
    console.log(newItem);
    if(!newItem)
      return;
    this.setState({
      instructions: instructions.concat(        newItem      )
    });
  }


  templateForComand = (command) => {
    let commandTemplate
    this.state.commandTemplates.forEach((template) =>{
      if(template.command === command)
        commandTemplate = template;
    });
    return commandTemplate;
  }

  parseArgs = (commandTemplate, args) =>{
    let argsObj = {};
    if(args.length !== commandTemplate.args.length)
      return argsObj;
    
    // put the args in an object by name
    for(let a = 0;a<commandTemplate.args.length;a++){
      const argName = commandTemplate.args[a].name;
      if(args.length>a)      
        argsObj[argName] = args[a];
    }

    return argsObj;
  }

  parseInstructionText = inst => {
    let parts = inst.split(' ');
    parts = parts.filter((p) => {return p!==''});
    if(parts.length==0)
      return;
    let command = parts[0];
    // find the command in the template
    const commandTemplate = this.templateForComand(command);
    if(!commandTemplate)
      return;

    let rawArgs = parts.slice(1); // everything after the command
    let args;
    if(commandTemplate.parseArgs)
      args = commandTemplate.parseArgs(commandTemplate, rawArgs);
    else
      args =this.parseArgs(commandTemplate, rawArgs);

    return {
      id: this.state.instructions.length,
      text: inst,
      command,
      args,
      do: commandTemplate.do
    }
  }

  formatInstruction = inst =>{
    return inst.toUpperCase();
  }

  render() {
    return (
      <div className="App">
        
        <div className='left'>
          <header>Instructions</header>
          <Input addInstruction={this.addInstruction}/>
          <InstructionList instructions={this.state.instructions}/>
        </div>

        <div className='right'>
          <Canvas instructions={this.state.instructions} commandTemplates={this.commandTemplates} />
        </div>
        
      </div>
    );
  }

  getCommandTemplates = () => {
    return [
      {
        command: "GO",
        args: [
          {
            name:"dist"
          }
        ],        
        do: function(state){
          console.log(state, this.args);
          // process dist, given angle
          const delta = {
            x: this.args.dist * Math.cos(state.angle*Math.PI/180),
            y: this.args.dist * -Math.sin(state.angle*Math.PI/180)
          }
          state.pos.x= state.pos.x +delta.x;
          state.pos.y= state.pos.y +delta.y;

          state.ctx.lineTo(state.pos.x,state.pos.y);
          
          if(state.penDown){
            //state.ctx.stroke();
          }
        }
      },
      {
        command: "ROT",
        args: [
          {
            name:"deg"
          }
        ],
        do: function(state){          
          state.angle += Number(this.args.deg);
        }
      },
      {
        command: "TL",
        args: [
          {
            name:"deg"
          }
        ],
        do: function(state){          
          state.angle += Number(this.args.deg);
        },
        parseArgs: (t, raw) => {
          let args = this.parseArgs(t, raw);
          if(typeof args.deg === 'undefined')
            args.deg = 90;   
          return args;      
       },
      },
      {
        command: "TR",
        args: [
          {
            name:"deg"
          }
        ],
        do: function(state){          
          state.angle -= Number(this.args.deg);
        },
        parseArgs: (t,raw) => {
          let args = this.parseArgs(t, raw);          
          if(typeof args.deg === 'undefined')
            args.deg = 90;   
          return args;      
       },
      },
      {
        command: "REP",
        args: [
          {            
            name: "prev"
          },
          {            
            name: "count"
          }
        ],
        do: function(state){

        }
      }

    ]
  }

}


export default App;
