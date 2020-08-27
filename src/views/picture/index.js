import React from 'react';
import Zmage from 'react-zmage';
import { Card } from 'antd';

class index extends React.Component {
    state = {
        data:[]
    }
    componentWillMount() {

    }
    async getContent() {
        
    }
    render() {
        const { Meta } = Card;
        return (
            <>
            <Card
                hoverable
                style={{ width: '25%' }}
                cover={<Zmage
                    width={300}
                    height={300}
                    src="https://zmage.caldis.me/imgSet/childsDream/3.jpg"
                    alt="展示序列图片"
                    set={[{
                        src: "https://zmage.caldis.me/imgSet/childsDream/3.jpg",
                        alt: "First image description"
                    },{
                        src: "https://zmage.caldis.me/imgSet/childsDream/4.jpg",
                        alt: "Second image description"
                    }]}
                />}
            >
                <Meta title="运动" description="www.instagram.com" />
            </Card>
            </>
        )
    }
}

export default index;