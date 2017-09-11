<style  lang="sass" scoped>
.add-btn {
    background: #26B9CE;
    color: #fff;
    border-color: #26B9CE;
}
</style>
<template>
    <div >
        <Row style="margin-bottom: 10px;">
            <Col span="18" >
            &nbsp;
            </Col>
            <Col span="6" style="text-align: right;">
                <Button class="add-btn" @click="addMenu" >
                    <Icon type="plus-round"></Icon>&nbsp;增加
                </Button>
            </Col>
        </Row>
        <Table :columns="columns1" :data="data1"></Table>
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
                        title: '菜单名称',
                        key: 'name'
                    },
                    {
                        title: '上级菜单',
                        key: 'age'
                    },
                    {
                        title: '路径',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: '菜单管理',
                        age: '-',
                        address: '/menu/index'
                    },
                    {
                        name: '增加菜单',
                        age: '菜单管理',
                        address: '/menu/add'
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
            addMenu() {

            }
        }
    };
</script>