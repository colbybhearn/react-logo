import React from 'react'

class Instruction extends React.Component{

    render(){

        const args =Object.entries(this.props.inst.args);
        console.log(args);
        return (
            <div className='instruction'>
                {/* <input type='checkbox' /> */}
                
                {this.props.inst.command}
                
                 {args.map((arg,i) => (
                    <input key={i} type='number' value={this.props.inst.args[i]} style={{width: 40 + 'px'}} />
                ))} 
                <div className='delete'>X</div>
            </div>
        )
    }
}

export default Instruction;