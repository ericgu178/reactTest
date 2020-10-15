const defaultStatus = {
    data:[],
    loading:true,
}
// banner图片数据
export default function Picture (state = {
    ...defaultStatus
},action) {
    switch (action.type) {
        case 'PICTURE':
            state = {
                data:action.data || state.data,
                loading:action.loading === false ? false : true,
            };
            return state;
        default:
            return state;
    }
}