<style lang="sass" src="../../assets/styles/layouts/main.scss" ></style>
<template>
    <div class="layout">
        <div class="layout-header">
            <div class="layout-logo">
                <span>档案管理系统</span>
            </div>
            <div class="layout-nav">
            <!-- style="background: #26B9CE;" -->
                <Menu mode="horizontal" theme="light"  >
                    &nbsp;
                    <!-- <Menu-item name="1">
                        <Icon type="ios-paper"></Icon>
                        
                        <router-link to="/admin/add" >内容</router-link>
                    </Menu-item>
                    <Menu-item name="2">
                        <Icon type="ios-people"></Icon>
                        <router-link to="/admin/index" >用户</router-link>
                    </Menu-item> -->
                  
                    
                
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
                <Sidenav :items="gtRoutes"></Sidenav>
            </div>

            <div class="layout-right">
                <!-- <div ></div> -->
                    <Tabnavigationbar :items="tabnavs" :breadcrumbs="breadcrumbs"></Tabnavigationbar>
                
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
import Sidenav from '../sidenav.vue';
import { mapGetters, mapActions } from 'vuex'
    export default {
        created(){
            
            // console.info('----debug-------');
            // console.info(this.gtRoutes);
        },
        mounted() {
            this.$nextTick(function(){
                const _self = this;
                window.onresize = function () {
                    _self.clientHeight = document.documentElement.clientHeight - 60;
                }
            });
            
        },
        
        components:{
            'Sidenav': Sidenav,
            'Tabnavigationbar': Tabnavigationbar
        },


        computed:{
            styleObject: function () {
               return {
                    height: this.clientHeight + 'px',
                    maxHeight: this.clientHeight + 'px'
                }
            },
            siderStyle: function () {
                return {
                    display: ''
                }
            },
            ...mapGetters({
                addRoutes:'addRoutes',
                gtRoutes:'gtRoutes'
            })
        },
        data () {
            return {
                breadcrumbs:[{
                    type:'ios-home-outline',
                    name:'首页',
                    path: '/dashboard'
                },{
                    type:'monitor',
                    name:'菜单管理',
                    path: '/menu'
                }],
                clientHeight: document.documentElement.clientHeight - 60,
                tabnavs:[
                        
                    ],
                
                contentStyle: {

                    marginLeft: '15px'
                }
            }
        },
        methods: {
            handleResize() {
                console.info('aaaaa');
            },
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
