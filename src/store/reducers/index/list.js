const defaultStatus = {
    pageSize: 10,
    loading: false,
    contentLoading: false,
    url:'https://api.ericgu178.com/'
}

export default function ArtList (state = {
    ...defaultStatus,
    listData: [],
    pageTotal: 0
},action) {
    switch (action.type) {
        case 'ARTLIST':
            let res = {
                pageSize:action.data ? action.data.pageSize : defaultStatus.pageSize,
                loading:action.data ? action.data.loading : defaultStatus.loading,
                contentLoading:action.data ? action.data.contentLoading : defaultStatus.loading,
                url:defaultStatus.url,
                pageTotal: action.data ? action.data.pageTotal : defaultStatus.pageTotal,
                listData: action.data ? action.data.listData : state.listData
            };
            state = res;
            return state;
        default:
            return state
    }
}
