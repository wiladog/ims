<style lang="sass" src="../../assets/styles/layouts/main.scss" ></style>
<template>
    <div class="layout">
        <div class="layout-header">
            <div class="layout-logo">
                <span>后台管理</span>
            </div>
            <div class="layout-nav">
                <Menu mode="horizontal" theme="light"  >
                    
                    <Menu-item name="1">
                        <Icon type="ios-paper"></Icon>
                        
                        <router-link to="/admin/add" >内容</router-link>
                    </Menu-item>
                    <Menu-item name="2">
                        <Icon type="ios-people"></Icon>
                        <router-link to="/admin/index" >用户</router-link>
                    </Menu-item>
                  
                    
                
                </Menu>
                <Menu mode="horizontal" theme="light"  >
                    <!-- <Menu-item name="1">
                        <router-link to="http://www.jixinghai.com/" >首页</router-link>
                    </Menu-item>
 -->                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="person"></Icon>
                            管理员
                        </template>
                        <Menu-item name="3-1">
                            <Icon type="android-exit"></Icon>
                            <router-link to="/login">退出</router-link>
                        </Menu-item>
                    </Submenu>
                    
                </Menu>
            </div>
        </div>
        <div class="layout-main">
            <div class="layout-left" :style="styleObject">
                <!-- <div class="layout-sider-nav" > -->
                <Menu theme="dark" width="200" @on-select="handleSelect" v-for="n in 20">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-paper"></Icon>
                        内容管理
                    </template>
                    <Menu-item name="/admin/news_categories">文章类别</Menu-item>
                    <Menu-item name="/admin/news">文章管理</Menu-item>
                    <!-- <Menu-item name="1-3">举报管理</Menu-item> -->
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-people"></Icon>
                        用户管理
                    </template>
                    <Menu-item name="2-1">新增用户</Menu-item>
                    <Menu-item name="2-2">活跃用户</Menu-item>
                </Submenu>
                
            </Menu>
                
                   <!-- </div>  -->
            </div>

            <div class="layout-right">
                <div >
                    <Tabnavigationbar :items="tabnavs"></Tabnavigationbar>
                </div>
                <!-- <Tabnavigationbar :items="tabnavs"></Tabnavigationbar> -->
                <div class="layout-content"  ref="contents">

                    <transition name="fade">
                        <router-view></router-view>
                    </transition>
                
                </div>
                <div class="layout-footer">
                    2017-2099 © wiladog
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Tabnavigationbar from '../tabnavbar.vue';
    export default {
        components:{
            // 'Sidenav': Sidenav,
            'Tabnavigationbar': Tabnavigationbar
        },
        computed:{
            styleObject: function () {
               return {
                    height: document.documentElement.clientHeight - 60 + 'px',
                    maxHeight: document.documentElement.clientHeight - 60 + 'px'
                }
            },
            siderStyle: function () {
                return {
                    display: ''
                }
            }
        },
        data () {
            return {
                tabnavs:[
                        {
                            name:'系统设置',
                            icon:'chatbubble',
                            class:'',
                        },
                        {
                            name:'权限设置',
                            icon:'monitor',
                            class:'',
                        },
                        {
                            name:'打印管理',
                            icon:'printer',
                            class:'',
                        }
                    ],
                
                contentStyle: {

                    marginLeft: '15px'
                }
            }
        },
        methods: {

            handleTabRemove (name) {
                this['tab' + name] = false;
            },
            handleSelect(name) {
                console.info(name);
                this.$router.push(name);
            }
        }
    }
</script>
