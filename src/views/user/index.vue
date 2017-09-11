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
    
        <Table :columns="columns" border size="small" :data="user"></Table>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

    export default {
        created: function () {
            this.$nextTick(() => {
                this.$store.dispatch('getUsers');
            });
        },
        methods: {
            ok () {
                let createOrUpdate = this.formItem.id ? 'updatePermissions' : 'createPermissions';
                this.$store.dispatch(createOrUpdate,this.formItem);
                // console.info('vvv');
            },
            createOrUpdate(index) {
                this.$router.push({path:'/user/add'});
                // console.info(index);
                // this.isShowModal = true;
            }
        },
        computed: {
            ...mapGetters({
                user:'user',
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
                        title: '用户名',
                        key: 'username'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '手机',
                        key: 'mobile'
                    },
                    {
                        title: '邮箱',
                        key: 'email'
                    },
                    {
                        title: '角色',
                        key: 'roles'
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