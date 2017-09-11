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

.add-btn {
    background: #26B9CE;
    color: #fff;
    border-color: #26B9CE;
}

.tabone {
    a {
        text-align: center; margin-right: 10px;color: #7A7A7A;width: 100px;padding: 4px 0;display: inline-block;background: #E6E6E6;border-radius: 2.94px 2.94px 0 0;-webkit-border-radius: 2.94px 2.94px 0 0;-moz-border-radius: 2.94px 2.94px 0 0;
        
    }

    .active {
            background: #26B9CE;color: #fff;
    }
    
}
.taboneword1{font-size:14px;}
.taboneword2{font-size:12px;}

</style>
<template>
    <div >
        <Row style="margin-bottom: 10px;">
            <Col span="18" >
            <div class="tabone">
                     <a class="active" href="">
                         <p class="taboneword1">5151</p>
                         <p class="taboneword2">影像档案</p>
                     </a>      
                     <a href="">
                        <p>5151</p>
                        <p>纸质档案</p>
                     </a>                   
                </div>
           
            </Col>
            <Col span="6" style="text-align: right;">
                <Button class="add-btn" @click="addBusiness" >
                    <Icon type="plus-round"></Icon>&nbsp;添加档案
                </Button>
            </Col>
        </Row>

        <div>
            <Form ref="formInline" :model="formInline"  inline>
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
                <Table :columns="columns" :data="record" ></Table>
            </Col>
        </Row>

        <!-- <Table :columns="columns" :data="record"></Table> -->
        
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
    export default {
        created() {
            this.$store.dispatch('getRecord',{});
        },
        computed: {
            ...mapGetters({
                record:'record',
            })
        },
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
                columns: [
                    {
                        title: '档案编号',
                        key: 'profile_number',
                        // fixed:'left'
                        fixed: 'left'
                    },
                    {
                        title: '业务编号',
                        key: 'number'
                    },
                    {
                        title: '借款人姓名',
                        key: 'customer_name'
                    },
                    {
                        title: '身份证号',
                        key: 'customer_id_number',
                        width:160
                    },
                    
                    {
                        title: '借款金额',
                        key: 'borrowing_amount'
                    },
                    {
                        title: '产品类型',
                        key: 'address4'
                    },
                    {
                        title: '借款日期',
                        key: 'borrowing_date'
                    },
                    {
                        title: '借款期限',
                        key: 'borrowing_time'
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
                    
                    {
                        title: '操作',
                        key: 'acs',
                        width: 150,
                        fixed: 'right',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
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
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '补充资料')
                            
                            ]);
                        }
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
            addBusiness() {
                this.$router.push({path:'/stock/add'});
            },
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