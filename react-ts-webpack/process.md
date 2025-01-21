### 初始化package.json文件
npm init  

### 引入react
npm install react react-dom
### 声明依赖
npm install @types/react @types/react-dom -D

### 引入typescript
npm install typescript -D

npm install babel-loader ts-node @babel/core @babel/preset-react @babel/preset-typescript @babel/preset-env core-js -D

### 引入webpack
npm install webpack webpack-cli -D

npm install @types/node -D

### loader
npm install style-loader css-loader -D

### plugin
npm install webpack-dev-server html-webpack-plugin webpack-merge -D

#### copy 静态资源
npm install copy-webpack-plugin -D

### corss-env + DefinePlugin
> cross-env：运行跨平台设置和使用环境变量的脚本，兼容各系统的设置环境变量的包
>
> webpack.DefinePlugin：webpack内置的插件,可以为业务代码注入环境变量
