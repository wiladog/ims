<template>
    <div>
        <Row style="margin-bottom: 10px;">
            <Col span="18" >&nbsp;</Col>
            <Col span="6" style="text-align: right;">
                <Button type="primary" @click="createOrUpdate(-1)" >
                    <Icon type="plus-round"></Icon>&nbsp;增加
                </Button>
            </Col>
        </Row>
    <Modal
        v-model="isShowModal"
        title="增加产品"
        @on-ok="ok"
        >
        <Form :model="formItem" :label-width="80">
            <Form-item label="产品名称：">
                <Input v-model="formItem.name" placeholder="产品名称"></Input>
            </Form-item>
        </Form>
    </Modal>
        <Table :columns="columns" border size="small" :data="product"></Table>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

    export default {
        created: function () {
            this.$nextTick(() => {
                this.$store.dispatch('getProduct');
            });
        },
        methods: {
            ok () {
                let createOrUpdate = this.formItem.id ? 'updateProduct' : 'createProduct';
                this.$store.dispatch(createOrUpdate,this.formItem);
            },
            createOrUpdate(index) {
                if(index >= 0) {
                    this.formItem.name = this.product[index].name;
                    this.formItem.id = this.product[index].id;
                    this.formItem.index = index;
                } else {
                    this.formItem.name = '';
                    this.formItem.id = '';
                }
                this.isShowModal = true;
            }
        },
        computed: {
            ...mapGetters({
                product:'product',
            })
        },
        data () {
            return {
                formItem: {
                    id: '',
                    name: '',
                },
                isShowModal: false,
                columns: [
                    {
                        title: '产品名称',
                        key: 'name'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        // fixed: 'right',
                        // width: 160,
                        render: (h, params) => {
                            return h('div', [
                                
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.createOrUpdate(params.index);
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({ name: 'customparmas', params: { id: params.row.id ,category:1}});
                                        }
                                    }
                                }, '个人基本信息参数'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            // this.createOrUpdate(params.index);
                                            this.$router.push({ name: 'customparmas', params: { id: params.row.id ,category:2}});
                                        }
                                    }
                                }, '企业基本信息参数'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({name:'customfiles',params:{product_id:params.row.id,type:1,category:1}});
                                        }
                                    }
                                }, '个人影像参数'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            // this.createOrUpdate(params.index);
                                            this.$router.push({name:'customfiles',params:{product_id:params.row.id,type:1,category:2}});
                                        }
                                    }
                                }, '个人纸质参数'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            // this.createOrUpdate(params.index);
                                            this.$router.push({name:'customfiles',params:{product_id:params.row.id,type:2,category:1}});
                                        }
                                    }
                                }, '企业影像参数'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({name:'customfiles',params:{product_id:params.row.id,type:2,category:2}});
                                        }
                                    }
                                }, '企业纸质参数'),
                                h('Poptip', {
                                    props: {
                                        confirm: true,
                                        title: '您确认删除吗？',
                                        transfer:true
                                    },
                                    on: {
                                        'on-ok': () => {
                                            let pas = {id:params.row.id,index: params.index};
                                            // console.info(pas);
                                            this.$store.dispatch('deleteProduct', pas);
                                            this.$Message.info('删除成功');
                                        }
                                    }

                                },[
                                    h('Button',{
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        }
                                    },'删除')
                                ]),
                            ]);
                        },

                    }
                ]
               
            }
        }
    }
</script>