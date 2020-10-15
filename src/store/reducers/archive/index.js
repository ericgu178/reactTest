const defaultStatus = {
    data: [],
    curr: `${new Date().getFullYear()}`,
    datelist:[]
}
// 归档数据
export default function AIndex (state = {
    ...defaultStatus
},action) {
    switch (action.type) {
        case 'ARCHIVE':
            state = {
                data:action.data || state.data,
                curr:action.curr || state.curr,
                datelist:action.datelist || state.datelist,
            };
            return state;
        default:
            return state
    }
}