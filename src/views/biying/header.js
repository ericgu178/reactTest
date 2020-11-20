// @flow
// @jsx glam
import glam from 'glam';
import { postLikes } from '../../api/index';
import { notification  } from 'antd';
import React from 'react';
// 自定义头部 react-images
const colors = {
    primary: '#00D7FF',
    red: '#BF2600',
    navy: '#0747A6',
    powderBlue: '#DEEBFF',
    // Neutrals
    N05: '#F4F5F7',
    N10: '#EBECF0',
    N20: '#C1C7D0',
    N40: '#97A0AF',
    N60: '#6B778C',
    N70: '#42526E',
    N80: '#253858',
    N90: '#172B4D',
    N100: '#FFF',
};
const smallDevice = '@media (max-width: 769px)';
const largeDevice = '@media (min-width: 770px)';

export const Header = ({ currentView, modalProps }) => {
  const { title, create_time,views,pictureId } = currentView;
  const { onClose } = modalProps;

  const createdDate = new Date(create_time).toLocaleDateString();

  return (
    <div
      css={{
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.2)',
        position:'absolute',
        top:'0',
        left:'0',
        width:'100%',
        zIndex:'9999',
        boxShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
        color: colors.N80,
        display: 'flex ',
        flex: '0 0 auto',
        height: 80,
        justifyContent: 'space-between',
        [smallDevice]: {
          paddingLeft: 10,
          paddingRight: 10,
        },
        [largeDevice]: {
          paddingLeft: 20,
          paddingRight: 20,
        },
      }}
    >
      <div css={{ alignItems: 'center', display: 'flex ', minWidth: 0 }}>
        <img
          css={{
            borderRadius: 3,
            flexShrink: 0,
            height: 50,
            marginRight: 8,
            width: 50,
          }}
          alt={'admin'}
          src={require('../../assets/images/user.jpg')}
        />
        <div css={{ fontSize: '0.85em', minWidth: 0 }}>
          <div css={{ color: colors.N100, fontWeight: 500 }}>{"代码小鬼"}</div>
          <div
            css={{
              color: colors.N100,
              marginTop: '0.25em',
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontSize:'20px'
            }}
          >
            <span>{createdDate}</span>
            {title ? <span> &mdash; {title}</span> : null}
          </div>
        </div>
      </div>
      <div style={{ alignItems: 'center', display: 'flex',width: '15%',justifyContent: 'flex-end' }}>
        <div style={{height: '50px',width:'5vw',color:'#fff',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'16px'}}>{views}次浏览</div>
        <Button
            onClick={() => {
                currentView.downloads += 1
                window.location.href = `https://api.ericgu178.com/bing/index/download?id=${pictureId}`
            }}>
            <span css={{
                backgroundColor: 'white',
                borderRadius: 8,
                display: 'inline-block',
                fontSize: '0.7em',
                fontWeight: 500,
                lineHeight: 1,
                marginRight: -12,
                marginTop: 8,
                padding: '1px 4px',
                position: 'relative',
              }}
            >
            {currentView.downloads}
            </span>
            <Download/>
        </Button>
        <Button
            onClick={async () => {
                let res = await postLikes({id:pictureId})
                if (res.code === 0) {
                    currentView.likes += 1
                    notification.success({
                        message: '点赞成功',
                        description:title,
                        style:{
                            zIndex:199999
                        }
                    });
                } else {
                    notification.error({
                        message: '点赞失败 原因如下',
                        description:res.msg,
                        style:{
                            zIndex:199999
                        }
                    });
                }
            }}>
            <span css={{
                backgroundColor: 'white',
                borderRadius: 8,
                display: 'inline-block',
                fontSize: '0.7em',
                fontWeight: 500,
                lineHeight: 1,
                marginRight: -12,
                marginTop: 8,
                padding: '1px 4px',
                position: 'relative',
              }}
            >
            {currentView.likes}
            </span>
            <Heart style={{color:'red'}}/>
        </Button>
        <Button onClick={onClose} css={{borderLeft: `1px solid ${colors.N10}`,paddingLeft: 10,[largeDevice]: { marginRight: -10 },}}>
            <Close style={{color:'#fff'}}/>
        </Button>
      </div>
    </div>
  );
};

const Button = ({ css, ...props }) => (
  <div
    css={{
      alignItems: 'center',
      color: colors.N60,
      cursor: 'pointer',
      display: 'flex ',
      fontWeight: 300,
      height: 50,
      justifyContent: 'center',
      marginLeft: 10,
      position: 'relative',
      textAlign: 'center',
      minWidth: 50,
      '&:hover, &:active': {
        color: colors.red,
      },

      ...css,
    }}
    role="button"
    {...props}
  />
);

// 生成svg
const Svg = ({ size, ...props }) => (
  <svg
    role="presentation"
    viewBox="0 0 24 24"
    css={{
      display: 'inline-block',
      fill: 'currentColor',
      height: size,
      stroke: 'currentColor',
      strokeWidth: 0,
      width: size,
    }}
    {...props}
  />
);

// 关闭
const Close = ({ size = 35, ...props }) => (
  <Svg size={size} {...props}>
    <path d="M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z" />
  </Svg>
);
// 喜欢
const Heart = ({ size = 35, ...props }) => (
  <Svg size={size} {...props}>
    <path d="M12.094 18.563c4.781-4.313 7.922-7.172 7.922-10.078 0-2.016-1.5-3.469-3.516-3.469-1.547 0-3.047 0.984-3.563 2.344h-1.875c-0.516-1.359-2.016-2.344-3.563-2.344-2.016 0-3.516 1.453-3.516 3.469 0 2.906 3.141 5.766 7.922 10.078l0.094 0.094zM16.5 3c3.094 0 5.484 2.391 5.484 5.484 0 3.797-3.375 6.844-8.531 11.531l-1.453 1.313-1.453-1.266c-5.156-4.688-8.531-7.781-8.531-11.578 0-3.094 2.391-5.484 5.484-5.484 1.734 0 3.422 0.844 4.5 2.109 1.078-1.266 2.766-2.109 4.5-2.109z" />
  </Svg>
);
const Download = () => (
    <svg role="img" xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 24 24" aria-labelledby="downloadIconTitle" stroke="#fff" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#fff"> <title id="downloadIconTitle">Download</title> <path d="M12,3 L12,16"/> <polyline points="7 12 12 17 17 12"/> <path d="M20,21 L4,21"/> </svg>
);