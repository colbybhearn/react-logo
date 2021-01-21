import React from 'react'

class Input extends React.Component{
    
    constructor(){
        super();
        this.state = {
            text: ''
        }
    }

    addInstruction = () =>{
        this.props.addInstruction(this.state.text);
        this.state.text='';
    }
    
    
    handleChange = (event) => {
        const {name, value} = event.target
      
        this.setState({
          [name]: value,
        })
      }

    render(){
        return (
            <div>
                <input type='text' placeholder='Next Instruction' 
                onChange={this.handleChange} value={this.state.text} name='text'/>
                <button onClick={this.addInstruction}>Add</button>
                
            </div>
        )
    }
}

export default Input;