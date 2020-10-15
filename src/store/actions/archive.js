import { getArchive } from "../../api/index"

/**
 * 归档请求
 * 
 * @param {object} params 
 */
export const fetchArchive = params => {
    return async (dispatch, getState) => {
        let result = await getArchive(params)
        dispatch({
            type:'ARCHIVE',
            data: result.toyear,
            curr: params.date,
            datelist:result.data
        })
    }
}
