// 现在我们已经创建了reducer，但是还没有对应的action来操作它们，所以接下来就来编写action
import axios from 'axios'
import qs from 'qs'
import { Modal} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
const alert = Modal.alert;

// 常量修改
export function setPageTitle (data) {
    return (dispatch) => {
        dispatch({ type: 'SET_PAGE_TITLE', data: data })
    }
}

// 异步修改
// 用户登录，将用户信息存储在仓库
export function setUser (userName,password){
    return (dispatch) => {
        axios.post('http://xx.xx.xx.xx:8888/user-server/login/userLogin',qs.stringify({
            userName:userName,
            password:password
        })).then(res => {
            if(res.data.apistatus === 200){
                dispatch({ type: 'SET_USER', data:res.data.result })
            }else {
                alert('提示',res.data.msg , [
                    { text: '知道了', onPress: () => '' },
                ])
            }
        })
    }
}