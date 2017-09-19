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
            <Col span="16" >
            <div class="tabone">
                    <router-link to="/stock">
                         <p class="taboneword1">{{ recordTotal }}</p>
                         <p class="taboneword2">影像档案 </p>
                     </router-link>    
                     <a  class="active">
                        <p>{{ profileTotal }}</p>
                        <p>纸质档案</p>
                     </a>                   
                </div>
           
            </Col>
            <Col span="8" style="text-align: right;">
                <Input v-model="number" placeholder="输入业务编号添加纸质档案" style="width: 160px"></Input>
                <Button class="add-btn" @click="searchNumber" >
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
                <Table :columns="columns" :data="profileList" ></Table>
                <div style="margin-top: 5px;float: right;">
                    <Page :total="profileTotal" @on-change="chagePage" show-total></Page>
                </div>
            </Col>
        </Row>

        <Modal
            title="纸质档案分配"
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

        <Modal
            title="审核"
            v-model="auditShow"
            ok-text="确认"
            :loading="loading"
            class-name="vertical-center-modal">
            <Form  :label-width="80">
                <FormItem label="审核结果">
                    <RadioGroup v-model="auditData.is_pass" type="button">
                        <Radio label="通过"></Radio>
                        <Radio label="不通过"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="原因" v-show="auditData.is_pass == '不通过'">
                    <RadioGroup v-model="auditData.reason" vertical>
                        <Radio :label="reason" v-for="reason in reasons">
                            <span>{{ reason }}</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="其他原因" v-model="auditData.otherReason" v-show="auditData.is_pass == '不通过'">
                    <Input  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancel">取消</Button>
                <Button type="primary" @click="auditOk">确认</Button>
            </div>
        </Modal>

       
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
    export default {
        created() {
            // console.info(this.$route.params);
            let params = {};
            if(this.$route.params.status != 0) {
                params.status = this.$route.params.status;
            }
            this.$store.dispatch('profileList', params);
            this.$store.dispatch('getProduct');
            this.$store.dispatch('getUsers');
        },
        computed: {
            ...mapGetters({
                record:'record',
                product: 'product',
                user:'user',
                recordTotal:'recordTotal',
                profileList:'profileList',
                profileTotal:'profileTotal',
            })
        },
        methods: {
            cancel(){
                this.auditShow=false;
            },
            chagePage(page) {
                this.$store.dispatch('profileList',{type:'image',page:page});
            },
            allocations(id) {
                this.allocation = true;
                this.allocationData.id = id;
            },
            allocationsOk() {
                this.$store.dispatch('allocation',this.allocationData).then(()=>{
                    this.$Message.success('分配成功!');
                    setTimeout(() => {
                            // window.location.reload();
                        }, 2000);
                });
            },

            auditOk() {
                
                if(this.auditData.is_pass == '') {
                    this.$Message.warning('请选选择审核结果!');
                    setTimeout(()=>{
                        this.loading = false;
                    }, 1000);
                    this.loading = true;
                    this.allocation = true;
                    return false;
                } else {
                    console.info(this.auditData);
                    this.$store.dispatch('audit', this.auditData).then(()=>{
                    });
                }
            },
            
            searchNumber() {
                if(!this.number) {
                    this.$Message.error('请输入业务编号');
                    return false;
                }
                this.$store.dispatch('searchNumber',{number:this.number}).then((rsp)=>{
                    if(rsp) {
                        if(rsp.profile_number) {
                            this.$router.push({name:'paper_add',params:rsp});
                        } else {
                            this.$Message.error('没有档案编号，不能添加或补充纸质');
                        }
                    } else {
                        this.$Message.error('没有查找到业务');
                    }
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
                    statusTxt:'待分配',
                    btnTxt:'分配'
                };
                if(status == 10) {
                    statusAndBtnTxt.statusTxt = '待分配';
                    statusAndBtnTxt.btnTxt = '分配';
                } else if(status == 20) {
                    statusAndBtnTxt.statusTxt = '已分配';
                    statusAndBtnTxt.btnTxt = '审核';
                } else if(status == 30) {
                    statusAndBtnTxt.statusTxt = '已审核';
                    statusAndBtnTxt.btnTxt = '归档';
                } else if(status == 40) {
                    statusAndBtnTxt.statusTxt = '已归档';
                    statusAndBtnTxt.btnTxt = '';
                } else if(status == -10) {
                    statusAndBtnTxt.statusTxt = '待分配';
                    statusAndBtnTxt.btnTxt = '分配';
                }
                return statusAndBtnTxt;
            },
            audit(id) {
                this.auditShow = true;
                this.auditData.id = id;
            },
            archive(id,profile_number) {
                this.$router.push({name:'paper_archive',params:{id:id,number:profile_number}})
            },
            addBusiness() {
                this.is_add_paper = true;
                // this.$router.push({name:'paper_add'});
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            actions(row) {
                // console.info(row);
                if(row.paper_status == 10) {
                    this.allocations(row.id);
                } else if(row.paper_status == 20) {
                    this.audit(row.id);
                } else if(row.paper_status == 30) {
                    this.archive(row.id, row.number);
                } else if(row.paper_status == 40) {
                    this.allocations(row.id);
                } else {
                    this.allocations(row.id)
                }
                
            }
        },

        data() {
            return {
                reasons:[
                    '不通过原因一',
                    '不通过原因二',
                    '不通过原因三',
                    '不通过原因四',
                ],
                loading:true,
                auditData:{
                    is_pass:'',
                    reason:'',
                    otherReason:'',
                    id:'',
                    type:2,
                },
                auditShow:false,
                allocation:false,
                allocationData:{
                    manager_id:'',
                    id:'',
                    type:2,
                },
                number:'123456',
                is_add_paper:false,
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
                        key: 'paper_status',
                        render: (h, params) => {
                            return this.getStatus(params.row.paper_status).statusTxt
                        }
                    },
                    {
                        title: '提交日期',
                        key: 'create_time'
                    },
                    {
                        title: '分配日期',
                        key: 'paper_distribute_time'
                    },
                    {
                        title: '审核通过日期',
                        key: 'paper_audit_time'
                    },
                    {
                        title: '归档日期',
                        key: 'paper_archive_time',
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
                                            this.actions(params.row);
                                        }
                                    }
                                }, this.getStatus(params.row.paper_status).btnTxt),
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