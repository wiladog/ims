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
            <Col>
                <Table :columns="columns" :data="profileList" ></Table>

                <div style="margin-top: 5px;float: right;">
                    <Page :total="recordTotal" @on-change="chagePage" show-total></Page>
                </div>
            </Col>
        </Row>

        <Modal
            title="借调申请"
            v-model="applyShow"
            :loading="loading"
            class-name="vertical-center-modal">
            <Form  :label-width="80">
                <FormItem label="借调人">
                    <Input v-model="secondment.borrower_name" placeholder="请输入借调人姓名" ></Input>
                </FormItem>
                <FormItem label="借调天数">
                    <InputNumber :max="100" :min="1" v-model="secondment.borrow_days"></InputNumber>
                </FormItem>
                <FormItem label="借调原因" >
                    <RadioGroup v-model="secondment.reason" vertical>
                        <Radio :label="reason" v-for="reason in secondmentReasons">
                            <span>{{ reason }}</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="其他原因" >
                    <Input  type="textarea"  v-model="secondment.otherReason" :autosize="{minRows: 2,maxRows: 5}" placeholder="其他原因"></Input>
                </FormItem>
                <FormItem label="备注" >
                    <Input  type="textarea"  v-model="secondment.remark" :autosize="{minRows: 2,maxRows: 5}" placeholder="备注信息" ></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancel">取消</Button>
                <Button type="primary" @click="secondmentApply">申请</Button>
            </div>
        </Modal>
        
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
    export default {
        created() {
            console.info(this.$route.query);
            this.$store.dispatch('profileList', this.$route.query);
            this.$store.dispatch('getRecord',{type:'image',status:40});
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
            })
        },
        methods: {
            cancel(){
                this.applyShow = false;
                this.secondment.profile_id = '';
            },
            chagePage(page) {
                // console.info(page);
                this.$store.dispatch('getRecord',{type:'image',page:page});
            },
            secondmentApply() {
                // console.info(this.secondment);
                // return false;
                this.$store.dispatch('secondment',this.secondment).then(()=>{
                    this.$Message.success('分配成功!');
                    setTimeout(() => {
                            // window.location.reload();
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
        },

        data() {
            return {
                secondmentReasons:[
                    '借调原因一',
                    '借调原因二',
                    '借调原因三',
                    '借调原因四',
                ],
                secondment:{
                    manager_id:'',
                    reason:'',
                    otherReason:'',
                    profile_id:'',
                    remark:'',
                    borrow_days:1,
                    borrower_name:'',
                },
                applyShow:false,
                loading:true,
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
                                            this.applyShow = true;
                                            this.secondment.profile_id = params.row.id;
                                        }
                                    }
                                }, '申请')
                                                          
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