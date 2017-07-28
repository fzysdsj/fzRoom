# fzRoom 项目记录(进行中)
## 技术栈
    - 语言:node.js  8.1.3
    - 框架：express  4
    - 数据库:MySql  5+
    - 模板引擎: EJS
    - 包管理: bower(前) npm(后)
## 中间件
    - cookie-parse 
    - bodyPaser
    - connect-session
    - express-session
    - formidable
    - express-mysql-session
    - morgan
    - serve-favicon
## 项目结构初步完善
    ├── bin	        程序启动相关(express初始化自动生成)
    ├── config      配置相关(数据库信息和路由)
    ├──controllers  控制相关  
    ├── views        视图文件目录
    │   └── pages 
    ├──models  模型相关(数据库具体操作)
    │     
    ├── public        静态文件目录
    │   ├── assets 后台模板静态文件目录(时间紧，全上了)
    │   ├── css       
    │   ├──audio      音频视频目录
    │   ├── fonts     bootstrap字体图标目录
    │   ├── images   图片目录          
    │   ├── js    前台业务逻辑实现
    │   ├──libs   前端库
    │   ├──bulid          
    │   └── uploads    上传图片存储目录
    ├──.gitignore     git管理忽略项       
    ├── app.js        项目入口文件
    ├──gruntfile.js   grunt配置文件
    ├── bower.json    bower安装模块依赖项     
    ├── package.json  npm安装模块依赖项
    └── README.md     解释文档  

## 目前实现功能(2017.7.20-至今)
 - 注册
 - 登录
 - 注册登录的前后端表单验证
 - 登出
 - 登录持久化
 - 用户信息的增删改查(包括头像上传及头像修改)
 - 主页面设计
 - 前台风格设计    
 - 后台添加模板

## 部分页面
 - 主页
    !['主页'](/public/images/index.png)
 - 其他的就不放了，因为还没做完。项目框架写出来以后，接下来是软件工程的流程了，要再开始着手做，得小十天呢，毕竟需求和设计不是边敲代码，就能想出来的。为什么要做这个网站呢，起初是想着用cocos creator把自己的小说做成一个RPG游戏，那样的话，自己的大学也算完美了吧。不过玩了一个月，感觉功能还是有点太少，坑还是太多，很多时候无从下手。由担心着毕业问题，果断转了人人都做的网站。话没说完，且到此处。

