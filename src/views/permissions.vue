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
        title="增加权限"
        @on-ok="ok"
        >
        <Form :model="formItem" :label-width="80">
            <Form-item label="权限名称：">
                <Input v-model="formItem.name" placeholder="权限名称："></Input>
            </Form-item>
        </Form>
    </Modal>
        <Table :columns="columns" border size="small" :data="permissions"></Table>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

    export default {
        created: function () {
            this.$nextTick(() => {
                this.$store.dispatch('getPermissions');
            });
        },
        methods: {
            ok () {
                let createOrUpdate = this.formItem.id ? 'updatePermissions' : 'createPermissions';
                this.$store.dispatch(createOrUpdate,this.formItem);
                // console.info('vvv');
            },
            createOrUpdate(index) {
                // console.info(index);
                if(index >= 0) {
                    this.formItem.name = this.permissions[index].name;
                    this.formItem.id = this.permissions[index].id;
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
                permissions:'permissions',
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
                        title: '权限ID',
                        key: 'id'
                    },
                    {
                        title: '权限名称',
                        key: 'name'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 140,
                        render: (h, params) => {
                            return h('div', [
                                
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            // console.info(params.index);
                                            this.createOrUpdate(params.index);
                                        }
                                    }
                                }, '编辑'),
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
                                            this.$store.dispatch('deletePermissions', pas);
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