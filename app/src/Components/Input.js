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

    processKey = event => {
        if(event.code === 'Enter')
            this.addInstruction();
    }

    render(){
        return (
            <div className='instInput'>
                <input className="instInput" type='text' placeholder='Next Instruction' 
                onChange={this.handleChange} onKeyDown={this.processKey} value={this.state.text} name='text'/>
                {/* <button onClick={this.addInstruction} >Add</button> */}
                
            </div>
        )
    }
}

export default Input;