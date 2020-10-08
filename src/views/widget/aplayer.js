import React from 'react';
import axios from 'axios'
export default class Aplayer extends React.Component {
  // event binding example
  state = {
      audio:[],
      ReactAplayer:null
  }
  onPlay = () => {
  };

  onPause = () => {
  };

  // example of access aplayer instance
  onInit = ap => {
    this.ap = ap;
  };
  componentDidMount() {
    import('react-aplayer').then(res=>{
        this.setState({ReactAplayer:res.default})
    })
    axios({
        method: 'get',
        url: 'https://bird.ioliu.cn/v1/?url=https://music.163.com/api/playlist/detail?id=866762201',
    }).then(response=> {
        if (response.data.code === 200) {
            var audio = response.data.result.tracks.map(item=>({
                id:item.id,
                name:item.name,
                artist:item.artists.map(el=>el.name).join(','),
                url:`https://music.163.com/song/media/outer/url?id=${item.id}.mp3`,
                cover:item.album.picUrl.replace(/http/,'https'),
                lrc:null
            }))
            this.setState({audio:audio})
        }
    });
  }

  render() {
    const audio = [...this.state.audio];
    const ReactAplayer = this.state.ReactAplayer
    const props = {
        theme: '#F57F17',
        lrcType: 3,
        audio:audio,
        mini:true,
        fixed:true,
        listFolded:true,
        autoplay:true
    };
    if (props.audio.length !== 0) {
        return (
            <div>
                <ReactAplayer
                    {...props}
                    onInit={this.onInit}
                    onPlay={this.onPlay}
                    onPause={this.onPause}
                />
            </div>   
        );
    } else {
        return (<></>)

    }
    
  }
}