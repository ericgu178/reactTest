const defaultStatus = {
    pageSize: 10,
    loading: false,
    contentLoading: false,
    url:'https://api.ericgu178.com/',
    current:1
}
// 文章列表的数据
export default function ArtList (state = {
    ...defaultStatus,
    listData: [],
    pageTotal: 0,
},action) {
    switch (action.type) {
        case 'ARTLIST':
            state = {
                pageSize:action.data ? action.data.pageSize : defaultStatus.pageSize,
                loading:action.data ? action.data.loading : defaultStatus.loading,
                contentLoading:action.data ? action.data.contentLoading : defaultStatus.loading,
                url:defaultStatus.url,
                pageTotal: action.data ? action.data.pageTotal : defaultStatus.pageTotal,
                listData: action.data ? action.data.listData : state.listData,
                current: action.data ? action.data.current : 1
            };
            return state;
        default:
            return state
    }
}
