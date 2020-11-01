import React from 'react';
import { Carousel, Typography } from 'antd';
import { fetchBanner } from "../../store/actions/index"
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux"
import PropTypes from 'prop-types';

const { Title } = Typography;
// 轮播图
class carouselDom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...props
        }
    }

    static fetch(store) {
        return store.dispatch(fetchBanner())
    }

    handleImageLoaded(stateField) {
        const temp = {}
        temp[stateField] = true
        this.setState(temp);
    }
     
    handleImageErrored(stateField) {
        const temp = {}
        temp[stateField] = false
        this.setState(temp);
    }
    
    render() {
        const list = this.state.data;
        const carousels = list.map((item,index) => {
            return (
                <a href={`/p/${item.article_id}`} key={index}>
                <div style={{ width: '100%', position: 'relative', height: '100%', cursor: 'pointer' }}>
                    <div style={{ width: '100%', position: 'relative', height: '100%'}}>
                        <img onLoad={this.handleImageLoaded.bind(this,'p' + index)}
                        onError={this.handleImageErrored.bind(this,'p' + index)} 
                        style={{ width: '100%', height: '50vh', objectFit: 'cover', cursor: 'pointer'}} 
                        src={this.state.url + item.material_id.filepath} 
                        alt={item} />
                        <a href={`/p/${item.article_id}`} className="mark" style={{opacity:this.state['p' + index] === true ? 0 : 1}}> </a>
                    </div>
                    <div style={style.div}>
                        <Title level={2} style={{ color: '#fff', height: '100%', display: 'flex', alignItems: 'center' }}>
                            {item.banner_title.substr(0, 10)}
                            <span style={style.Pornhub}>{item.banner_title.substr(10)}</span>
                        </Title>
                    </div>
                </div>
                </a>
            )
        })
        return (
            <Carousel autoplay dotPosition="bottom" autoplaySpeed={6000}>
                {carousels}
            </Carousel>
        )
    }
}
const style = {
    div: {
        position: 'absolute',
        top: '70%',
        width: '100%',
        height: '8vh',
        background: 'rgba(0, 0, 0,0.4)',
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
        padding: '0 1vh',
        color: '#000'
    }
}
const mapStateToProps = (state) => ({
    data:state.Banner.bannerData,
    url:state.Banner.url
});
const mapDispatchToProps = {
    fetchBanner:fetchBanner
}
// 校验数据
carouselDom.propTypes = {
    data:PropTypes.array.isRequired,
    url:PropTypes.string.isRequired
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(carouselDom));