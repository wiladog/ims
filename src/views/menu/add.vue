<template>
    <Form :model="formItem" :label-width="80">
        <FormItem label="菜单名称">
            <Input v-model="formItem.input" placeholder="菜单名称"></Input>
        </FormItem>
        <FormItem label="上级菜单">
            <Select v-model="formItem.select" placeholder="请选择">
                <Option value="beijing">北京市</Option>
                <Option value="shanghai">上海市</Option>
                <Option value="shenzhen">深圳市</Option>
            </Select>
        </FormItem>
        <FormItem label="状态">
            <i-switch v-model="formItem.switch" size="large">
                <span slot="open">开启</span>
                <span slot="close">关闭</span>
            </i-switch>
        </FormItem>
       
        <FormItem>
            <Button type="primary">提交</Button>
            <Button type="ghost" style="margin-left: 8px">取消</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            return {
                formItem: {
                    input: '',
                    select: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    textarea: ''
                }
            }
        }
    }
</script>