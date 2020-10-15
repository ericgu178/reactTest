import { searchLabelList,search } from "../../api/index"

/**
 * 
 * 文章列表请求
 * 
 * @param {object} params 
 */
export const fetchTagArticle = params => {
    return async (dispatch, getState) => {
        let result = await searchLabelList({label_id:params.id,label_name:params.title})
        dispatch({
            type:'TAGARTICLE',
            loading:false,
            data:result.data.search_list,
            count:result.data.count,
            keyboard:result.data.keyboard
        })
    }
}

/**
 * 
 * 文章检索请求
 * 
 * @param {object} params 
 */
export const fetchSearch = params => {
    return async (dispatch, getState) => {
        let result = await search(params)
        dispatch({
            type:'SEARCH',
            loading:false,
            data:result.data
        })
    }
}
