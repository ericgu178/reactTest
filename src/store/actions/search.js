import { searchLabelList } from "../../api/index"

// 文章列表请求
export const fetchTagArticle = params => {
    console.log(params)
    return async (dispatch, getState) => {
        let result = await searchLabelList({label_id:params.id,label_name:params.title})
        console.log(result)
        dispatch({
            type:'TAGARTICLE',
            loading:false,
            data:result.data.search_list,
            count:result.data.count,
            keyboard:result.data.keyboard
        })
    }
}
