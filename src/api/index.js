import { getRequest, postRequest } from "../libs/axios"

export const getContent = params => {
    return getRequest('/index/index/getIndex', params);
}

export const getTag = params => {
    return getRequest('/index/index/getTag', params);
}

export const getP = params => {
    return postRequest('/index/index/getP', params);
}
// 获取最高点击数量
export const getTopViews = params => {
    return getRequest('/index/index/getTopViews', params)
}

export const getBanner = params => {
    return getRequest('/index/index/getBanner_', params)
}

export const getArchive = params => {
    return getRequest('/index/archive/getIndex', params)
}
