import React from 'react';
import { Comment, Card, Avatar } from 'antd';
// 评论模块
const ExampleComment = ({ children }) => (
    <Comment
        actions={[<span key="comment-nested-reply-to">Reply to</span>]}
        author={<a>Han Solo</a>}
        avatar={
            <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
            />
        }
        content={
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure).
        </p>
        }
    >
        {children}
    </Comment>
);


class CommentDom extends React.Component {

    state = {
        title: '文章评论'
    }

    render() {
        return (
            <>
                <Card title={this.state.title}>
                    <ExampleComment>
                        <ExampleComment />
                    </ExampleComment>
                </Card>

            </>
        )
    }
}


export default CommentDom;