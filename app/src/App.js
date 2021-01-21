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
    }
    console.log(this.state.instructions);
  }

  addInstruction = (i) =>{

    const {instructions} = this.state;
    let newItem = {
      id: instructions.length,
      text: i
    }
    this.setState({
      
      instructions: instructions.concat(        newItem      )
    });
    console.log(this.state.instructions);
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
          <Canvas />

        </div>
        
      </div>
    );
  }
}


export default App;
