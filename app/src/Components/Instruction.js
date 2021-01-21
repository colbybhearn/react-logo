import React from 'react'

class Instruction extends React.Component{


    handleChange = (event, argName) => {
        console.log(event, argName)
        this.props.changed(this.props.inst.id, argName, event.target.value);
    }

    render(){
        const args =Object.entries(this.props.inst.args);
        console.log(args);

        return (
            <div className='instruction'>
                {/* <input type='checkbox' /> */}
                
                <span style={{margin: 10+'px'}}>{this.props.inst.command}</span>
                
                
                 {
                 args.map((arg,i) => (
                     <div className='instructionArgs'>
                        <span>{arg[0]}</span>
                        <input key={i} type='number' defaultValue={arg[1]} style={{width: 40 + 'px'}} onChange={(event) => {this.handleChange(event, arg[0])}} />
                    </div>
                ))} 
                <div className='delete'>X</div>
            </div>
        )
    }
}

export default Instruction;