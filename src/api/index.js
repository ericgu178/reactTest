import { getRequest, postRequest } from "../libs/axios"

export const getContent = params => {
    return getRequest('/index/index/getIndex', params)
}

export const getTag = params => {
    return getRequest('/index/index/getTag', params)
}