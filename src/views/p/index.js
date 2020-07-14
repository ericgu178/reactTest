import React from 'react'
import Subscribe from '../widget/subscribe';
import './p.css';

class P extends React.Component {
    state = {
        id:0
    }
    componentDidMount() {
        this.setState({id:this.props.match.params.id})
    }

    render() {
        const id = this.state.id
        return (
            <>
                <div className="main_content">
                    <div className="left">
                        {id}
                    </div>
                    <div className="right">
                        <Subscribe/>
                    </div>
                </div>
            </>
        )
    }
}


export default P;