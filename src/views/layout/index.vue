<style scoped>
    @import '../../styles/common.css';
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-menu-left{
        /*background: #464c5b;*/
    }
    .layout-content-main{
        padding: 10px;
    }

    .layout-logo-left{
        width: 90%;
        height: 30px;
        /*background: #5b6270;*/
        background: #fff;
        border-radius: 3px;
        margin: 15px auto;
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
      opacity: 0
    }
    .router-fade-enter-active, .router-fade-leave-active {
          transition: opacity .3s;
    }
    .router-fade-enter, .router-fade-leave-active {
          opacity: 0;
    }
</style>
<template>
    <div class="layout">
        <Row type="flex">
              <i-col span="4" class="layout-menu-left">
                  <!-- app logo -->
                  <div class="layout-logo-left"></div>
                  <!-- 左侧菜单栏 -->
                  <app-sidebar></app-sidebar>
              </i-col>
              <i-col span="20">
                  <!-- 头部菜单栏 -->
                  <app-header></app-header>
                  <div class="layout-breadcrumb">
                      <Breadcrumb>
                          <Breadcrumb-item href="/">首页</Breadcrumb-item>
                          <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
                          <Breadcrumb-item>某应用</Breadcrumb-item>
                      </Breadcrumb>
                  </div>
                  <div class="layout-content">
                      <!-- 内容主体 -->
                      <div class="layout-content-main" v-if="show">
                          <transition name="fade" mode="out-in">
                              <router-view></router-view>
                          </transition>
                      </div>
                  </div>
                  <!-- 底部信息 -->
                  <app-footer></app-footer>
              </i-col>
        </Row>
    </div>
</template>

<script>
    import Sidebar from './sidebar.vue'
    import Header from './header.vue'
    import Footer from './footer.vue'
    export default {
        name: 'layout',
        components: {
            "app-header": Header,
            "app-sidebar": Sidebar,
            "app-footer": Footer
        },
        //beforeRouteUpdate (to, from, next) {
            //this.$nextTick(() => {
            //    this.$refs.sidebar.update(to)
            //})
            //next()
        //},
        data () {
            return {
                show: true
            }
        },
        computed: {
        },
        created () {

        },
        mounted () {

        },
        methods:{
        }
    }
</script>