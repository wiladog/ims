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


.vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal{
        top: 0;
    }
}

</style>
<template>
    <div >
        <Row style="margin-bottom: 10px;">
            <Col span="18" >
            <div class="tabone">
                     <a class="active" href="">
                         <p class="taboneword1">{{ recordTotal }}</p>
                         <p class="taboneword2">影像档案 </p>
                     </a>      
                     <router-link to="/stock/paper/0">
                        <p>1</p>
                        <p>纸质档案</p>
                     </router-link>                    
                </div>
           
            </Col>
            <Col span="6" style="text-align: right;">
                <Button class="add-btn" @click="addBusiness" >
                    <Icon type="plus-round"></Icon>&nbsp;添加档案
                </Button>
            </Col>
        </Row>

        <div > <!-- style="background: #fff;" -->
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
                <Option value="beijing">录入</Option>
                <Option value="shanghai">导入</Option>
            </Select>
        </FormItem>
        <FormItem >
            <Select  placeholder="区域">
                <Option value="beijing">成都</Option>
                <Option value="shanghai">高新区</Option>
                <Option value="shenzhen">深圳市</Option>
            </Select>
        </FormItem>
        <FormItem >
            <Select  placeholder="产品类型" style="width:100px">
                <Option value="">请选择</Option>
                <Option v-for="item in product" :value="item.id" :key="item.value">{{ item.name }}</Option>
            </Select>
        </FormItem>

                <FormItem >
            <Select  placeholder="结清状态" style="width:100px">
                <Option value="">请选择</Option>
                <Option value="10">待分配</Option>
                <Option value="20">已分配</Option>
                <Option value="30">已审核</Option>
                <Option value="40">已归档</Option>
                <Option value="-10">审核未通过</Option>
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

                <div style="margin-top: 5px;float: right;">
                    <Page :total="recordTotal" @on-change="chagePage" show-total></Page>
                </div>
            </Col>
        </Row>

        <Modal
        title="分配审核员"
        v-model="allocation"
        ok-text="分配"
        @on-ok="allocationsOk"
        class-name="vertical-center-modal">
        
            <Select  placeholder="组别">
                <Option value="beijing">审核组一</Option>
                <Option value="shanghai">审核组二</Option>
                <Option value="shenzhen">审核组三</Option>
            </Select>
            <div style="height: 10px;"></div>
            <Select  placeholder="审核员" v-model="allocationData.manager_id">
                <Option :value="usr.id" v-for="usr in user" :key="usr.id">{{ usr.name }}</Option>
            </Select>
    </Modal>

        <!-- <Table :columns="columns" :data="record"></Table> -->
        
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
    export default {
        created() {
            this.$store.dispatch('getRecord',{type:'image'});
            this.$store.dispatch('getProduct');
            this.$store.dispatch('getUsers');
        },
        computed: {
            ...mapGetters({
                record:'record',
                product: 'product',
                user:'user',
                recordTotal:'recordTotal',
            })
        },
        methods: {
            chagePage(page) {
                // console.info(page);
                this.$store.dispatch('getRecord',{type:'image',page:page});
            },
            allocations(id) {
                // console.info(this.allocation);
                this.allocation = true;
                this.allocationData.id = id;
            },
            allocationsOk() {
                // console.info(this.allocationData);
                this.$store.dispatch('allocation',this.allocationData).then(()=>{
                    this.$Message.success('分配成功!');
                    setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                });
            },
            getProductType(proId) {
                for(let i=0;i<this.product.length;i++) {
                    if(this.product[i].id == proId) {
                        return this.product[i].name;
                        break;
                    }
                }
            },
            getStatus(status) {
                if(status == 10) {
                    return '待分配';
                } else if(status == 20) {
                    return '已分配';
                } else if(status == 30) {
                    return '已审核';
                } else if(status == 40) {
                    return '已归档';
                } else if(status == -10) {
                    return '审核未通过';
                }
            },
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
        },

        data() {
            return {
                allocationData:{
                    manager_id:'',
                    id:'',
                },
                allocation:false,
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
                        key: 'product_id',
                        render: (h, params) => {
                            return this.getProductType(params.row.product_id);
                        }
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
                        title: '结清状态',
                        key: 'image_status',
                        render: (h, params) => {
                            return this.getStatus(params.row.image_status);
                        }
                    },
                    {
                        title: '提交日期',
                        key: 'create_time'
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
                                            this.$router.push({path:'/show/record/'+params.row.id});
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
                                            this.allocations(params.row.id)
                                        }
                                    }
                                }, '分配'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            console.info(params.row.id);
                                            this.remove(params.row.id)
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
                    tmpSattus:10,
                    
                    siderNavHeight: document.documentElement.clientHeight - 104
                }
            }
        },
    };
</script>