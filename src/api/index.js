import {getRequest,postRequest} from "../libs/axios"

export const getContent = params => {
    return getRequest('/index/index/getIndex',params)
}

export const getMenus = params => {
    return getRequest('/admin/menu/index',params)
}