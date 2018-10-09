/**Created by xiaoqi on 2018/9/20*/

let Koa    = require('koa'),
    router = require('koa-router')(),                  /**引入并实例化*/
    views  = require('koa-views'),
      path = require('path'),
    render = require('koa-art-template'),
bodyParser = require('koa-bodyparser'),
    static = require('koa-static'),
    DB     = require('./model/db.js');                 /**封装的数据库*/

let app = new Koa();
app.use(views(                                          /**配置ejs模板引擎*/
    'views',
    {
        extension: 'html'
    }
));
app.use(bodyParser());                                  /**配置bodyparse中间件*/
app.use(static('static'));                              /**配置静态web服务*/
render(app, {                                           /**配置art-template模板*/
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});

router.get('/', async (ctx) => {                        /**首页*/
    let list = await DB.find('test',{});                /**查询数据库*/
    //console.log(list);
    await ctx.render('index',{
        list:list
    });
});

router.post('/doAdd',async (ctx)=>{
    let result = ctx.request.body;
    let data = await DB.insert('test',result);
    //console.log(data.result.ok);
    if(data.result.ok){
        await ctx.redirect('/');
    }else{
        await ctx.redirect('/add');
    }
});

//接收post提交的数据
router.post('/doPost', async (ctx) => {

    //原生nodejs 在koa中获取表单提交的数据
    // var data=await commit.getPostData(ctx);

    ctx.body = ctx.request.body;
});

router.get('/add', async (ctx) => {

    await ctx.render('add');
});


app.use(router.routes());
/**启动路由*/
app.use(router.allowedMethods());
/**推荐写法 */

app.listen(8000, () => {
    console.log('http://localhost:8000');
});