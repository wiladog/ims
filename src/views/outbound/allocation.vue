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
                &nbsp;
            </Col>
            <Col span="6" style="text-align: right;">
                <Button class="add-btn" @click="addApply" >
                    <Icon type="plus-round"></Icon>&nbsp;出库申请
                </Button>
            </Col>
        </Row>

        <div>
            <Form ref="formInline" :model="formInline"  inline>
        <FormItem prop="user">
            <Input type="text" v-model="formInline.user" style="width:200px;" placeholder="档案编号/业务编号/身份证号/姓名"></Input>
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
            <Select  placeholder="出库类型" style="width:100px">
                <Option value="">请选择</Option>
                <Option value="10">借调出库</Option>
                <Option value="20">借调出库</Option>
                <Option value="30">借调出库</Option>
                <Option value="40">借调出库</Option>
            </Select>
        </FormItem>
        <FormItem>
            <Button type="success" class="b-btn" @click="handleSubmit('formInline')">归还日期</Button>
        </FormItem>
        <FormItem >
            <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 180px"></DatePicker>
        </FormItem>

    
    </Form>
        </div>
        <Row>
            <Col>
                <Table :columns="columns" :data="secondmentList" ></Table>
                <div style="margin-top: 5px;float: right;">
                    <Page :total="recordTotal" @on-change="chagePage" show-total></Page>
                </div>
            </Col>
        </Row>

       

        <Modal
            title="借调审核"
            v-model="auditShow"
            :loading="loading"
            >
            <Form ref="auditForm" :model="auditForm"  :rules="auditRules" :label-width="80">
                <FormItem label="审核结果" prop="is_pass">
                    <RadioGroup v-model="auditForm.is_pass" type="button">
                        <Radio label="通过"></Radio>
                        <Radio label="不通过"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="原因"  v-show="auditForm.is_pass == '不通过'">
                    <RadioGroup v-model="auditForm.reason" vertical>
                        <Radio :label="reason" v-for="reason in reasons">
                            <span>{{ reason }}</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="其他原因"  v-show="auditForm.is_pass == '不通过'">
                    <Input  type="textarea" v-model="auditForm.otherReason" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入原因"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelAudit">取消</Button>
                <Button type="primary" @click="allocationsOk">审核</Button>
            </div>
        </Modal>

        

        <Modal
            title="借调分配"
            v-model="distributeShow"
            :loading="loading"
            >
            <Form ref="distributeForm" :model="distributeForm"  :rules="distributeRules" :label-width="80">
                <FormItem label="组别" prop="team">
                    <Select v-model="distributeForm.team">
                        <Option value="beijing">审核组一</Option>
                        <Option value="shanghai">审核组二</Option>
                        <Option value="shenzhen">审核组三</Option>
                    </Select>
                </FormItem>
                <FormItem label="人员"  >
                    <Select   v-model="distributeForm.manager_id">
                        <Option :value="usr.id" v-for="usr in user" :key="usr.id">{{ usr.name }}</Option>
                    </Select>
                </FormItem>
                
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelDistribute">取消</Button>
                <Button type="primary" @click="distributeOk">分配</Button>
            </div>
        </Modal>

        <Modal
            title="归还"
            v-model="givebackShow"
            >
            <p>请选择部分归还或者全部归还</p>
            <div slot="footer">
                <Button type="text" @click="cancelGiveback">取消</Button>
                <Button type="primary" @click="givebackOk(1)">部分归还</Button>
                <Button type="primary" @click="givebackOk(2)">全部归还</Button>
            </div>
        </Modal>

        
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
    export default {
        created() {
            this.$store.dispatch('secondmentList',{status:20});
            this.$store.dispatch('getProduct');
            this.$store.dispatch('getUsers');
        },
        computed: {
            ...mapGetters({
                record:'record',
                product: 'product',
                user:'user',
                recordTotal:'recordTotal',
                secondmentListTotal:'secondmentListTotal',
                secondmentList:'secondmentList'
            })
        },
        methods: {
            // 取消审核
            cancelAudit() {
                this.auditShow = false;
                this.$refs.auditForm.resetFields();
            },
            cancelGiveback() {
                this.givebackShow = false;
                this.givebackForm.id = '';
                this.givebackForm.index = '';
                this.givebackForm.type = '';
            },
            cancelDistribute() {
                this.distributeShow = false;
                 this.$refs.distributeForm.resetFields();
            },
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
                this.$refs.auditForm.validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('secondmentAudit', this.auditForm).then((rsp)=>{
                            this.$Message.success('审核成功!');
                        });
                    } else {
                        this.$Message.error('验证失败,请按提示操作!');
                    }
                })
            },
            distributeOk() {
                this.$refs.distributeForm.validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('secondmentDistribute', this.distributeForm).then((rsp)=>{
                            this.$Message.success('分配成功!');
                        });
                    } else {
                        this.$Message.error('验证失败,请按提示操作!');
                    }
                })
            },
            takeOk() {
                this.$store.dispatch('secondmentTake', this.distributeForm).then((rsp)=>{
                    this.$Message.success('取件成功!');
                });
            },
            givebackOk(type) {
                this.givebackForm.type = type;
                this.$store.dispatch('secondmentGiveback', this.givebackForm).then((rsp)=>{
                    this.$Message.success('归还成功!');
                });
            },
            secondmentFinishOk() {
                this.$store.dispatch('secondmentFinish', this.givebackForm).then((rsp)=>{
                    this.$Message.success('结清成功!');
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
                let statusAndBtnTxt = {
                    statusTxt:'待审核',
                    btnTxt:'审核'
                };
                if(status == 10) {
                    statusAndBtnTxt.statusTxt = '待审核';
                    statusAndBtnTxt.btnTxt = '审核';
                } else if(status == 20) {
                    statusAndBtnTxt.statusTxt = '待分配';
                    statusAndBtnTxt.btnTxt = '分配';
                } else if(status == 30) {
                    statusAndBtnTxt.statusTxt = '待取件';
                    statusAndBtnTxt.btnTxt = '取件';
                } else if(status == 40) {
                    statusAndBtnTxt.statusTxt = '借出中';
                    statusAndBtnTxt.btnTxt = '归还';
                } else if(status == 50) {
                    statusAndBtnTxt.statusTxt = '部分归还';
                    statusAndBtnTxt.btnTxt = '全部归还 结清';
                } else if(status == 60) {
                    statusAndBtnTxt.statusTxt = '全部归还';
                    statusAndBtnTxt.btnTxt = '结清';
                } else if(status == 70) {
                    statusAndBtnTxt.statusTxt = '结清';
                    statusAndBtnTxt.btnTxt = '';
                } else {
                    statusAndBtnTxt.statusTxt = '审核未通过';
                    statusAndBtnTxt.btnTxt = '';
                }

                return statusAndBtnTxt;
            },
            actions(row, index) {
                if(row.status == 10) {
                    this.auditShow = true;
                    this.auditForm.id = row.id;
                    this.auditForm.index = index;
                } else if(row.status == 20) {
                    this.distributeShow = true;
                    this.distributeForm.id = row.id;
                    this.distributeForm.index = index;
                } else if(row.status == 30) {
                    this.$Modal.confirm({
                        title: '确认提示',
                        content: '确认取件',
                        onOk: () => {
                            this.distributeForm.id = row.id;
                            this.distributeForm.index = index;
                            this.takeOk();
                        }
                    });

                } else if(row.status == 40) {
                    this.givebackForm.id = row.id;
                    this.givebackForm.index = index;
                    this.givebackShow = true;

                } else if(row.status == 50) {

                } else if(row.status == 60) {
                    this.$Modal.confirm({
                        title: '确认提示',
                        content: '确认结清',
                        onOk: () => {
                            this.givebackForm.id = row.id;
                            this.givebackForm.index = index;
                            this.secondmentFinishOk();
                        }
                    });
                }
            },
            addApply() {
                this.$router.push({path:'/outbound/apply'});
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
                distributeForm:{
                    team:'',
                    manager_id:'',
                    id:'',
                },
                givebackForm:{
                    id:'',
                    type:'',
                    index:'',
                },
                formInline:{
                    user:'',
                },
                // :rules="ruleValidate"
                auditForm:{
                    is_pass:'',
                    reason:'',
                    otherReason:'',
                    id:'',
                },
                auditRules:{
                    is_pass: [
                        { required: true, message: '选择审核结果', trigger: 'blur' },
                    ],
                    reason:[
                        {required:true,message:'请选择不通过的原因', trigger:'blur'}
                    ]
                },
                distributeRules:{
                    team: [
                        { required: true, message: '选择组', trigger: 'blur' },
                    ],
                    manager_id:[
                        {required:true,message:'请选择人员', trigger:'blur'}
                    ]
                },
                reasons:[
                    '借调不通过原因一',
                    '借调不通过原因二',
                    '借调不通过原因三',
                    '借调不通过原因四',
                ],
                loading:true,
                auditShow:false,
                distributeShow:false,
                givebackShow:false,
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
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
                        key: 'type'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            return this.getStatus(params.row.status).statusTxt;
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
                            let acsBtn = [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.actions(params.row, params.index);
                                        }
                                    }
                                }, this.getStatus(params.row.status).btnTxt),
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
                                }, '查看')
                            ];
                            return h('div', acsBtn);
                        }
                    }
                ]
                
            }
        },
    };
</script>