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
        <div style="margin-bottom: 10px;">
            <Form ref="formInline" :model="applyForm"  inline>
                <FormItem >
                    <Input type="text" v-model="applyForm.customer_name" style="width:200px;" placeholder="借款人姓名"></Input>
                </FormItem>
                <FormItem >
                    <Input type="text" v-model="applyForm.number" style="width:200px;" placeholder="业务编号"></Input>
                </FormItem>
                <FormItem >
                    <Input type="text" v-model="applyForm.customer_id_number" style="width:200px;" placeholder="身份证号"></Input>
                </FormItem>

                <FormItem>
                    <Button type="success" class="c-btn" @click="applyNextStep">下一步</Button>
                </FormItem>
            </Form>

            {{ applyForm }}
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
    export default {
        created() {
            this.$store.dispatch('getRecord',{});
            this.$store.dispatch('getProduct');
            this.$store.dispatch('getUsers');
        },
        computed: {
            ...mapGetters({
                record:'record',
                product: 'product',
                user:'user',
                recordTotal:'recordTotal'
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
            applyNextStep() {
                this.$router.push({path:'/outbound/searchList',query:this.applyForm})
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
                applyForm:{
                    customer_name:'',
                    number:'',
                    customer_id_number:'',
                    status: 40,
                },
                
                total:100,
                columns: [
                    {
                        title: '借款人姓名',
                        key: 'customer_name'
                    },

                    {
                        title: '档案编号',
                        key: 'profile_number',
                    },
                    {
                        title: '业务编号',
                        key: 'number'
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
                        title: '出库类型',
                        key: 'create_time'
                    },
                    {
                        title: '状态',
                        key: 'image_status',
                        render: (h, params) => {
                            return this.getStatus(params.row.image_status);
                        }
                    },
                    {
                        title: '预计归还日期',
                        key: 'date9'
                    },
                    {
                        title: '归还日期',
                        key: 'date10'
                    },
                    {
                        title: '审核日期',
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