<style scoped>
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-ceiling{
        /*background: #464c5b;*/
        padding: 18px 0;
        overflow: hidden;
    }
    .layout-ceiling-main{
        float: right;
        margin-right: 15px;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
</style>
<template>
<div class="layout-header">
    <div class="layout-ceiling">
        <div class="layout-ceiling-main">
            <a href="#">注册登录</a> |
            <a href="#">帮助中心</a> |
            <a href="#">安全中心</a> |
            <Dropdown trigger="click" @on-click="handleClick" placement="bottom-end">
                <a href="javascript:void(0)">
                    <Icon type="person"></Icon>
                    {{ userInfo ? userInfo.username: '' }}
                    <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem name="profile">个人信息</DropdownItem>
                    <DropdownItem name="logout" divided><Icon type="log-out"></Icon> 退出</DropdownItem>
                </DropdownMenu>
        </Dropdown>
        </div>
    </div>
</div>
</template>

<script>
import Auth from '../../libs/auth';
export default {
    name: 'header',
    data () {
        return {
            userInfo: {},
            visible: false
        }
    },
    computed: {

    },
    created () {

    },
    mounted () {
        this.userInfo = Auth.get();
    },
    methods:{
        logout () {
            var $this = this
            this.$http.get(window.apiDomain + '/api/logout')
                .then((response) => {
                 let ret = response.body;
                 if(ret.code !== 1000){
                    this.$Message.error(ret.message);
                    return;
                 }
                 Auth.logout();
                 this.$Message.success({
                    content:ret.message,
                    onClose:function(){
                        $this.$router.push({ path: "/login" });
                    }
                 });

             }, response => {
                 console.log(response);
             });
        },
        handleClick (name) {
            console.log(name);
            if('logout' == name) {
                this.logout();
            }else if('profile' == name){
                this.$Modal.info({
                    title: '用户信息',
                    content: `
                        用户ID：${this.userInfo.id}<br>
                        用户名：${this.userInfo.username}<br>
                        邮箱：${this.userInfo.email}<br>
                        注册时间：${this.userInfo.created_at}
                    `
                })
            }
        },
        handleOpen () {
            this.visible = true;
        },
        handleClose () {
            this.visible = false;
        }
    }
}
</script>