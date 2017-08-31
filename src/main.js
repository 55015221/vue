import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource'
import Routers from './router';
import Util from './libs/util';
import Auth from './libs/auth';
import App from './app.vue';
import 'iview/dist/styles/iview.css';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(iView);

//开启debug模式
Vue.config.debug = true
//关闭生产模式下给出的提示
Vue.config.productionTip = false
window.apiDomain = 'http://laravel.me';


// 路由配置
const RouterConfig = {
    mode: 'history',
    // mode: 'hash',
    base: __dirname, //获取当前路径下的完整路径
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    if(to.path !== "/login" && !Auth.loggedIn()){
      next({ path: 'login' });
      return;
    }

    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});


//全局设置 HTTP相关
// Vue.http.options.crossOrigin = true;
// Vue.http.options.emulateHTTP = true;
// Vue.http.options.emulateJSON = true;
Vue.http.interceptors.push(function(request, next) {
    //
    // modify method
    // request.method = 'POST';
    request.emulateJSON = true;

    var token = Auth.getToken();
    // modify headers
    request.headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    request.headers.set('X-CSRF-TOKEN', 'TOKEN');
    request.headers.set('Authorization', 'Bearer ' + token);
    // continue to next interceptor
    next(function(response) {

        // modify response
        if(4001 === response.body.code){
            Auth.logout()
            this.$Modal.confirm({
                title: '提醒',
                content: response.body.message,
                onOk: function () {
                    router.push({ path: "/login" });
                }
            });
            return;
        }
    });
});



new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});


