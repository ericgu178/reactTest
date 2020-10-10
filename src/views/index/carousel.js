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

    onClick(item) {
        return this.props.history.push(`/p/${item.article_id}`)
    }
    render() {
        const list = this.state.data;
        const carousels = list.map(item => {
            return (
                <div style={{ width: '100%', position: 'relative', height: '100%', cursor: 'pointer' }} key={item}>
                    <img onClick={this.onClick.bind(this, item)} style={{ width: '100%', height: '50vh', objectFit: 'cover', cursor: 'pointer' }} src={this.state.url + item.material_id.filepath} alt={item} />
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
        top: '70%',
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