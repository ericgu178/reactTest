import React from 'react';
import { Card,Alert,Spin  } from 'antd';
import { fetchPicture } from "../../store/actions/picture";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Carousel, { Modal, ModalGateway } from "react-images";

class index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props,
            viewerIsOpen:false,
            set:[]
        }
    }

    static async fetch(store,query) {
        return await store.dispatch(fetchPicture(query))
    }

    closeLightbox() {
        this.setState({
            viewerIsOpen:false
        })
    }

    openLightbox(set) {
        console.log(set)
        this.setState({
            viewerIsOpen:true,
            set
        })
    }

    render() {
        const { Meta } = Card;
        const { data,loading } = this.state;
        const html = data.map((item)=>{
            const set = item.link_image.map((s) => {
                return {
                    src:s.image_path,
                    alt:s.image_path,
                    width: 3,
                    height: 4,
                    describe:s.describe
                }
            })
            return (
                <Card
                    key={item.id}
                    hoverable
                    style={{ width: 'calc(33.33% - 10px)',height:'100%',marginRight:'10px',marginTop:'10px' }}
                    cover={
                        <>
                            <img alt="example" src={item.picture_url} onClick={this.openLightbox.bind(this,set)}/>
                            <ModalGateway>
                                {this.state.viewerIsOpen ? (
                                    <Modal onClose={this.closeLightbox.bind(this)}>
                                        <Carousel
                                            views={this.state.set.map(x => ({
                                              ...x,
                                              srcset: x.src,
                                              caption: x.describe || x.src
                                            }))}
                                        />
                                    </Modal>
                                ) : null}
                            </ModalGateway>
                        </>
                    }
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

const mapStateToProps = (state) => ({
    data:state.Picture.data,
    loading:state.Picture.loading,
});
const mapDispatchToProps = {
    fetchPicture:fetchPicture
}
// 校验数据
index.propTypes = {
    data:PropTypes.array.isRequired,
    loading:PropTypes.bool.isRequired
}
export default connect(mapStateToProps,mapDispatchToProps)(index);
