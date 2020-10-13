const defaultStatus = {
    data:[],
}
// banner图片数据
export default function Comment (state = {
    ...defaultStatus
},action) {
    switch (action.type) {
        case 'COMMENT':
            state = {
                data:action.data || defaultStatus.data,
            };
            return state;
        default:
            return state
    }
} 