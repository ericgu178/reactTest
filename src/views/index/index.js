import React from 'react'
import CarouselDom from "./carousel";
import List from './list';
import TopViews from '../widget/top_views';
import TagCloud from '../widget/tag_cloud';
import Subscribe from '../widget/subscribe';

import './index.css';
class index extends React.Component {
    state = {}

    static async fetch(store,params) {
        await List.fetch(store,params)
        // TopViews.fetch(store)
        await CarouselDom.fetch(store)
        // TagCloud.fetch(store)
    }

    render() {
        return (
            <>
                <div className="lunbotu">
                    <CarouselDom />
                </div>
                <div className="main_content">
                    <div className="left">
                        <List />
                    </div>
                    <div className="right">
                        <TopViews />
                        <TagCloud />
                        <Subscribe />
                    </div>
                </div>
            </>
        )
    }
}



export default index;