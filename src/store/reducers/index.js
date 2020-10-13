import { combineReducers } from 'redux';
import ArtList from './index/list';
import Banner from './index/banner';
import TopViews from './widget/topViews';
import TagCloud from './widget/tagCloud';
import P from './p/index';
import Related from './p/Related';
import Comment from './p/comment';
const appReducer = combineReducers({
    ArtList,
    Banner,
    TopViews,
    TagCloud,
    P,
    Related,
    Comment
})
// 统一返回数据
export default appReducer
