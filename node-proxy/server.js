const express = require("express");
const app = express();
const proxy = require("http-proxy-middleware");
const cors = require("cors");
let apiproxy = [];
const defaultTarget = 'https://api.douban.com';
const apiList = [
    {
        path: '/v2/movie/in_theaters', // 正在热映
        target: defaultTarget
    },
    {
        path: '/v2/movie/coming_soon', // 即将上映
        target: defaultTarget
    },
    {
      path: '/v2/movie/top250', // top250
      target: defaultTarget
    },
    {
        path: '/v2/movie/weekly', // 口碑
        target: defaultTarget
    },
    {
        path: '/v2/movie/us_box', // 北美
        target: defaultTarget
    },
    {
        path: '/v2/movie/new_movies',// 新片
        target: defaultTarget
    },
    {
        path:  '/j/search_tags', // 查询标签
        target: 'https://movie.douban.com'
    },
    {
        path: '/v2/movie/search', // 电影查询
        target: defaultTarget
    }
]
const l=apiList.length;
for(let i=0;i<l;i++) {
    apiproxy.push(
        proxy(apiList[i].path, {
            target: apiList[i].target,
            changeOrigin: true
        })
    )
}

app.use(cors());
app.use((req, res, next) => {
    req.headers = {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, sdch, br",
        "accept-language": "zh-CN,zh;q=0.8",
        "cache-control": "no-cache",
        "connection": "keep-alive",
        "host": "localhost:5000",
        "origin": "http://localhost:8080",
        "pragma": "no-cache",
        "referer": "http://localhost:8080/",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"
    }
    next();
});
app.use((req, res, next) => {
    console.log(req.headers.referer);
    next();
})
app.use(apiproxy);
app.use('/v2/movie/subject/:id',proxy({target: defaultTarget, changeOrigin: true})); // 电影详情
app.use('/v2/movie/celebrity/:id',proxy({target: defaultTarget, changeOrigin: true})); // 影人详情
app.listen(5000, () => {
    console.log("开始监听 port on 5000")
});