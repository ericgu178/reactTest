const defaultStatus = {
    bannerData:[],
    url:'https://api.ericgu178.com/'
}
// banner图片数据
export default function Banner (state = {
    ...defaultStatus
},action) {
    switch (action.type) {
        case 'BANNER':
            state = {
                bannerData:action.data ? action.data.data : defaultStatus.bannerData,    
                url:defaultStatus.url,
            };
            return state;
        default:
            return state
    }
}
