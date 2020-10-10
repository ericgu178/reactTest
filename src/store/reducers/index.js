import { combineReducers } from 'redux';
import ArtList from './index/list';
import Banner from './index/banner';
const appReducer = combineReducers({
    ArtList,
    Banner
})
// 统一返回数据
export default appReducer
