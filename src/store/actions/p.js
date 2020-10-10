import { getP } from "../../api/index"

// 获取文章
export const fetchP = () => {
    return async (dispatch, getState) => {
        let result = await getP();
        dispatch({
            type: 'P',
            data: { 
                data: result,
                html:'',
                loading:false
            }
        });
    }
}