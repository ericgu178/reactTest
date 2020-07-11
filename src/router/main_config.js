import index from '../views/index/index'
import a2 from '../views/test2/a2'

const routes = [
    { path: '/index', name: 'index', component: index},
    { path: '/a2', exact: true,  name: 'a2', component: a2},
]

// 路由
export default routes