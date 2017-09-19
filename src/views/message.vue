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
    <div>
        <div class="clearfix MB10">
            <div class="fl">
                <p class="bilitit">我的消息</p>
            </div>
            
        </div>

        <div class="ITips">
            <table class="ITipstable" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr><th>消息类型</th><th>消息内容</th><th>消息时间</th><th>操作</th></tr>
                <tr v-for="(line, index) in message">
                    <td>待分配</td>
                    <td>融信通业务系统推送了一条新的档案入库申请，请分配！</td>
                    <td>2017-08-07 12:30</td>
                    <td>
                        <a class="look" href="">查看</a>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        created() {
            this.$store.dispatch('rack',{});
        },
        computed: {
            ...mapGetters({
                rack:'rack',
                
            })
        },
        data() {
            return {
                message:[0,1,2,3],
                racks:[],
                hasLocationId:true,
                editLocationShow: false,
                addLocationShow: false,
                addRackShow:false,
                addBoxShow:false,
                loading: true,
                title:'',
                editLocationForm:{
                    name:'',
                    remark:'',
                    id:'',
                    index:{},
                },
                addLocationForm:{
                    name:'',
                    remark:'',
                },
                addRackForm:{
                    name:'',
                    remark:'',
                    location_id:'',
                },
                addBoxForm:{
                    name:'',
                    remark:'',
                    location_id:'',
                    rack_id:'',
                },
                addLocationRules:{
                    name: [{required: true,message:'名称必须填写!',trigger: 'blur'}]
                },
                editLocationRules:{
                    name: [{required: true,message:'名称必须填写!',trigger: 'blur'}]
                },
                formRules:{
                    name: [{required: true,message:'名称必须填写!',trigger: 'blur'}],
                    location_id: [{required: true,message:'请选择档案区域!',trigger: 'change'}]
                },
                
                deleteForm:{
                    id:''
                }
            }
        },
        methods:{
            cancelEditLocation() {
                this.editLocationShow = false;
                this.editLocationForm.name = '';
                this.editLocationForm.id = '';
                this.editLocationForm.remark = '';
                this.editLocationForm.index = {};
                this.$refs.editLocationForm.resetFields();
            },
            cancelDeleteFileRack() {
                this.deleteForm.id = '';
                this.deleteForm.type = '';
            },
            cancelAddLocation() {
                this.addLocationForm.name = '';
                this.addLocationForm.remark = '';
                this.addLocationShow = false;
            },
            cancelAddRack() {
                this.addRackForm.name = '';
                this.addRackForm.remark = '';
                this.addRackForm.location_id = '';
                this.addRackShow = false;
                this.$refs.addRackForm.resetFields();
            },
            cancelAddBox() {
                this.addBoxForm.name = '';
                this.addBoxForm.remark = '';
                this.addBoxForm.location_id = '';
                this.addBoxShow = false;
                this.$refs.addBoxForm.resetFields();
            },
            
            editLocation(data, indexs, type) {
                this.editLocationForm.name = data.name;
                this.editLocationForm.id = data.id;
                this.editLocationForm.remark = data.remark;
                this.editLocationForm.index = indexs;
                if(type == 1) {
                    this.title = '编辑档案区域';
                } else if(type == 2) {
                    this.title = '编辑档案架';
                } else {
                    this.title = '编辑档案盒';
                }
                this.editLocationShow = true;
            },
            editLocationOk() {
                this.$refs.editLocationForm.validate((valid) => {
                    if (valid) {
                        this.$store.dispatch(this.editLocationForm.index.ac, this.editLocationForm).then((rsp)=>{
                            this.$Message.success('编辑成功!');
                            this.cancelEditLocation();
                        });
                    } else {
                        this.$Message.error('验证失败,请按提示操作!');
                    }
                })
            },
            addLocationOk() {
                this.$refs.addLocationForm.validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('addLocation', this.addLocationForm).then((rsp)=>{
                            this.$Message.success('添加成功!');
                            this.cancelAddLocation();
                        });
                    } else {
                        this.$Message.error('验证失败,请按提示操作!');
                    }
                })
            },
            addRackOk() {
                this.$refs.addRackForm.validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('addRack', this.addRackForm).then((rsp)=>{
                            this.$Message.success('添加成功!');
                            this.cancelAddRack();
                        });
                    } else {
                        this.$Message.error('验证失败,请按提示操作!');
                    }
                })
            },
            addBoxOk() {
                this.$refs.addBoxForm.validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('addBox', this.addBoxForm).then((rsp)=>{
                            this.$Message.success('添加成功!');
                            this.cancelAddBox();
                        });
                    } else {
                        this.$Message.error('验证失败,请按提示操作!');
                    }
                })
            },
            
            delLocation(id, count, type) {
                if(count>=1) {
                    this.$Message.error('有关联数据，不能删除!');
                } else {
                    this.$Modal.confirm({
                        title: '确认提示',
                        content: '确认要删除么？',
                        onCancel: () => {
                            this.cancelDeleteFileRack();
                        },
                        onOk: () => {
                            this.deleteForm.id = id;
                            this.deleteForm.type = type;
                            this.$store.dispatch('deleteFileRack', this.deleteForm).then((rsp)=>{
                                this.$Message.success('删除成功!');
                                this.cancelDeleteFileRack();
                            });
                        }
                    });
                }
                
            },
            delRack() {

            },
            editRack() {

            },
            delBox() {

            },
            editBox() {

            },
            addLocation() {
                this.addLocationShow = true;
            },
            addRack(location_id) {
                // location_id = '';
                if(location_id) {
                    this.hasLocationId = true;
                    this.addRackForm.location_id = location_id;
                } else {
                    this.hasLocationId = false;
                }
                this.addRackShow = true;
            },
            addBox(index, location_id) {
                console.info(index);
                console.info(location_id);
                this.racks = this.rack[index].rack;
                this.addBoxForm.location_id = location_id;
                this.addBoxShow = true;
            }
            
        }
        
    }
</script>