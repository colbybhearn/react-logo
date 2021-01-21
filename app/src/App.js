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
    if(args.length !== commandTemplate.args.length)
      return null;

    let argsObj = {};
    // put the args in an object by name
    for(let a = 0;a<commandTemplate.args.length;a++){
      const argName = commandTemplate.args[a].name;
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
    let args=this.parseArgs(commandTemplate, rawArgs);

    return {
      id: this.state.instructions.length,
      text: inst,
      command,
      args,
      process: commandTemplate.process
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
        process: function(ctx){
          console.log(this, ctx);
        }
      }
    ]
  }

}


export default App;
