import { getPicture } from '../../api/index';

export const fetchPicture = params => {
    return async (dispatch,getState) => {
        let result = await getPicture();
        dispatch({
            type:'PICTURE',
            loading:false,
            data:result.data,
        })
    }
}