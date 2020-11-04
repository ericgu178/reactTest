// 存储数据


/**
 * 存储 localStorage
 * params => {key,type} 键 类型 sessionStorage localStorage
 * obj => object 对象
 */
export const setStore = (params, obj) => {
    const { key, type } = params;
    if (typeof obj === 'object') {
        obj = JSON.stringify(obj);
    }
    if (type) {
        window.sessionStorage.setItem(key, obj);
    } else {
        window.localStorage.setItem(key, obj);
    }
}


/**
 * 获取 localStorage
 * params => {key,type} 键 类型 sessionStorage localStorage
 * 返回结果 object
 */

export const getStore = (params) => {
    try {
        const { key, type } = params;
        let result;
        if (type) {
            result = window.sessionStorage.getItem(key);
        } else {
            result = window.localStorage.getItem(key);
        }
        return JSON.parse(result)
    } catch (e) {
        console.log(e)
        return undefined
    }
}

/**
 * 删除localStorage
 */
export const removeStore = key => {
    window.localStorage.removeItem(key)
    window.sessionStorage.removeItem(key)
}
