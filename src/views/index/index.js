import React from 'react'
import CarouselDom from "./carousel";
import List from './list';
import './index.css';
class index extends React.Component {
    state = {
        message:'123'
    }
    render() {

        // const message = this.state.message
        return (
            <>
                <div className="lunbotu">
                    <CarouselDom/>
                </div>
                <div className="main_content">
                    <div className="left">
                        <List/>
                    </div>
                    <div className="right">

                    </div>
                </div>
            </>
        )
    }
}


export default index