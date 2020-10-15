import React from 'react';
import { Card,Alert,Spin  } from 'antd';
import { fetchPicture } from "../../store/actions/picture";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

class index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props,
            currentImage:0,
            viewerIsOpen:false,
        }
    }

    static async fetch(store,query) {
        return await store.dispatch(fetchPicture(query))
    }

    closeLightbox() {
        this.setState({
            currentImage:0,
            viewerIsOpen:false
        })
    }

    openLightbox(event,{photo,index}) {
        console.log(photo,index)
        this.setState({
            currentImage:index,
            viewerIsOpen:true
        })
    }

    render() {
        const { Meta } = Card;
        const { data,loading } = this.state;
        const photos = []
        data.map((item)=>{
            item.link_image.map((s) => {
                photos.push({
                    src:s.image_path,
                    alt:s.image_path,
                    width: Math.ceil(Math.random()*10),
                    height: Math.ceil(Math.random()*10)
                })
            })
            // return (
            //     <Card
            //         key={item.id}
            //         hoverable
            //         style={{ width: 'calc(33.33% - 10px)',height:'100%',marginRight:'10px',marginTop:'10px' }}
            //         cover={}
            //     >
                    
            //         <Meta title={item.picture_title}/>
            //     </Card>
            // )
        })
        console.log(photos)
        return (
            <>
                <Alert
                    message="本页面 展示收藏的照片所用"
                    description="照片 随便看看 精美的照片都会放在这里"
                    type="info"
                />
                <Spin spinning={loading}>
                    <div style={{display:'flex',justifyContent:'flex-start',flexWrap:'wrap'}}>
                        <Gallery onClick={this.openLightbox.bind(this)} photos={photos} direction={"column"}/>
                        <ModalGateway>
                            {this.state.viewerIsOpen ? (
                              <Modal onClose={this.closeLightbox.bind(this)}>
                                <Carousel
                                  currentIndex={this.state.currentImage}
                                  views={photos.map(x => ({
                                    ...x,
                                    srcset: x.src,
                                    caption: x.alt
                                  }))}
                                />
                              </Modal>
                            ) : null}
                        </ModalGateway>
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
