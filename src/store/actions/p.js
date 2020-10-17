import { getP,getRelevant,getComments } from "../../api/index"
import marked from 'marked';
import hljs from "highlight.js";
// 获取文章
export const fetchP = (params) => {
    return async (dispatch, getState) => {
        let result = await getP(params);
        const renderer = {
            html:html => {
                return htmlDecode(html)
            }
        }
        marked.use({renderer});
        marked.setOptions({
            // renderer: new marked.Renderer(),
            gfm: true,
            pedantic: false,
            sanitize: false,
            tables: true,
            breaks: true,
            smartLists: true,
            smartypants: true,
            highlight: function (code) {
                code = htmlDecode(code)
                console.log(hljs.highlightAuto(code).value)
                return hljs.highlightAuto(code).value;
            }
        });
        let html = marked(result.data.blog_content);
        delete result.data.blog_content;
        dispatch({
            type: 'P',
            data: { 
                data: result.data,
                html:html,
                loading:false
            }
        });
    }
}

// 获取相关文章
export const fetchRelated = (params) => {
    return async (dispatch, getState) => {
        let ids = params.map( item =>(item.id))
        let result = await getRelevant({label_pk_ids:ids});
        dispatch({
            type: 'RELATED',
            data: { 
                data: result.data,
                loading:false
            }
        });
    }
}
// 获取评论
export const fetchComments = (params) => {
    return async (dispatch, getState) => {
        let result = await getComments(params);
        dispatch({
            type: 'COMMENT',
            data: result.data
        });
    }
}

function htmlDecode(str) {
    /*4.用正则表达式实现html解码*/
   var s = "";
   if(str.length === 0) return "";
   s = str.replace(/&amp;/g,"&");
   s = s.replace(/&lt;/g,"<");
   s = s.replace(/&gt;/g,">");
   s = s.replace(/&nbsp;/g," ");
   s = s.replace(/&quot;/g,"\"");
   return s; 
}