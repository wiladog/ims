<style lang="css" scoped>

.addqe .ivu-form-item:nth-child(1n){background: #FBFEFF;}
.addqe .ivu-form-item:nth-child(2n){background: #F0F9FF;}
 
.ivu-form-item {
    margin-bottom: 0;
    padding-bottom: 24px;

}

    
</style>
<template>
    <div>
        <Row>
        <Col span="10">
            <Card  dis-hover :padding="0" :bordered="false">
                <div slot="title" style="text-align: center;border: none;">
                    <Button style="background: #26B9CE;border-color: #26B9CE;color: #fff;">基本信息</Button>
                </div>
                <div style="border: 1px solid #e9eaec;border-top: none;padding-top: 10px;">
                <Form  :label-width="90" ref="formValidate" :model="formValidate" :rules="ruleValidate" class="addqe">
                    <FormItem label="借款人姓名:" prop="name">
            <Input v-model="formValidate.name" placeholder="输入借款人姓名" style="width: 98%;"></Input>
        </FormItem>
            <FormItem label="身份证号:" prop="customer_id_number">
            <Input v-model="formValidate.customer_id_number" placeholder="输入借款人身份证号码" style="width: 98%;"></Input>
        </FormItem>
        
        <FormItem label="手机号:">
            <Input  placeholder="输入借款人手机号码" style="width: 98%;"></Input>
        </FormItem>
        <FormItem label="档案编号:">
            <Input  placeholder="输入档案编号" style="width: 98%;"></Input>
        </FormItem>

        <FormItem label="业务编号:">
            <Input  placeholder="输入借款人姓名" style="width: 98%;"></Input>
        </FormItem>
        <FormItem label="产品类型:">
            <Select v-model="formValidate.city" placeholder="请选择产品类型" style="width: 98%;">
                <Option value="beijing">北京市</Option>
                <Option value="shanghai">上海市</Option>
                <Option value="shenzhen">深圳市</Option>
            </Select>
        </FormItem>
        <FormItem label="借款金额:">
            <Input  placeholder="输入借款人姓名" style="width: 98%;"></Input>
        </FormItem>
        <FormItem label="借款日期:">
            <DatePicker type="date" placeholder="选择日期" style="width:98%;"></DatePicker>
        </FormItem>
        <FormItem label="数据来源:">
            <Input  placeholder="输入借款人姓名" style="width: 98%;"></Input>
        </FormItem>
        <FormItem label="分配日期:">
            <DatePicker type="date" placeholder="选择日期" style="width:98%;"></DatePicker>
        </FormItem>
        <FormItem label="合同到期:">
            <DatePicker type="date" placeholder="选择日期" style="width: 98%;"></DatePicker>
        </FormItem>

        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button type="ghost" style="margin-left: 8px" @click="handleReset('formValidate')">取消</Button>
        </FormItem>
    </Form>
               </div> 
            </Card>
        </Col>
        <Col span="8" offset="2">
            <Card dis-hover :padding="0" :bordered="false">
            
            <div slot="title" style="text-align: center;">
                <Button  style="background: #059FCE;border-color: #059FCE;color: #fff;">纸质资料</Button>
            </div>
               <div class="rukuXQCont2">
                                <ul class="gudang  clearfix">
                                    <li class="gudangding">
                                        <p>登记证原件</p>
                                        <div class="gudangm10">
                                            <div class="inputtext textC">
                                                <input type="text" placeholder="备注信息" />
                                            </div>
                                        </div>
                                        <div class="gudangdingcont clearfix">
                                            <div class="fl">
                                                <span class="checkbox_item">
                                                    <input type="checkbox" />
                                                    <label class="check_label">
                                                        <i class="checkbox_icon"></i>
                                                    </label>
                                                </span>
                                            </div>
                                            <div class="fr">
                                                <span class="gudangadd addone"></span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="gudangding">
                                        <p>身份证正反面</p>
                                        <div class="gudangm10">
                                            <div class="inputtext textC">
                                                <input type="text" placeholder="备注信息" />
                                            </div>
                                        </div>
                                        <div class="gudangdingcont clearfix">
                                            <div class="fl">
                                                <span class="checkbox_item">
                                                    <input type="checkbox" />
                                                    <label class="check_label">
                                                        <i class="checkbox_icon"></i>
                                                    </label>
                                                </span>
                                            </div>
                                            <div class="fr">
                                                <span class="gudangadd addtwo"></span>
                                            </div>
                                        </div>

                                    </li>
                                    <li class="gudangding">
                                        <p>行驶证</p>
                                        <div class="gudangm10">
                                            <div class="inputtext textC">
                                                <input type="text" placeholder="备注信息" />
                                            </div>
                                        </div>
                                        <div class="gudangdingcont clearfix">
                                            <div class="fl">
                                                <span class="checkbox_item">
                                                    <input type="checkbox" />
                                                    <label class="check_label">
                                                        <i class="checkbox_icon"></i>
                                                    </label>
                                                </span>
                                            </div>
                                            <div class="fr">
                                                <span class="gudangadd addthere"></span>
                                            </div>
                                        </div>

                                    </li>

                                </ul>
                            </div>
            </Card>
        </Col>
    </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '借款人姓名不能为空', trigger: 'blur' }
                    ],
                    customer_id_number: [
                        { required: true, message: '身份证号不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
                        { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                    ]
                }
                
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>