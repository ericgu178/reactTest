const defaultStatus = {
    data:[],
    count:0,
    loading:true,
    keyboard:''
}
// banner图片数据
export default function TagArticle (state = {
    ...defaultStatus
},action) {
    switch (action.type) {
        case 'TAGARTICLE':
            state = {
                data:action.data || defaultStatus.data,
                count:action.count || defaultStatus.count,
                loading:action.loading === false ? false : true,
                keyboard:action.keyboard || defaultStatus.keyboard
            };
            return state;
        default:
            return state
    }
}