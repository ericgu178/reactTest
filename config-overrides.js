// build 静态文件去掉hash值，解决asset-require-hook资源问题
const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");
const { override } = require('customize-cra');

const addCustomize = () => config => {
    if (process.env.NODE_ENV === 'production') {
        // 关闭sourceMap
        config.devtool = false;
    }
    return config;
}
// 我的配置
const meCustom = () => config => {
    // 去掉hash值，解决asset-require-hook资源问题
    config.module.rules.forEach(d => {
        d.oneOf && d.oneOf.forEach(e => {
            if (e && e.options && e.options.name) {
                e.options.name = e.options.name.replace('[hash:8].', '');
            }
        });
    });

        // 去除版权信息 第三方的
    config.plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
    }));

    // config.optimization.splitChunks.cacheGroups = {
    //     default: {
    //         name: 'vender',
    //         chunks: 'all',
    //         // minChunks: 2  //模块被引用2次以上的才抽离
    //     }
    // };

    config.externals = {
        react: 'React',
        'react-dom': 'ReactDOM',
        antd:'antd'
    }

    config.plugins.push(new CompressionPlugin({
        filename: '[path].gz[query]', // 目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
        algorithm: 'gzip', // 算法       
        test: new RegExp('\\.(js|css)$'), // 压缩 js 与 css
        threshold: 10240, // 只处理比这个值大的资源。按字节计算
        minRatio: 0.8 // 只有压缩率比这个值小的资源才会被处理
    }));

    return config;
}


module.exports = {
    webpack: override(addCustomize(),meCustom())
};