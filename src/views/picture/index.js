import React from 'react';
import { Card,Alert,Spin  } from 'antd';
import { getPicture } from "../../api/index"

class index extends React.Component {
    state = {
        data:[],
        loading:true,
        Zmage:null
    }
    componentWillMount() {
        this.getContent()
    }
    componentDidMount() {
        import('react-zmage').then(res=>{
            this.setState({Zmage:res.default})
        })
    }
    async getContent() {
        let result = await getPicture();
        this.setState({data:result.data,loading:false})
    }
    render() {
        const { Meta } = Card;
        const { data,loading,Zmage } = this.state;
        const html = data.map((item)=>{
            const set = item.link_image.map((s) => {
                return {
                    src:s.image_path,
                    alt:s.image_path
                }
            })
            return (
                <Card
                    key={item.id}
                    hoverable
                    style={{ width: 'calc(33.33% - 10px)',height:'100%',marginRight:'10px',marginTop:'10px' }}
                    cover={<Zmage
                        width={'100%'}
                        height={'100%'}
                        src={item.picture_url}
                        alt="展示序列图片"
                        set={set}
                    />}
                >
                <Meta title={item.picture_title}/>
            </Card>
            )
        })
        return (
            <>
            <Alert
                message="本页面 展示收藏的照片所用"
                description="照片 随便看看 精美的照片都会放在这里"
                type="info"
            />
            <Spin spinning={loading}>
                <div style={{display:'flex',justifyContent:'flex-start',flexWrap:'wrap'}}>
                    {html}
                </div>
            </Spin>
            </>
        )
    }
}

export default index;