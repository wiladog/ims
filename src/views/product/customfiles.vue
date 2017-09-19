<template>
    <div>
        <!-- <Table :columns="columns1" :data="data1"></Table> -->

        <Card style="margin-top: 20px;" dis-hover>
        
        <Form ref="formDynamic"  :label-width="80">
        <FormItem
            v-for="(item, index) in prvs"
            :key="index"
            :label="'自定义' + (index + 1)"
            >
            <Row :gutter="8">
                <Col span="4">
                    <span>名称</span>
                    <Input v-model="item.name" style="width:100px" size="small"></Input>
                </Col>
                    <Button type="text" size="small" @click="handleRemove(index)" icon="ios-trash-outline"></Button>
                </Col>
            </Row>
        </FormItem>
        <FormItem>
            <Row>
                <Col span="12">
                    <Button type="dashed" long @click="handleAdd" icon="plus-round">新增</Button>
                </Col>
            </Row>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="save" >保存</Button>
            <Button type="primary" @click="back" >返回</Button>
        </FormItem>
    </Form>
    </Card>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

    export default {
        created: function () {
            // console.info(this.$route.params);
            this.$store.dispatch('getproductFiles',this.$route.params);
        },
        computed: {
            ...mapGetters({
                prvs:'productFiles',

            })
        },
        data () {
            return {
                types: [
                    {
                        value: 1,
                        label: '文本框'
                    },
                    {
                        value: 2,
                        label: '单选'
                    },
                    {
                        value: 3,
                        label: '多选'
                    },
                    {
                        value: 4,
                        label: '日期'
                    },
                ],
            }
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
           save() {
                // console.info(this.prvs);
                // return false;
                this.$store.dispatch('saveFiles', this.prvs).then(()=>{
                    this.$Message.success('提交成功!');
                    setTimeout(()=>{
                        // window.location.reload();
                        this.$router.go(-1);
                    },100)
                });
           },
            fontendShowChange(value) {
                // console.info(value);
            },
            typeChange(index,value) {
                this.prvs[index].options = [];
            },
            addOption(index){
                if(this.prvs[index].addOptionValue) {
                    this.prvs[index].options.push(this.prvs[index].addOptionValue);
                    this.prvs[index].addOptionValue = '';
                }
            },
            deleteOption (indx, name) {
                const index = this.prvs[indx].options.indexOf(name);
                this.prvs[indx].options.splice(index, 1);
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
            handleAdd () {
                this.prvs.push({
                    name:'',
                    type:this.$route.params.type,
                    product_id: this.$route.params.product_id,
                    category: this.$route.params.category,
                });
            },
            handleRemove (index) {
                this.prvs.splice(index, 1);
            }
        }
    }
</script>