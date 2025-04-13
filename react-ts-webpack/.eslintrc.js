module.exports = {
    parser: '@typescript-eslint/parser', // 使用 TypeScript 解析器
    extends: [
        'eslint:recommended', // 使用 ESLint 推荐规则
        'plugin:@typescript-eslint/recommended', // 使用 TypeScript 推荐规则
        'plugin:react/recommended', // 使用 React 推荐规则
        'plugin:react-hooks/recommended', // 使用 React Hooks 推荐规则
    ],
    parserOptions: {
        ecmaVersion: 2020, // 使用最新的 ECMAScript 版本
        sourceType: 'module', // 使用 ES 模块
        ecmaFeatures: {
            jsx: true, // 允许解析 JSX
        },
    },
    rules: {
        // 自定义规则
        'react/prop-types': 'off', // 禁用 prop-types 检查，因为 TypeScript 已经提供了类型检查
        '@typescript-eslint/explicit-module-boundary-types': 'off', // 允许不显式定义函数返回类型
        'react/react-in-jsx-scope': 'off', // React 17+ 不需要在每个文件中显式引入 React
        '@typescript-eslint/no-explicit-any': 'off', // 禁用 no-explicit-any 规则
        'react-hooks/exhaustive-deps': 'off', // 禁用 exhaustive-deps 规则
        
    },
    settings: {
        react: {
            version: 'detect', // 自动检测 React 版本
        },
    },
    env: {
        browser: true, // 允许浏览器全局变量
        node: true, // 允许 Node.js 全局变量
        es6: true, // 允许 ES6 语法
    },
};