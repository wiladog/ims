<style lang="sass" scoped  src="../assets/styles/layouts/tabnavbar.scss"></style>

<template>
	<div class="tab-navigation-bar">
 
        <div class="mens">
            <span class="prev" @click="tabprev"><Icon type="arrow-left-b"></Icon></span>
            <div class="tabs" ref="tabs" :style="styleObject">
                <ul ref="uls" >
                    <li v-for="(item, index) in navtabs" :class="[item.isActive ? 'active' : '']" ref="tbs" @click="handleClick(item.path)" >
                    <Icon :type="item.icon"></Icon>
                    {{ item.name }}
                    <Icon type="android-close" class="tabnav-close" v-if="index != 0"  @click.native.stop="tabNavClose(index)"></Icon>
                  </li>
                </ul>
            </div>
            <span class="next"  @click="tabnext"><Icon type="arrow-right-b"></Icon></span>
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
        mounted() {
            this.$nextTick(function(){
                // console.info('aaaaa');

                const _self = this;
                window.onresize = function () {
                    console.info('bbbbbb');
                    _self.clientWidth = document.documentElement.clientWidth - 280;
                }
            });
            
        },
        computed: {
            styleObject: function () {
                console.info(this.clientWidth);
               return {

                    // width: this.clientWidth + 'px',
                    // minWith: this.clientWidth + 'px'
                    width: this.clientWidth + 'px'
                }
            },
            ...mapGetters({
                navtabs:'navtabs',
            })
        },
        created() {
            this.$nextTick(function () {
                let ull = 0;
                this.$refs.tbs.forEach((item, k) => {
                    ull += item.offsetWidth;
                });
                // this.$refs.uls.style.width = ull + 'px';
            });
            
        },
    	data() {
    		return {
    			cloneItems: this.makeItems(),
                clientWidth: document.documentElement.clientWidth - 280,
    		}
    	},
        methods: {

            tabprev() {
                console.info('prev');

                let ileft = this.$refs.uls.offsetLeft + 85;
                ileft >= 0 && (ileft =0);
                this.$refs.uls.style.left = ileft + 'px';
            },
            tabnext() {
                console.info('next');
                let ileft = this.$refs.uls.offsetLeft -85;
                let maxLeft = this.$refs.tabs.offsetWidth - this.$refs.uls.offsetWidth;
                // console.info(ileft);
                // ileft <= maxLeft && (ileft = maxLeft);
                // console.info(ileft);
                this.$refs.uls.style.left = ileft + 'px';

            },
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