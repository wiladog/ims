<style lang="sass" src="../../assets/styles/layouts/main.scss" ></style>


<template>
    <div class="layout">
        
        <div class="layout-header">
            <div class="layout-header-sl">
                档案管理系统
            </div>
            <div class="layout-header-mr">
                <Menu mode="horizontal" theme="light"  >
                    &nbsp;
                    <Menu-item name="1">
                        <Icon type="ios-paper"></Icon>
                        
                        <router-link to="/admin/add" >内容</router-link>
                    </Menu-item>
                    <Menu-item name="2">
                        <Icon type="ios-people"></Icon>
                        <router-link to="/admin/index" >用户</router-link>
                    </Menu-item>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="chatbubble-working"></Icon>
                            微信
                        </template>
                        
                            <Menu-item name="3-1">新增和启动</Menu-item>
                            
                        
                    </Submenu>
                    
                </Menu>
                <Menu mode="horizontal" theme="light"  >
                    <Menu-item name="1">
                        <router-link to="http://www.jixinghai.com/" >首页</router-link>
                    </Menu-item>
                    
 
                        <Submenu name="3">
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

        
        <div class="layout-middle">

            <div class="layout-sider" :style="siderStyle">
          
            <div class="layout-sider-nav" :style="styleObject">
                <Sidenav></Sidenav>
            </div>
               
            </div>
            
            <div class="layout-content">
                <!-- :items="tabnavs" -->
             <Tabnavigationbar :items="tabnavs" ></Tabnavigationbar>

             <div class="layout-content-main">
                 <router-view></router-view>
             </div>
                
            


              
        </div>
        </div>
        
       
        <div class="layout-footer">
            <div class="layout-footer-sl">
                <Icon type="ios-arrow-back" size="18"  @click.native="toggleSiderbar"></Icon>
            </div>
            <div class="layout-footer-mr">
                wiladog
            </div>
        </div>
       
    </div>
</template>
<script>
import Tabnavigationbar from '../tabnavbar.vue';
import Sidenav from '../sidenav.vue';
    export default {
        beforeCreate(){
            // console.log(this);
        },
        components:{
            'Sidenav': Sidenav,
            'Tabnavigationbar': Tabnavigationbar
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
                    ]
                
            }
        },
        computed:{
            styleObject: function () {
               return {
                    height: document.documentElement.clientHeight - 104 + 'px',
                    display:''
                }
            },
            siderStyle: function () {
                return {
                    display: ''
                }
            }
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            toggleSiderbar() {
                console.info(this.siderStyle.display);
                if(this.siderStyle.display != 'none') {
                    // alert(1);
                    this.siderStyle.display = 'none';
                }
                
                console.info(this.siderStyle);
            }
        }
    };
</script>