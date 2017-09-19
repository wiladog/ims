<style lang="css" scoped>


.demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }

    
</style>


<template>
  
                                           
        <Row>
        
        <Col span="8" offset="2">
            <Card dis-hover :padding="0" :bordered="false">
            
            <div slot="title" style="text-align: center;">
                <Button  style="background: #059FCE;border-color: #059FCE;color: #fff;">纸质资料</Button>
            </div>
               <div class="rukuXQCont2">
                                <ul class="gudang  clearfix">
                                    <li class="gudangding" v-for="(line,index) in paperFiles">
                                        <p>{{ line.name }}</p>
                                        <div class="gudangm10">
                                            
                                            <div class="demo-upload-list" v-for="item in line.uploadList">
                                                <template v-if="item.status === 'finished'">
                                                    <img :src="item.url">
                                                    
                                                    <div class="demo-upload-list-cover">
                                                        <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                                        <Icon type="ios-trash-outline" @click.native="handleRemove(item,index)"></Icon>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                                </template>

                                                <!-- <img :src="item.url"> -->

                                            </div>
                                            <Upload
                                                :ref="'upload'+index"
                                                :show-upload-list="false"
                                                :default-file-list="line.defaultList"
                                                :on-success="handleSuccess"
                                                :format="['jpg','jpeg','png']"
                                                :max-size="2048"
                                                :on-format-error="handleFormatError"
                                                :on-exceeded-size="handleMaxSize"
                                                :before-upload="handleBeforeUpload"
                                                :data="{aa:'aa',index:index}"
                                                multiple
                                                type="drag"
                                                action="/api/upload"
                                                style="display: inline-block;width:58px;">
                                               
                                                <div style="width: 58px;height:58px;line-height: 58px;">
                                                    <Icon type="camera" size="20"></Icon>
                                                </div>
                                            </Upload>

                                            <div class="inputtext textC">
                                                <input type="text" placeholder="备注信息" />
                                            </div>
                                        </div>
                                        <div class="gudangdingcont clearfix">
                                            <div class="fl">
                                                <Checkbox > &nbsp;</Checkbox>
                                            </div>
                                            <div class="fr">
                                                <span class="gudangadd addone"></span>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <Button type="primary" @click="handleSubmit">提交</Button>
                                        <Button type="ghost" style="margin-left: 8px" @click="handleReset('formValidate')">取消</Button>
                                    </li>
                                </ul>
                            </div>
            
            </Card>
        </Col>
    </Row>
    </div>
</template>



<script>


import { mapGetters, mapActions } from 'vuex'
    export default {
        created(){
            console.info(this.$route.params);
            let params = {
                product_id:this.$route.params.product_id,
                type:this.$route.params.customer_type,
                category:2
            }
            this.$store.dispatch('getproductFiles',params).then((rsp)=>{
               
            });
            
        },
        computed: {
            ...mapGetters({
                paperFiles:'productFiles',
            })
        },
        
        data () {
            return {
                defaultList: [
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    }
                ],
                imgName: '',
                visible: false,
            }
        },
        methods: {
            makeTmp() {
                console.info(this.paperFiles);
                
            },
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file,index) {
                // console.info(index);
                console.info(file);
                console.info(this.$refs['upload'+index][0].fileList);

                // 从 upload 实例删除数据
                const fileList = this.$refs['upload'+index][0].fileList;
                // console.info(fileList);
                this.$refs['upload'+index][0].fileList.splice(fileList.indexOf(file), 1);

                this.tmp[index].uploadList = [];
            },
            handleSuccess (res, file, fileList) {   

                // this.tmp[res.data.index].uploadList.push(file);
                // console.info(this.tmp[res.data.index].uploadList);
                this.paperFiles[res.data.index].uploadList.push(file);
                 file.url = res.data.path;
                file.name = res.data.name;

                
                
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            },
            handleBeforeUpload () {
                // const check = this.uploadList.length < 5;
                // if (!check) {
                //     this.$Notice.warning({
                //         title: '最多只能上传 5 张图片。'
                //     });
                // }
                // return check;
            },
            handleSubmit() {
                console.info(this.paperFiles);
                this.$store.dispatch('addPaper',{fileList:this.paperFiles,profile:{
                     product_id:this.$route.params.product_id,
                    type:this.$route.params.customer_type,
                    category:2,
                    profile_id:this.$route.params.profile_id,
                    profile_number:this.$route.params.profile_number
                }});
            }
           
        },
        mounted () {
            
            // this.uploadList = this.$refs.upload.fileList;
            
            // console.info(this.$refs.upload0);
            this.paperFiles.forEach((line,index)=>{
                // console.info(line.defaultList);
                this.paperFiles[index].uploadList = line.defaultList;
            });
           
        }
    }
</script>