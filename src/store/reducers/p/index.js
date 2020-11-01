const defaultStatus = {
    data:[],
    html:'',
    loading:true,
    url:'https://api.ericgu178.com'
}
// 文章具体数据
export default function P (state = {
    ...defaultStatus
},action) {
    switch (action.type) {
        case 'P':
            state = {
                data:action.data ? action.data.data : state.data,
                html:action.data ? action.data.html : state.html,
                loading:action.data ? action.data.loading : state.loading,
                url:state.url
            };
            return state;
        default:
            return state
    }
}