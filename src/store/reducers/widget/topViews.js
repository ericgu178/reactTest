const defaultStatus = {
    topViewsData:[],
    url:'https://api.ericgu178.com/',
    loading:false
}
// 最高点击排行数据
export default function TopViews (state = {
    ...defaultStatus
},action) {
    switch (action.type) {
        case 'TOPVIEWS':
            state = {
                topViewsData:action.data ? action.data.data : defaultStatus.topViewsData,
                url:defaultStatus.url,
                loading:action.data ? action.data.loading : defaultStatus.loading
            };
            return state;
        default:
            return state
    }
}
