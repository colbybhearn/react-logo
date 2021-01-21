import React from 'react'
import Instruction from './Instruction.js'

class InstructionList extends React.Component {


    instChange = (id, name, val) => {
        this.props.instChange(id, name, val);
    }

    render(){
        
        return (
            <div className='instructions'>
                
                {this.props.instructions.map(inst => (
                    <Instruction key={inst.id} inst={inst} changed={this.instChange} />
                ))}

                
            </div>
        )
    }


}

export default InstructionList;