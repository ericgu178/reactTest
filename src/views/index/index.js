import React from 'react'
import {getContent} from "../../api/index"

class index extends React.Component {
    state = {
        message:'123'
    }
    componentDidMount() {
        this.getContent()
    }

    async getContent() {
       let data = await getContent()
       console.log(data)
    }
    render() {
        const message = this.state.message
        return (
            <div> 
                <h1>{message} 我曹娘吗啊啊 啊 啊啊啊啊啊啊啊啊</h1>
            </div>
        )
    }
}


export default index