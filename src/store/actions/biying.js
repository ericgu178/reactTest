import { getBiyingPicture } from "../../api/index"

/**
 * 必应图片请求
 * 
 * @param {object} params 
 */
export const fetchBiying = params => {
    return async (dispatch, getState) => {
        let result = await getBiyingPicture(params)
        const data = result.data.map(item=>{
            return {
                src: item.file_path || item.show_pic,
                width: 4,
                height: 3,
                title:item.title,
            }
        })
        dispatch({
            type:'BIYING',
            data: data,
            total:result.total,
            pageSize:result.per_page,
            page: result.current_page
        })
    }
}
