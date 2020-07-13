import React from 'react';
import { Carousel } from 'antd';

class carouselDom extends React.Component {

    render() {
        const carousels = [
            'https://ericgu178.com//bing/2020/20200711000002.jpg',
            'https://ericgu178.com//bing/2020/20200710000002.jpg',
            'https://ericgu178.com//bing/2020/20200703000001.jpg',
            'https://ericgu178.com//bing/2020/20200708000002.jpg',
        ].map(item=>{
            console.log(item)
            return (
                <div style={{width:'100%',height:'100%'}}>
                    <img style={{width:'100%',height:'30vh',objectFit:'cover'}} src={item} alt={item} />
                </div>
            )
        })

        console.log(carousels)

        return (
            <>
                <Carousel autoplay dotPosition="bottom">
                    {carousels}
                </Carousel>
            </>
        )
    }
}


export default carouselDom;