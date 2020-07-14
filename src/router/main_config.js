import index from '../views/index';
import p from '../views/p';
import about from '../views/about';
import archive from '../views/archive'

const routes = [
    { path: '/index', name: '首页', component: index},
    { path: '/about' , name : '关于', component: about},
    { path: '/archive', name: '归档', component: archive},
    { path: '/p/:id',  name: '文章', component: p},
    { redirect: true , exact:false, from: '/',  to: '/index' },
]

// 路由
export default routes