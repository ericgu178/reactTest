import React from 'react'


class a1 extends React.Component {
    state = {
        message:'321'
    }
    render() {
        const message = this.state.message
        return (
            <div> 
                <h1>{message}</h1>
            </div>
        )
    }
}


export default a1