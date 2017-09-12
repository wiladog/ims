<style  scoped >
@import '../assets/css/bootstrap.min.css';
@import '../assets/css/mycss/public.css';
@import '../assets/css/mycss/all.css';
</style>
<template>
    <div>
        
        <div>
            <div class="rukucont">
            
           
            
            <ul class="rukuXQ clearfix">
                <li>
                    <p class="rukubtn1">基本信息</p>
                    <div class="rukuXQCont rukuXQContcolor ">
                        <dl class="allDLcont clearfix">
                            <dt>借款人姓名：</dt>
                            <dd>{{ curRecord.customer_name }}</dd>
                        </dl>
                        <dl class="allDLcont clearfix">
                            <dt>身份证号：</dt>
                            <dd>{{ curRecord.customer_id_number }}</dd>
                        </dl>
                        <dl class="allDLcont clearfix ">
                            <dt>手机号：</dt>
                            <dd>{{ curRecord.mobile }}</dd>
                        </dl>                        
                        <dl class="allDLcont clearfix">
                            <dt>档案编号：</dt>
                            <dd>{{ curRecord.profile_number }}</dd>
                        </dl>                       
                        <dl class="allDLcont clearfix">
                            <dt>业务编号：</dt>
                            <dd>{{ curRecord.number }}</dd>
                        </dl>                       
                        <dl class="allDLcont clearfix">
                            <dt>产品类型：</dt>
                            <dd>抵押车易贷 {{ curRecord.product_id }}</dd>
                        </dl>                       
                        <dl class="allDLcont clearfix">
                            <dt>借款金额：</dt>
                            <dd>￥{{ curRecord.borrowing_amount }}</dd>
                        </dl>                       
                        <dl class="allDLcont clearfix">
                            <dt>借款日期：</dt>
                            <dd>{{ curRecord.borrowing_date }}</dd>
                        </dl>                       
                        <dl class="allDLcont clearfix">
                            <dt>数据来源：</dt>
                            <dd>易捷金融{{ curRecord.source }}</dd>
                        </dl>                       
                         <dl class="allDLcont clearfix">
                            <dt>&nbsp;</dt>
                            <dd>上海</dd>
                        </dl>                       
                         <dl class="allDLcont clearfix">
                            <dt>分配日期：</dt>
                            <dd>{{ curRecord.image_distribute_time }}</dd>
                        </dl>                       
                        <dl class="allDLcont clearfix">
                            <dt>归档日期：</dt>
                            <dd>{{ curRecord.image_archive_time }}</dd>
                        </dl>                       
                                                                                                                    
                        
                    </div>
                </li>
                <li>
                    <p class="rukubtn2">已归档影像资料</p>
                    <div class="rukuXQCont rukuXQContpadding ">
                         <dl class="allDLcont clearfix" v-for="file in curRecord.files" v-if="file.archiving_status == 1">
                            <dt>{{ file.name }}:</dt>
                            <dd>
                                <div class="clearfix">
                                    <div class="fl allDLcontimg"  v-for="img in file.file_imgs">
                                        <img @click="showImg(img.file_url)" :src="img.file_url" />
                                    </div>
                                </div>
                            </dd>
                        </dl>
                    </div>
                </li>
                <li>
                    <p class="rukubtn2">待归档影像资料</p>
                    <div class="rukuXQCont rukuXQContpadding ">
                        <CheckboxGroup v-model="slted">
                         <dl class="allDLcont clearfix" v-for="file in curRecord.files" v-if="file.archiving_status == 0">
                            <dt><Checkbox :label="file.id">{{ file.name }}:</Checkbox></dt>
                            <dd>
                                <div class="clearfix">
                                    <div class="fl allDLcontimg"  v-for="img in file.file_imgs">
                                        <img @click="showImg(img.file_url)" :src="img.file_url" />
                                    </div>
                                </div>
                            </dd>
                        </dl>
                        </CheckboxGroup>
                    </div>
                </li>
                
                
            </ul>
            

            <div style="text-align: center;margin-top: 10px;">
                <Button type="info" @click="back">返回</Button>
            </div>
            
        </div>
        </div>

        <Modal
            v-model="showImgUrlModal"
            title="查看图片"
            >
            <img :src="showImgUrl" />
            <div slot="footer">
            &nbsp;
            </div>
        </Modal>
    
        
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
    export default {
        created() {
            this.$store.dispatch('showRecord',this.$route.params);
        },
        computed: {
            ...mapGetters({
                record:'record',
                product: 'product',
                user:'user',
                curRecord:'curRecord',
            })
        },
        data () {
            return {
                showImgUrl:'',
                showImgUrlModal:false,
                slted:[],
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
            back() {
                this.$router.go(-1);
            },
            partArchive() {
                this.$Modal.confirm({
                    title:'确认信息',
                    content:'是否完成部分归档操作?',
                    okText:'部分归档',
                    onOk:this.archiveAc
                });
            },
            allArchive() {
                this.$Modal.confirm({
                        title:'确认信息',
                        content:'是否完成全部归档操作?',
                        okText:'全部归档',
                        onOk:this.archiveAc
                    });
            },
            archiveAc() {
                let sltedIds = '';
                this.slted.forEach((line) =>{
                    sltedIds += line +',';
                });
                sltedIds = sltedIds.substring(0,sltedIds.length -1);
                this.$store.dispatch('archiveAc',{ids:sltedIds,rid:this.$route.params.id}).then((rsp)=>{
                    this.$router.go(-1);
                });
            },
            showImg (url) {
                // console.info(url);
                this.showImgUrl = url;
                this.showImgUrlModal = true;
            },
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