<style lang="sass" src="../../assets/styles/layouts/main.scss" scoped></style>


<template>
    <div class="layout">
        
        <div class="layout-header">
            Header

        </div>

        
        <div class="layout-middle">

            <div class="layout-sider">
          
            <div class="layout-sider-nav" :style="styleObject">
                
            
                <Menu theme="dark" width="auto" v-for="n in 20">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-paper"></Icon>
                        内容管理
                    </template>
                    <Menu-item name="1-1">文章管理</Menu-item>
                    <Menu-item name="1-2">评论管理</Menu-item>
                    <Menu-item name="1-3">举报管理</Menu-item>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-people"></Icon>
                        用户管理
                    </template>
                    <Menu-item name="2-1">新增用户</Menu-item>
                    <Menu-item name="2-2">活跃用户</Menu-item>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="stats-bars"></Icon>
                        统计分析
                    </template>
                    <Menu-group title="使用">
                        <Menu-item name="3-1">新增和启动</Menu-item>
                        <Menu-item name="3-2">活跃分析</Menu-item>
                        <Menu-item name="3-3">时段分析</Menu-item>
                    </Menu-group>
                    <Menu-group title="留存">
                        <Menu-item name="3-4">用户留存</Menu-item>
                        <Menu-item name="3-5">流失用户</Menu-item>
                    </Menu-group>
                </Submenu>

            </Menu>
             
            </div>
               
            </div>
            
            <div class="layout-content">

             <div class="layout-content-tabnavbar">
                    <Tabs type="card" >
                        <Tab-pane label="macOS" icon="social-apple"></Tab-pane>
                        <Tab-pane label="Windows" icon="social-windows"></Tab-pane>
                        <Tab-pane label="Linux" icon="social-tux"></Tab-pane>
                    </Tabs>
            </div>
                
            <Card :bordered="false" dis-hover >
                        <div slot="title" >
                                                        <Breadcrumb>
                                <Breadcrumb-item href="/">
                                    <Icon type="ios-home-outline"></Icon> Home
                                </Breadcrumb-item>
                                <Breadcrumb-item href="/components/breadcrumb">
                                    <Icon type="social-buffer-outline"></Icon> Components
                                </Breadcrumb-item>
                                <Breadcrumb-item>
                                    <Icon type="pound"></Icon> Breadcrumb
                                </Breadcrumb-item>
                            </Breadcrumb>

                            <!-- <Alert>消息提示文案</Alert> -->
                        </div>

                        <Form :model="formItem" :label-width="80">
        <Form-item label="输入框">
            <Input v-model="formItem.input" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="选择器">
            <Select v-model="formItem.select" placeholder="请选择">
                <Option value="beijing">北京市</Option>
                <Option value="shanghai">上海市</Option>
                <Option value="shenzhen">深圳市</Option>
            </Select>
        </Form-item>
        <Form-item label="日期控件">
            <Row>
                <Col span="11">
                    <Date-picker type="date" placeholder="选择日期" v-model="formItem.date"></Date-picker>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                    <Time-picker type="time" placeholder="选择时间" v-model="formItem.time"></Time-picker>
                </Col>
            </Row>
        </Form-item>
        <Form-item label="单选框">
            <Radio-group v-model="formItem.radio">
                <Radio label="male">男</Radio>
                <Radio label="female">女</Radio>
            </Radio-group>
        </Form-item>
        <Form-item label="多选框">
            <Checkbox-group v-model="formItem.checkbox">
                <Checkbox label="吃饭"></Checkbox>
                <Checkbox label="睡觉"></Checkbox>
                <Checkbox label="跑步"></Checkbox>
                <Checkbox label="看电影"></Checkbox>
            </Checkbox-group>
        </Form-item>
       
        <Form-item>
            <Button type="primary">提交</Button>
            <Button type="ghost" style="margin-left: 8px">取消</Button>
        </Form-item>
    </Form>
                        <p v-for="n in 20">无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充。无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无充无边框内容填充无边框内容填充。无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充。</p>

                    </Card>


                <!-- 


                <div class="layout-content-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="/">
                            <Icon type="ios-home-outline"></Icon> Home
                        </Breadcrumb-item>
                        <Breadcrumb-item href="/components/breadcrumb">
                            <Icon type="social-buffer-outline"></Icon> Components
                        </Breadcrumb-item>
                        <Breadcrumb-item>
                            <Icon type="pound"></Icon> Breadcrumb
                        </Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="layout-content-main">
                
                    <Card :bordered="true" dis-hover>
                        <p slot="title">无边框标题</p>
                        <p>无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充。</p>
                    </Card>
                </div>
 -->            </div>
        </div>
        
       
        <div class="layout-footer">Footer</div>
       
    </div>
</template>
<script>
    export default {
        beforeCreate(){
            // console.log(this);
        },
        data () {
            return {
                formItem: {
                    input: '',
                    select: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    textarea: '',
                    
                    siderNavHeight: document.documentElement.clientHeight - 104
                }
            }
        },
        computed:{
            styleObject: function () {
               return {
                    height: document.documentElement.clientHeight - 104 + 'px'
                }
               //  
               // return {
               //      'height': '200px'
               // }
            }
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {

        }
    };
</script>