<style lang="sass" scoped  src="../assets/styles/layouts/tabnavbar.scss"></style>

<template>
	<div class="tab-navigation-bar">
		<div class="tabnavs">
			<ul class="tabnav">
		    <li ><Icon type="arrow-left-b"></Icon></li>
		   	<li v-for="(item, index) in cloneItems" :class="item.class" @click="handleClick(index)" >
		    	<Icon :type="item.icon"></Icon>
		    	{{ item.name }}
		    	<Icon type="android-close" class="tabnav-close" v-if="index != 0"  @click.native.stop="tabNavClose(index)"></Icon>
		    </li>
		    <li ><Icon type="arrow-right-b"></Icon></li>
		</ul>

		</div>
		<div class="breadcrumb">
			<Breadcrumb>
                <Breadcrumb-item href="/">
                    <Icon type="ios-home-outline"></Icon> 首页
                </Breadcrumb-item>
                <Breadcrumb-item href="/components/breadcrumb">
                    <Icon type="social-buffer-outline"></Icon> 权限管理
                </Breadcrumb-item>
                <Breadcrumb-item>
                    <Icon type="pound"></Icon> 角色列表
                </Breadcrumb-item>
            </Breadcrumb>
		</div>
		             
	</div>
</template>
<script>
    export default {
    	name:'Tabnavigationbar',
    	props: {
    		items:{
    			type: Array,
                default () {
                    return [
                    	{
                    		name:'首页',
                    		icon:'ios-home-outline',
                    		class:'active'
                    	}
                    ];
                }
    		}
    	},
    	data() {
    		return {
    			cloneItems: this.makeItems()
    		}
    	},
        methods: {
        	makeItems() {

        		// let items = this.items;
        		// console.info(this.items);
        		// this.cloneItems = this.items;
        		if(this.items.length == 0 || this.items.length > 1) {
        			let defaultItem = {
                    		name:'首页',
                    		icon:'ios-home-outline',
                    		class:'active'
                    	};
        		this.items.unshift(defaultItem);

        		}
        		return this.items;
        	},
        	tabNavClose(index) {
        		// console.info('bbbb');
        		// this.items.splice(index, 1);
        		if(this.items[index].class == 'active') {
        			this.items[index-1].class = 'active';
        		} 
        		// console.info(this.items[index].class);
        		this.cloneItems.splice(index, 1);
        		// 路由处理
        	},
        	handleClick(index) {
        		// console.info('aaaaaaa');
        		this.items.forEach((item, k) => {
        			this.items[k].class = '';
                });
                this.items[index].class = "active";
        		// this.items.splice(index,1)
        	},
            handleStart() {
                this.$Modal.info({
                    title: 'Bravo',
                    content: 'Now, enjoy the convenience of iView.'
                });
            }
        }
    };
</script>