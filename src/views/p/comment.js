import React from 'react';
import { Comment,message,Tag , Card, Avatar,Tooltip,Form,Input,Button } from 'antd';
import { getComments,submitComment} from "../../api/index"
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const {TextArea} = Input;
// 评论模块
const ExampleFatherComments = (item) => {
    return (
        <Comment
            actions={[<span key="comment-nested-reply-to" onClick={item.onReply.bind(this,item)}>回复</span>]}
            author={<a>{item.ip} <Tag>{item.browser}</Tag><Tag>{item.os}</Tag></a>}
            avatar={
                <Avatar
                    src={require('../../assets/images/user.jpg')}
                    alt={item.ip}
                />
            }
            content={
                <p>{item.comment_content}</p>
            }
            datetime={
                <Tooltip title={moment(item.create_time).format('YYYY-MM-DD HH:mm:ss')}>
                  <span>{moment(item.create_time).fromNow()}</span>
                </Tooltip>
            }
        >
            {item.children && item.children.length > 0  ? <ExampleSonComments key={item.id} children={item.children} onReply={item.onReply}></ExampleSonComments> : []}
        </Comment>
    );
}
// 嵌套评论
const ExampleSonComments = (item) => {
    return item.children.map((i,k) => {
        console.log(i)
        return <Comment
                    key={k}
                    actions={[<span key="comment-nested-reply-to" onClick={item.onReply.bind(this,i)}>回复</span>]}
                    author={<a>{i.ip} <Tag>{i.browser}</Tag><Tag>{i.os}</Tag></a>}
                    avatar={
                        <Avatar
                            src={require('../../assets/images/user.jpg')}
                            alt={i.ip}
                        />
                    }
                    content={
                        <p>{i.comment_content}</p>
                    }
                    datetime={
                        <Tooltip title={moment(i.create_time).format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment(i.create_time).fromNow()}</span>
                        </Tooltip>
                    }
                >
                    {i.children && item.children.length > 0  ? <ExampleSonComments key={i.id} onReply={item.onReply} children={i.children}></ExampleSonComments> : []}
                </Comment>
    })
}
// 回复评论框
const Editor = ({ onChange, onSubmit, submitting, value, p }) => (
    <>
       {p === '' ? '' : '回复:' + p} 
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          回复
        </Button>
      </Form.Item>
    </>
  );
class CommentDom extends React.Component {
    state = {
        title: '文章评论',
        data:[],
        submitting: false, // 提交中的状态
        value: '', // 提交的数据内容
        pid:0,
        pName:''
    }
    componentDidMount() {
        this.getContent(this.props.id);
    }
    async getContent(id) {
       let result = await getComments({id:id});
       this.setState({data:result.data});
    }
    // 提交
    handleSubmit = async e => {
        if (!this.state.value) {
            return;
        }
        this.setState({
            submitting: true,
        });
        const submitData = {
            pid:this.state.pid,
            comment_content:this.state.value,
            blog_article_id:this.props.id
        }
        let res = await submitComment(submitData);
        message.info(res.msg)
        this.setState({
            submitting: false,
            value:'',
            pName:''
        });
        this.getContent(this.props.id);
    }
    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    onReply(row) {
        this.setState({
            pid:row.id,
            pName:row.ip
        })
    }

    render() {
        const { data, submitting, value } = this.state;
        if (data === undefined || data.length === 0) {
            return (
                <Card title={this.state.title}>
                <Comment
                    avatar={
                        <Avatar
                            src={require('../../assets/images/user.jpg')}
                            alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                            p={this.state.pName}
                        />
                    }
                />
                </Card>
            )
        }
        var render = data.map( (item) => {
            return (
                <ExampleFatherComments key={item.id} {...item} onReply={this.onReply.bind(this)}></ExampleFatherComments>
            )
        })
        return (
            <Card title={this.state.title}>
                {render}
                <Comment
                    avatar={
                        <Avatar
                            src={require('../../assets/images/user.jpg')}
                            alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                            p={this.state.pName}
                        />
                    }
                />
            </Card>
        )
    }
}
export default CommentDom;