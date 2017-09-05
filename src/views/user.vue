<style  lang="sass" scoped>
   .index {
       }
</style>
<template>
    <div class="user">

        <Row >
            <Col span="18" >
            <Form :model="formSearch" :label-width="80" inline label-position="right">
                <Form-item label="文章名称：">
                    <Input v-model="formSearch.title" placeholder="请输入标题"></Input>
                </Form-item>
                <Form-item label="文章分类：">
                    <Select v-model="formSearch.article_categories_id" placeholder="请选择" style="width:90px">
                        <Option value="">请选择</Option>
                        <Option v-for="item in categories" :value="item.id" :key="item.value">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item :label-width="1">
                    <Button type="primary" @click="search" icon="ios-search">搜索</Button>
                </Form-item>
                
            </Form>
            </Col>
            <Col span="6" style="text-align: right;">
                <Button type="primary" @click="add" >
                    <Icon type="plus-round"></Icon>&nbsp;增加
                </Button>
            </Col>
        </Row>
        <Table :columns="columns1" :data="data1"></Table>

        <div style="float: right;margin-top: 10px;">
            <Page :total="total" ref="pager"  show-elevator show-total @on-change="changePage"></Page>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                formSearch:{
                    title:'',
                    article_categories_id:''
                },
                total:100,
                columns1: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居'
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道'
                    }
                ],
 
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
        methods: {
        }
    };
</script>