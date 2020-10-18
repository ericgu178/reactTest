const defaultStatus = {
    data: [],
    page: 1,
    pageSize:15,
    total:0
}
// 归档数据
export default function BIndex (state = {
    ...defaultStatus
},action) {
    switch (action.type) {
        case 'BIYING':
            state = {
                data:action.data || state.data,
                page:action.page || state.page,
                total:action.total || state.total,
                pageSize:action.pageSize || state.pageSize,
            };
            return state;
        default:
            return state
    }
}