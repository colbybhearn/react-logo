import React from 'react'

class Instruction extends React.Component{

    render(){
        return (
            <div className='instruction'>
                <input type='checkbox' />
                
                {this.props.text}
                <div className='delete'>X</div>
            </div>
        )
    }
}

export default Instruction;