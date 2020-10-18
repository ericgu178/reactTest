import { combineReducers } from 'redux';
import ArtList from './index/list';
import Banner from './index/banner';
import TopViews from './widget/topViews';
import TagCloud from './widget/tagCloud';
import P from './p/index';
import Related from './p/related';
import Comment from './p/comment';
import TagArticle from './search/tag';
import AIndex from './archive';
import Search from './search/search'
import Picture from './picture/index'
import BIndex from './biying/index'
// 这个用于client Redux
const appReducer = combineReducers({
    ArtList,
    Banner,
    TopViews,
    TagCloud,
    P,
    Related,
    Comment,
    TagArticle,
    AIndex,
    Search,
    Picture,
    BIndex
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
    TagCloud,
    Search
})

// archive数据源
export const AReducer = combineReducers({
    AIndex
})

// archive数据源
export const ImgReducer = combineReducers({
    Picture
})

// 必应数据源
export const BiyingReducer = combineReducers({
    BIndex
})


// 统一返回数据
export default appReducer
