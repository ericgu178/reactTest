const defaultStatus = {
    data:[],
}
// banner图片数据
export default function TopViews (state = {
    ...defaultStatus
},action) {
    switch (action.type) {
        case 'TAGCLOUNDS':
            state = {
                data:action.data ? action.data.data : defaultStatus.data,
            };
            return state;
        default:
            return state
    }
}
        