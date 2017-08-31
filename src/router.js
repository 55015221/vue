import layout from './views/layout'


const routers = [

    {
        path: '/', meta: { title: '首页' }, component: layout,  children:
        [
            { path: '/welcome', meta: { title: '欢迎页面' }, component: (resolve) => require(['./views/welcome.vue'], resolve), alias: '/' },
            { path: '/access', meta: { title: '访问记录' }, component: (resolve) => require(['./views/access.vue'], resolve) },
            { path: '/users', meta: { title: '用户列表' }, component: (resolve) => require(['./views/users.vue'], resolve) },
            { path: '/profile', meta: { title: '用户信息' }, component: (resolve) => require(['./views/users/profile.vue'], resolve) },
        ]
    },


    { path: '/login', meta: { title: '用户登录' }, component: (resolve) => require(['./views/login.vue'], resolve) },

];




export default routers;