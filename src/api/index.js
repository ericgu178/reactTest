import {getRequest,postRequest} from "../libs/axios"

export const getContent = params => {
    return getRequest('/admin/article/index',params)
}