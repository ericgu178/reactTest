import React from 'react'
import CarouselDom from "./carousel";
import List from './list';
import TopViews from '../widget/top_views';
import TagCloud from '../widget/tag_cloud';
import Subscribe from '../widget/subscribe';
import Miniprogram from '../widget/miniprogram';
import { pv } from '../../api/index';
import './index.css';

class index extends React.Component {
    
    static async fetch(store,params) {
        await List.fetch(store,params);
        await TopViews.fetch(store);
        await CarouselDom.fetch(store);
        await TagCloud.fetch(store);
    }

    // 访问数据
    async componentDidMount() {
        await pv();
    }

    render() {
        return (
            <>
                <div className="lunbotu"><CarouselDom /></div>
                <div className="main_content" style={{marginTop:'2vh'}}>
                    <div className="left"><List /></div>
                    <div className="right">
                        <TopViews />
                        <TagCloud />
                        <Subscribe />
                        <Miniprogram />
                    </div>
                </div>
            </>
        )
    }
}

export default index;