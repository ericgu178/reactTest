import { combineReducers } from 'redux';
import ArtList from './index/list';
import Banner from './index/banner';
import TopViews from './widget/topViews';
import TagCloud from './widget/tagCloud';
import P from './p/index';
import Related from './p/Related';
import Comment from './p/comment';
import TagArticle from './search/tag';

const appReducer = combineReducers({
    ArtList,
    Banner,
    TopViews,
    TagCloud,
    P,
    Related,
    Comment,
    TagArticle
})

// 首页数据源
export const IndexReducer = combineReducers({
    ArtList,
    Banner,
    TopViews,
    TagCloud
})
// 文章相关数据源
export const PReducer = combineReducers({
    P,
    Related,
    Comment
})

// 搜索文章数据源
export const TReducer = combineReducers({
    TagArticle,
    TagCloud
})

// 统一返回数据
export default appReducer
