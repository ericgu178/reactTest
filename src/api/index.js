import { getRequest, postRequest } from "../libs/axios"

export const getContent = params => {
    return getRequest('/index/index/getIndex', params);
}

export const getTag = params => {
    return getRequest('/index/index/getTag', params);
}
// 文章页
export const getP = params => {
    return postRequest('/index/index/getP', params);
}
// 获取最高点击数量
export const getTopViews = params => {
    return getRequest('/index/index/getTopViews', params)
}
// 获取banner 图
export const getBanner = params => {
    return getRequest('/index/index/getBanner_', params)
}
// 获取归档
export const getArchive = params => {
    return getRequest('/index/archive/getIndex', params)
}
// 获取相关文章
export const getRelevant = params => {
    return getRequest('/index/index/relevant', params)
}
// 搜索
export const search = params => {
    return getRequest('/index/index/search', params)
}
// 获取评论
export const getComments = params => {
    return postRequest('/index/index/comments', params)
}

// 提交评论
export const submitComment = params => {
    return postRequest('/index/index/submitComment', params)
}
// 检索标签
export const searchLabelList = params => {
    return getRequest('/index/index/searchLabelList',params); 
}

// 照片墙
export const getPicture = params => {
    return getRequest('/index/picture/index',params);
}
// biying图片
export const getBiyingPicture = params => {
    return getRequest('/bing/index/index',params);
}
