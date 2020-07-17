import React from 'react';
import { Carousel, Typography } from 'antd';
import { getBanner } from "../../api/index";
import { withRouter } from 'react-router-dom';

const { Title } = Typography;

class carouselDom extends React.Component {
    state = {
        data: []
    }
    async getContent() {
        let result = await getBanner();
        this.setState({
            data: result.data
        })
    }
    componentWillMount() {
        this.getContent()
    }
    onClick(item) {
        return this.props.history.push(`/p/${item.article_id}`)
    }
    render() {
        const list = this.state.data;
        const carousels = list.map(item => {
            return (
                <div style={{ width: '100%', position: 'relative', height: '100%', cursor: 'pointer' }} key={item}>
                    <img onClick={this.onClick.bind(this, item)} style={{ width: '100%', height: '50vh', objectFit: 'cover', cursor: 'pointer' }} src={window._.baseUrl + item.material_id.filepath} alt={item} />
                    <div style={style.div}>
                        <Title level={2} style={{ color: '#fff', height: '100%', display: 'flex', alignItems: 'center' }}>
                            {item.banner_title.substr(0, 10)}
                            <span style={style.Pornhub}>{item.banner_title.substr(10)}</span>
                        </Title>
                    </div>
                </div>
            )
        })
        return (
            <>
                <Carousel autoplay dotPosition="bottom">
                    {carousels}
                </Carousel>
            </>
        )
    }
}
const style = {
    div: {
        position: 'absolute',
        top: '60%',
        width: '100%',
        height: '8vh',
        background: 'rgb(0,0,0)',
        cursor: 'pointer',
        paddingLeft: '5vh',
    },
    Pornhub: {
        dispaly: 'block',
        height: '6vh',
        backgroundColor: 'rgb(254,154,0)',
        borderRadius: '5px',
        lineHeight: '6vh',
        marginLeft: '.5vh',
        paddingLeft: '1vh',
        color: '#000'
        // padding: '1vh'
    }
}

export default withRouter(carouselDom);