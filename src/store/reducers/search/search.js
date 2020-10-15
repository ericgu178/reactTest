const defaultStatus = {
    data:[],
    loading:true,
}
// banner图片数据
export default function Search (state = {
    ...defaultStatus
},action) {
    switch (action.type) {
        case 'SEARCH':
            state = {
                data:action.data || state.data,
                loading:action.loading === false ? false : true,
            };
            return state;
        default:
            return state
    }
}