import React from 'react'
// import logo from './logo.svg';
import './App.css';
import InstructionList from './Components/InstructionList.js'
import Canvas from './Components/Canvas.js'
import Input from './Components/Input.js'
class App extends React.Component{

  constructor(){
    super();
    this.state = {
      instructions: [],
      commandTemplates: this.getCommandTemplates(),
      showTurtle: true
    }
    this.initData();
    
  }

  initData = () => {
    this.data={
      pos: {
          x:0,
          y:0
      },
      angle:90,
      penDown: true,                        
    }
    return this.data;
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
    if(parts.length===0)
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
      getL2: commandTemplate.getL2,
      getL3: commandTemplate.getL3,
      copy: commandTemplate.copy,
      setArg: commandTemplate.setArg
      //do: commandTemplate.do
    }
  }

  formatInstruction = inst =>{
    return inst.toUpperCase();
  }

  getL2Instructions = () => {
    // level 2 unwraps REP commands which repeat previous P commands X many times.
    let l2s = [];
    this.state.instructions.forEach((inst) => {        
        l2s.push(...this.getL2Instruction(inst));
    });    
    return l2s;
  }

  getL2Instruction = (inst) =>{
    //console.log('processInstruction: ', inst);
    if(!inst.getL2)
      return [inst];
    return inst.getL2(this.state.instructions, inst);
  }

  getL3Instructions = () => {
    let l2s = this.getL2Instructions();
    let l3s = [];
    this.initData();

    l2s.forEach((l2) => {        
      let l3 = this.getL3Instruction(l2);
      if(l3)
        l3s.push(l3);
    });    
    
    if(this.state.showTurtle)
      if(l3s.length>0)
      l3s.push({
        pos: l3s[l3s.length-1].pos,
        turtle: true,
        angle: this.data.angle        
      })

    return l3s;
  }

    getL3Instruction = (inst) =>{
      return inst.getL3(this.data);
  }

  componentDidMount(){

  }

  clearInstructions = () => {
    this.setState({
      instructions: []
    })
  }

  loadSampleDisc = () =>{
    this.clearInstructions();

    setTimeout(()=>{
      this.addInstruction("FD 200")
      this.addInstruction("RT")
      this.addInstruction("FD 200")
      this.addInstruction("RT")
      this.addInstruction("FD 200")
      this.addInstruction("RT")
      this.addInstruction("FD 200")
      this.addInstruction("RT 5")
      this.addInstruction("REP 8 91")
    }, 100)
  }

  loadSampleCorner = () => {
    this.clearInstructions();
    
    setTimeout(()=>{
      this.addInstruction("FD 200")
      this.addInstruction("RT")
      this.addInstruction("FD 200")
    }, 100)
  }

  loadSampleSquares = () => {
    this.clearInstructions();
    
    setTimeout(()=>{
      this.runInstructionSequence(
        [
          "fd 20",
          "rt",
          "penup",
          "pendown",
          "rep 4 3",
          "fd 40",
          "rt",
          "penup",
          "pendown",
          "rep 4 3",
          "fd 60",
          "rt",
          "penup",
          "pendown",
          "rep 4 3",
          "fd 80",
          "rt",
          "penup",
          "pendown",
          "rep 4 3"

        ]
      )

      
    }, 100)
  }

  runInstructionSequence = (arr) => {
    arr.forEach((a) => {
      this.addInstruction(a);
    })
  }


  getInstructionById = (id) => {
    return this.state.instructions[id];
  }
  updateInst = (id, name, val) => {
    
    let tempInstructions = Array.from(this.state.instructions);
    //tempInstructions[id].args[name]=Number(val);
    tempInstructions[id].setArg(name, val);

    console.log(tempInstructions)
    this.setState({
      instructions: tempInstructions
    });
    
  }

  render() {
    let l3Instructions = this.getL3Instructions();
    console.log(l3Instructions);

    return (
      <div className="App">
        
        <div className='left'>
        

          <header>Commands</header>
          
          <table className='help'>
            <tbody>
            <tr>
              <td colSpan='2'>&lt;r&gt; = required argument</td>
            </tr>
            <tr>
              <td colSpan='2'>[o] = optional argument</td>
            </tr>            
            <tr>
              <td>FD &lt;d&gt;</td>
              <td>Forward d units</td>
            </tr>
            <tr>
              <td>LT [d=90]</td>
              <td>Left Turn. Default d is 90°</td>
            </tr>
            <tr>
              <td>RT [d=90]</td>
              <td>Right Turn. Default d is 90°</td>
            </tr>
            <tr>
              <td>REP &lt;c&gt; &lt;t&gt;</td>
              <td>Repeat last c commands t times</td>
            </tr>
            </tbody>
          </table>
          <br/>

          <header>Presets</header>
          <button onClick={this.clearInstructions}>clear</button>          
          <button onClick={this.loadSampleCorner}>corner</button>
          <button onClick={this.loadSampleSquares}>squares</button>
          <button onClick={this.loadSampleDisc}>disc</button>
          <br/><br/>

          <header>Instructions</header>
          <Input addInstruction={this.addInstruction}/>
          <InstructionList instructions={this.state.instructions} instChange={this.updateInst}/>
          <input type='checkbox'
          checked={this.state.showTurtle}
          onChange={this.handleTurtleToggle}
          />Show Turtle
        </div>

        <div className='right'>
          <Canvas instructions={l3Instructions} commandTemplates={this.commandTemplates} turtle={this.state.showTurtle}/>
        </div>
        
      </div>
    );
  }

  handleTurtleToggle = (event) => {
    this.setState(
      {
        showTurtle: event.target.checked
      }
    )
  }

  getCommandTemplates = () => {
    return [
      {
        command: "FD",
        args: [
          {
            name:"dist"
          }
        ],        
        getL3: function(data){
          // process dist, given angle
          const delta = {
            x: this.args.dist * Math.cos(data.angle*Math.PI/180),
            y: this.args.dist * Math.sin(data.angle*Math.PI/180)
          }
          
          data.pos.x = data.pos.x + delta.x;
          data.pos.y = data.pos.y + delta.y;
          return {
            pos: {
              x: data.pos.x,
              y: data.pos.y
            },
            penDown: data.penDown
          }
        },
        setArg: function(n,v){
          this.args[n] = v;
          return `${this.command} ${this.args.dist}`;
        },
        copy: function(){
          return {
            command:"FD",
            args:this.args,
            getL3: this.getL3,
            setArg: this.setArg
          }
        }
      },
      {
        command: "PENUP",
        args: [],        
        getL3: function(data){          
          data.penDown=false;
          return {
            pos: {
              x: data.pos.x,
              y: data.pos.y
            },
            penDown: data.penDown
          }
        },
        setArg: function(n,v){          
          return `${this.command}`;
        },
        copy: function(){
          return {
            command:this.command,
            args:this.args,
            getL3: this.getL3,
            setArg: this.setArg
          }
        }
      },
      {
        command: "PENDOWN",
        args: [],        
        getL3: function(data){          
          data.penDown=true;
          return {
            pos: {
              x: data.pos.x,
              y: data.pos.y
            },
            penDown: data.penDown
          }
        },
        setArg: function(n,v){          
          return `${this.command}`;
        },
        copy: function(){
          return {
            command:this.command,
            args:this.args,
            getL3: this.getL3,
            setArg: this.setArg
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
        getL3: function(data){          
          data.angle += Number(this.args.deg);
        },
        setArg: function(n,v){
          this.args[n] = v;
          return `${this.command} ${v}`;
        },copy: function(){
          return {
            command: this.command,
            args: this.args,
            getL3: this.getL3,
            setArg: this.setArg
          }
        }
      },
      {
        command: "LT",
        args: [
          {
            name:"deg"
          }
        ],
        getL3: function(data){          
          data.angle += Number(this.args.deg);
        },
        parseArgs: (t, raw) => {
          let args = this.parseArgs(t, raw);
          if(typeof args.deg === 'undefined')
            args.deg = 90;   
          return args;
       },
       setArg: function(n,v){
        this.args[n] = v;
        return `${this.command} ${v}`;
      },
      copy: function(){
        return {
          command: this.command,
          args: this.args,
          getL3: this.getL3,
          setArg: this.setArg
        }
       },
      },
      {
        command: "RT",
        args: [
          {
            name:"deg"
          }
        ],
        getL3: function(data){          
          data.angle -= Number(this.args.deg);
        },
        parseArgs: (t,raw) => {
          let args = this.parseArgs(t, raw);          
          if(typeof args.deg === 'undefined')
            args.deg = 90;   
          return args;
        },
        setArg: function(n,v){
          this.args[n] = v;
          return `${this.command} ${v}`;
        },
        copy: function(){
          return {
            command: this.command,
            args: this.args,
            getL3: this.getL3,
            setArg: this.setArg
          }
        }
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
        // there is no level 3 because level 2 unwraps the REP commands from level 1        
        getL2: function(all, inst){
          let insts = [];
          let id = inst.id;
          for(let c=0;c<Number(this.args.count);c++)
            for(let p=Number(this.args.prev);p>0;p--)
            {
              let indexToCopy = id-p;
              if(indexToCopy < 0 && indexToCopy > all.length-1)
                continue;
              let copy = all[indexToCopy].copy();
              copy.id = Number(all.length) + insts.length;
              console.log(copy)
              insts.push(copy);
            }
          return insts;
        },
        setArg: function(n,v){
          this.args[n] = v;
          return `${this.command} ${this.args.prev} ${this.args.count}`;
        },
        copy: function(){
          return {
            command: this.command,
            args: this.args,
            getL2: this.getL2,
            setArg: this.setArg
          }
        }
      }
    ]
  }
}


export default App;
