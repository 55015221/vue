export default {
    name: 'auth',

    /**
     * 获取 auth，返回：管理员信息和 token
     * @return {Object}
     */
    get () {
        return JSON.parse(window.localStorage.getItem('userInfo'));
    },

    /**
     * 登录
     * @param {string} token 登录 token
     * @param {Object} user 登录用户信息
     */
    login (token, user) {
        window.localStorage.setItem('token',token);
        window.localStorage.setItem('userInfo',JSON.stringify(user));
    },

    /**
     * 登出
     * @return
     */
    logout () {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("userInfo");
    },

    /**
     * 获取token
     */
    getToken () {
        return window.localStorage.getItem('token');
    },

    /**
     * 是否已登录
     * @return {boolean}
     */
    loggedIn () {
        return !!window.localStorage.getItem('token') && !!window.localStorage.getItem('userInfo')
    }
}


