<style lang="sass" scoped  src="../assets/styles/layouts/tabnavbar.scss"></style>

<template>
	<div class="tab-navigation-bar">
		<div class="tabnavs">
			<ul class="tabnav">
		      <li ><Icon type="arrow-left-b"></Icon></li>
              <!-- :class="item.class" -->
		   	  <li v-for="(item, index) in navtabs" :class="[item.isActive ? 'active' : '']"  @click="handleClick(item.path)" >
		    	<Icon :type="item.icon"></Icon>
		    	{{ item.name }}
		    	<Icon type="android-close" class="tabnav-close" v-if="index != 0"  @click.native.stop="tabNavClose(index)"></Icon>
		      </li>
		      <li ><Icon type="arrow-right-b"></Icon></li>
		    </ul>
		</div>
		<div class="breadcrumb">
			<Breadcrumb>
                <Breadcrumb-item :href="breadcrumb.path" v-for="breadcrumb in breadcrumbs">
                    <Icon :type="breadcrumb.type"></Icon> {{ breadcrumb.name }}
                </Breadcrumb-item>
            </Breadcrumb>
		</div>
		             
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
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
    		},
            breadcrumbs: {
                type:Array,
                default () {
                    return [

                    ]
                }
            }
    	},
        computed: {
            ...mapGetters({
                navtabs:'navtabs',
            })
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
                this.$store.dispatch('removeNavtab', index).then((data)=>{
                    console.info(data);
                    if(data.isPush) {
                        this.$router.push(this.navtabs[data.index].path);
                    }
                    
                });
        	},
        	handleClick(path) {
                // console.info('bbb');
                this.$router.push(path);
        		// console.info('aaaaaaa');
        		// this.items.forEach((item, k) => {
        		// 	this.items[k].class = '';
          //       });
          //       this.items[index].class = "active";
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