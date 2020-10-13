const defaultStatus = {
    data:[],
    loading:true
}
// 相关文章数据
export default function Related (state = {
    ...defaultStatus
},action) {
    switch (action.type) {
        case 'RELATED':
            state = {
                data:action.data ? action.data.data : defaultStatus.data,
                loading:action.data ? action.data.loading : defaultStatus.loading,
            };
            return state;
        default:
            return state
    }
} 