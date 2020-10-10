import { getContent,getBanner,getTopViews } from "../../api/index"

// 文章列表请求
export const fetchArtList = params => {
    return async (dispatch, getState) => {
        let data = await getContent(params)
        const result = [];
        data.data.filter(item => {
            const tags = [];
            item.label_pk_ids.filter(tag => {
                tags.push(tag.label_name)
            })
            result.push({
                href: `/p/${item.id}`,
                title: item.blog_title,
                description: item.blog_describe.length > 120 ? item.blog_describe : item.blog_content.substr(0, 200),
                create_time: item.create_time,
                reads: item.reads,
                img: `https://api.ericgu178.com/${item.material_id.filepath}`,
                tags: tags.join(',')
            })
        })
        
        dispatch({
            type: 'ARTLIST',
            data: { 
                listData: result, 
                pageTotal: data.total,
                pageSize: 10,
                loading: false,
                contentLoading: false,
                url:'https://api.ericgu178.com/',
                current:parseInt(params.page) || 1
            }
        });
    }
}

// banner请求
export const fetchBanner = () => {
    return async (dispatch, getState) => {
        let data = await getBanner()
        dispatch({
            type: 'BANNER',
            data: { 
                data: data.data, 
                url:'https://api.ericgu178.com/'
            }
        });
    }
}