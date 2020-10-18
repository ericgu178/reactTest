import React from 'react';
import { fetchBiying } from "../../store/actions/biying"
import { connect } from "react-redux"
import PropTypes from 'prop-types';
import Carousel, { Modal, ModalGateway } from "react-images";
import { Pagination,Alert,Tooltip } from 'antd';
import './index.css'
class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props,
            currentIndex:0,
            viewerIsOpen:false
        }
    }

    static async fetch(store,query) {
        return await store.dispatch(fetchBiying(query));
    }

    openLightbox = (index) => {
        this.setState({
            currentIndex:index,
            viewerIsOpen:true
        })
    }

    closeLightbox = () => {
        this.setState({
            currentIndex:0,
            viewerIsOpen:false
        })
    }

    onChange = (page) => {
        window.location.href = `/biying?page=${page}`
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
        const {data,currentIndex,viewerIsOpen,total,page,pageSize} = this.state;
        return (
            <div>
                <Alert
                    style={{marginBottom:'20px'}}
                    message="必应每日图片"
                    description="想必大家都知道，「Bing」必应搜索最大的“特色”且与百度、Google 最大的不同就在于，必应每天都会更新一张高清精美的背景图片，大多数是风景摄影作品，质量都非常高。每日的 Bing 必应图片不仅能让你搜索时能换个心情，同时也是大家用来做电脑桌面壁纸的绝佳素材！此页面所有图片均来自必应搜索！！"
                    type="info"
                />
                <div style={{display:'flex',flexFlow:'row wrap',width:'100%',height:'100%'}}>
                    {data.map((item,index)=>{
                        return (
                            <div key={index} className="block" onClick={this.openLightbox.bind(this,index)} >
                                <Tooltip  placement="top" title={item.title}>
                                    <img 
                                        src={item.src}
                                        alt={item.title}
                                        onLoad={this.handleImageLoaded.bind(this,'p' + index)}
                                        onError={this.handleImageErrored.bind(this,'p' + index)}
                                        className="img"
                                    />
                                    <span className="mark" style={{opacity:this.state['p' + index] === true ? 0 : 1}}></span>
                                </Tooltip>
                            </div> 
                        )
                    })}
                </div>
                <ModalGateway>
                    {viewerIsOpen ? (
                        <Modal onClose={this.closeLightbox.bind(this)}>
                            <Carousel
                                currentIndex={currentIndex}
                                views={data.map(x => ({
                                    ...x,
                                    srcset: x.src,
                                    caption: x.title
                                }))}
                            />
                        </Modal>
                    ) : null}
                </ModalGateway>
                <div style={{display:'flex',justifyContent:'flex-end',margin:'30px 0 10px 0'}}>
                    <Pagination
                        total={total}
                        pageSize={pageSize}
                        current={page}
                        showQuickJumper
                        showSizeChanger={false}
                        onChange={this.onChange.bind(this)}
                        showTotal={total => `共计 ${total} 张图片`}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data:state.BIndex.data,
    page:state.BIndex.page,
    pageSize:state.BIndex.pageSize,
    total:state.BIndex.total,
});
const mapDispatchToProps = {
    fetchBiying:fetchBiying
}
// 校验数据
Index.propTypes = {
    data:PropTypes.array.isRequired,
    page:PropTypes.number.isRequired,
    pageSize:PropTypes.number.isRequired,
    total:PropTypes.number.isRequired,
}
export default connect(mapStateToProps,mapDispatchToProps)(Index)