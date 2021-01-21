import React from 'react'
import Instruction from './Instruction.js'

class InstructionList extends React.Component {

    constructor(props){
        super(props);

    }

    render(){
        
        return (
            <div className='instructions'>
                
                {this.props.instructions.map(inst => (
                    <Instruction key={inst.id} inst={inst}/>
                ))}

                
            </div>
        )
    }


}

export default InstructionList;