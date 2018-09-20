/**Created by xiaoqi on 2018/9/20*/

let Koa = require('koa');
let router = require('koa-router')(); /**引入并实例化*/
let views = require('koa-views');
let commit = require('./model/commit');
let bodyParser = require('koa-bodyparser');
let static = require('koa-static');/**静态web服务*/
let app = new Koa();

/**配置ejs模板引擎*/
app.use(views(
    'views',
    {
        extension : 'ejs'
    }
));

/**配置bodyparse中间件*/
app.use(bodyParser());

/**配置静态web服务*/
app.use(static('static'));

router.get('/',async (ctx)=>{
    //console.log(ctx);
    await ctx.render('index');
});

// router.post('/doPost',async (ctx)=>{
//     let result = await commit.getPostData(ctx);
//     ctx.body = result;
// });
//接收post提交的数据
router.post('/doPost',async (ctx)=>{

    //原生nodejs 在koa中获取表单提交的数据
   // var data=await commit.getPostData(ctx);

    ctx.body=ctx.request.body;
})



app.use(router.routes()); /**启动路由*/
app.use(router.allowedMethods());/**推荐写法 */

app.listen(8000,()=>{
    console.log('http://localhost:8000');
});