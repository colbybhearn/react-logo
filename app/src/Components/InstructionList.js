import React from 'react'
import Instruction from './Instruction.js'

class InstructionList extends React.Component {

    constructor(props){
        super(props);

    }

    render(){
        console.log(this.props)
        return (
            <div className='instructions'>
                
                {this.props.instructions.map(inst => (
                <Instruction key={inst.id} text={inst.text}/>
                ))}

                
            </div>
        )
    }


}

export default InstructionList;