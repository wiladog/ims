<style  lang="sass" scoped>
.c-btn {
    color: #fff;
    background-color: #26B9CE;
    border-color: #26B9CE;
}
.b-btn {
    
    color: #7C7C7C;
    background-color: #E6E6E6;
    border-color: #E6E6E6;
}
</style>
<template>
    <div >
        <div>
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="输入检索信息">
                
            </Input>
        </FormItem>
        <FormItem>
        <!-- #26B9CE -->
            <Button type="success" class="c-btn" @click="handleSubmit('formInline')">搜索</Button>
        </FormItem>
        <FormItem >
            <Select  placeholder="数据来源">
                <Option value="beijing">北京市</Option>
                <Option value="shanghai">上海市</Option>
                <Option value="shenzhen">深圳市</Option>
            </Select>
        </FormItem>
        <FormItem >
            <Select  placeholder="区域">
                <Option value="beijing">北京市</Option>
                <Option value="shanghai">上海市</Option>
                <Option value="shenzhen">深圳市</Option>
            </Select>
        </FormItem>
        <FormItem >
            <Select  placeholder="产品类型">
                <Option value="beijing">北京市</Option>
                <Option value="shanghai">上海市</Option>
                <Option value="shenzhen">深圳市</Option>
            </Select>
        </FormItem>
        <FormItem >
            <Select  placeholder="档案状态">
                <Option value="beijing">北京市</Option>
                <Option value="shanghai">上海市</Option>
                <Option value="shenzhen">深圳市</Option>
            </Select>
        </FormItem>
        <FormItem >
            <Select  placeholder="借款状态">
                <Option value="beijing">北京市</Option>
                <Option value="shanghai">上海市</Option>
                <Option value="shenzhen">深圳市</Option>
            </Select>
        </FormItem>
            </Form>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        
        <FormItem>
            <Button type="success" class="b-btn" @click="handleSubmit('formInline')">提交日期</Button>
        </FormItem>
        <FormItem >
            <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 180px"></DatePicker>
        </FormItem>

        <FormItem>
            <Button type="success" class="b-btn" >分配日期</Button>
        </FormItem>
        <FormItem >
            <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 180px"></DatePicker>
        </FormItem>

        <FormItem>
            <Button type="success" class="b-btn" >审核通过日期</Button>
        </FormItem>
        <FormItem >
            <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 180px"></DatePicker>
        </FormItem>

        <FormItem>
            <Button type="success" class="b-btn" >归档日期</Button>
        </FormItem>
        <FormItem >
            <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 180px"></DatePicker>
        </FormItem>



        
        
    </Form>
        </div>
        <Row>
            <Col>
                <Table :columns="columns1" :data="data1"></Table>
            </Col>
        </Row>
        
    </div>
</template>
<script>
    export default {
        
        data() {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                },
                formSearch:{
                    title:'',
                    article_categories_id:''
                },
                
                total:100,
                columns1: [
                    {
                        title: '档案编号',
                        key: 'name',
                        // fixed:'left'
                        fixed: 'left'
                    },
                    {
                        title: '业务编号',
                        key: 'number'
                    },
                    {
                        title: '借款人姓名',
                        key: 'address1'
                    },
                    {
                        title: '身份证号',
                        key: 'address2'
                    },
                    {
                        title: '借款金额',
                        key: 'address3'
                    },
                    {
                        title: '产品类型',
                        key: 'address4'
                    },
                    {
                        title: '借款日期',
                        key: 'address5'
                    },
                    {
                        title: '借款期限',
                        key: 'address6'
                    },
                    {
                        title: '档案状态',
                        key: 'address7'
                    },
                    {
                        title: '提交日期',
                        key: 'date8'
                    },
                    {
                        title: '分配日期',
                        key: 'date9'
                    },
                    {
                        title: '审核通过日期',
                        key: 'date10'
                    },
                    {
                        title: '归档日期',
                        key: 'date11',
                        // fixed: 'right',
                    },
                    // {
                    //     title: '操作',
                    //     key: 'action',
                    //     fixed: 'right',
                    //     width: 120,
                    //     render: (h, params) => {
                    //         return h('div', [
                    //             h('Button', {
                    //                 props: {
                    //                     type: 'text',
                    //                     size: 'small'
                    //                 }
                    //             }, '查看'),
                    //             h('Button', {
                    //                 props: {
                    //                     type: 'text',
                    //                     size: 'small'
                    //                 }
                    //             }, '编辑')
                    //         ]);
                    //     }
                    // }
                    {
                        title: '操作',
                        key: 'acs',
                        // width:'300',
                        fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '查看')
                            
                            ]);
                        }
                    }
                ],
                data1: [
                    {
                        name: 'FD201707081251',
                        number: 'FD20170',
                        address1: '待审核',
                        address2: '待审核',
                        address3: '待审核',
                        address4: '待审核',
                        address5: '待审核',
                        address6: '待审核',
                        address7: '待审核',
                        date8:'2018-09-12 12:23',
                        date9:'2018-09-12 12:23',
                        date10:'2018-09-12 12:23',
                        date11:'2018-09-12 12:23',
                    },
                   
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
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
    };
</script>