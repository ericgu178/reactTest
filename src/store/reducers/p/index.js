const defaultStatus = {
    data:[],
    html:'',
    loading:true
}
// 文章具体数据
export default function P (state = {
    ...defaultStatus
},action) {
    switch (action.type) {
        case 'P':
            state = {
                data:action.data ? action.data.data : defaultStatus.data,
                html:action.data ? action.data.html : defaultStatus.html,
                loading:action.data ? action.data.loading : defaultStatus.loading,
            };
            return state;
        default:
            return state
    }
}