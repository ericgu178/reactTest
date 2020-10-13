import { withRouter } from 'react-router-dom'
import React from "react"
import { Menu } from 'antd'

class menu extends React.Component {
    state = {
        selectKeys: [],
        openKeys: []
    }

    /**
     * 打开菜单项
     * @param array item 
     * @param array parent 
     */
    openKey = (item, parent = []) => {
        try {
            item.filter(it => {
                if (it.subs && it.subs.length > 0) {
                    this.openKey(it.subs, it)
                } else {
                    if (this.props.location.pathname === it.path) {
                        throw parent.path || ''
                    }
                }
            })
        } catch (e) {
            this.setState({ openKeys: [e] })
        }

    }

    onOpenChange = (openKeys) => {
        if (openKeys.length === 0 || openKeys.length === 1) {
            return this.setState({ openKeys })
        }
        //最新展开的菜单
        const latestOpenKey = openKeys[openKeys.length - 1]
        //判断最新展开的菜单是不是父级菜单，若是父级菜单就只展开一个，不是父级菜单就展开父级菜单和当前子菜单
        //因为我的子菜单的key包含了父级菜单，所以不用像官网的例子单独定义父级菜单数组，然后比较当前菜单在不在父级菜单数组里面。
        //只适用于3级菜单
        if (latestOpenKey.includes(openKeys[0])) {
            this.setState({ openKeys })
        } else {
            this.setState({ openKeys: [latestOpenKey] })
        }
    }
    // 会在组件挂载后（插入 DOM 树中）立即调用。
    // 依赖于 DOM 节点的初始化应该放在这里。
    // 如需通过网络请求获取数据，此处是实例化请求的好地方。 相当于 vue 的 mounted 挂载
    componentDidMount() {
        this.setState({ selectKeys: [this.props.location.pathname] })
        // 监听路由
        this.props.history.listen(location => {
            if (location.pathname === '/cangku') {
                return window.open(window._.baseUrl + '/onedrive')
            }
            if (location.pathname === '/biying') {
                return window.open(window._.baseUrl + '/bing/index/index.html')
            }
            this.setState({ selectKeys: [location.pathname] })
            // 最新路由的 location 对象，可以通过比较 pathname 是否相同来判断路由的变化情况
            if (this.props.location.pathname !== location.pathname) {
                // 路由发生了变化
            }
        })
        this.openKey(this.props.menus)

    }
    // 渲染menu菜单
    renderMenuItem = ({ path, icon, title }) => {
        return (
            <Menu.Item key={path} onClick={({ key }) => {
                this.setState({ selectKeys: [key] })
                window.location.href = key
            }}>
                {icon && icon}
                <span>{title}</span>
            </Menu.Item>
        )
    }

    // 渲染出子菜单
    renderSubMenu = ({ path, icon, title, subs }) => {
        return (
            <Menu.SubMenu key={path} title={<span>{icon && icon}<span>{title}</span></span>}>
                {
                    subs && subs.map(item => {
                        // 递归调用
                        let result;
                        if (item.subs && item.subs.length > 0) {
                            result = this.renderSubMenu(item);
                        } else {
                            result = this.renderMenuItem(item);
                        }
                        return result;
                    })
                }
            </Menu.SubMenu>
        )

    }

    render() {
        return (
            <Menu theme={this.props.theme || "dark"} mode={this.props.mode || "inline"}
                selectedKeys={this.state.selectKeys}
                defaultSelectedKeys={['/index']}
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
            >
                {this.props.menus && this.props.menus.map(item => {
                    return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                })}
            </Menu>
        )
    }
}

// react-router-dom 里的 withRouter 作用 
// 把不是通过路由切换过来的组件中
// 将react-router 的 history、location、match 三个对象传入props对象上

// 没有加载 装饰器的可以这么写入
export default withRouter(menu);