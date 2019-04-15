//应用程序的启动入口文件
var express = require('express');

var swig =require('swig');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var cookies = require('cookies');

var app = express();

var User = require('./models/User');

//设置静态文件托管
//当用户访问url以/public开始，那么直接返回对应__dirname+'/public'下的文件
app.use('/public',express.static(__dirname+'/public'));

app.engine('html',swig.renderFile);

// 使用ejs模版引擎
app.set('views', './views'); 
app.set('view engine', 'html'); // 设置模板引擎
//再开发过程中，需要取消模板缓存
swig.setDefaults({cache:false});

app.use( bodyParser.urlencoded({extended:true}) );
//设置cookie
app.use(function(req,res,next){
  req.cookies = new cookies(req,res);
  //解析用户的登陆信息
  req.userInfo = {};
  if(req.cookies.get('userInfo')){
    try{
      req.userInfo = JSON.parse(req.cookies.get('userInfo'));

        User.findById(req.userInfo._id).then(function(userInfo){
          req.userInfo.isAdmin =Boolean(userInfo.isAdmin); 
          next();
        })
    }catch(e){
      next();
    }
  }else{
    next(); 
  }
  
})

/* 
*根据不同的功能划分模块
*/
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));
 

 
mongoose.connect('mongodb://localhost:27017/blog',function (err) {
    if(err){
        console.log('数据库链接失败')
    }else{
        console.log('数据库链接成功')
        app.listen(8081);
    }
  });
 

 



