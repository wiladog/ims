<template>
    <Form :model="formItem" :label-width="80">
        <FormItem label="用户名:">
            <Input v-model="formItem.username" placeholder="用户名"></Input>
        </FormItem>
        <FormItem label="姓名:">
            <Input v-model="formItem.name" placeholder="姓名"></Input>
        </FormItem>
        <FormItem label="手机:">
            <Input v-model="formItem.mobile" placeholder="手机"></Input>
        </FormItem>
        <FormItem label="邮箱:">
            <Input v-model="formItem.email" placeholder="邮箱"></Input>
        </FormItem>
        <FormItem label="密码:">
            <Input v-model="formItem.password" placeholder="密码"></Input>
        </FormItem>
        
        <FormItem label="角色">
            <Select v-model="formItem.roles" multiple placeholder="角色">
                <Option  :value="item.name" v-for="item in roles" :key="item.id">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="状态">
            <i-switch v-model="formItem.status" true-value="1" false-value="0" size="large">
                <span slot="open">启用</span>
                <span slot="close">禁用</span>
            </i-switch>
        </FormItem>
       
        <FormItem>
            <Button type="primary" @click="createUser">提交</Button>
            <Button type="ghost" style="margin-left: 8px">取消</Button>
        </FormItem>
    </Form>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

    export default {
        created: function () {
            this.$nextTick(() => {
                // createUser
                this.$store.dispatch('getRoles');
            });
        },
        computed: {
            ...mapGetters({
                roles:'roles',
            })
        },
        methods:{
            createUser(){
                this.$store.dispatch('createUser', this.formItem);
            }
        },
        data () {
            return {
                formItem: {
                    username: '111',
                    name:'aaa',
                    mobile: '17780610117',
                    email: 'aa@163.com',
                    password: '123456',
                    status: 1,
                    roles:[],
                    
                }
            }
        }
    }
</script>