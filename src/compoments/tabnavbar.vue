<style lang="sass" scoped>

.tab-navigation-bar {
				height: 49px;
				min-height: 49px;
				max-height: 49px;
				border-bottom: 1px solid #e7e7e7;
				box-sizing:border-box;
				// background: red;
				position: fixed;
				top: 113;
				left: 200;
				z-index: 9999;
				width: 100vw;
				background: #fff;

				.tabnav {
					display: flex;
					height: 49px;
					align-content: center;
					overflow: hidden;
					li {
						font-size: 14px;
						// background: #f8f8f8;
						padding: 14px 10px;
					    position: relative;
					    // cursor: pointer;
					    z-index: 1;
					    &:hover {
					    	background: #f8f8f8;
					    	cursor: pointer;
					    	&::before {
							    color: red;
					    	}
					    }
					    border-right: 1px solid #e7e7e7;
					    border-bottom: 1px solid #e7e7e7;
					    transition: all .2s ease-in-out;
					    
					    .tabnav-close {
					    	margin-left: 5px;
					    	&:hover {
					    		color: red;
					    	}
					    }

					    
					}

					.active {
						background: #fff;
						border-bottom: none;
						color: #2d8cf0;
						.tabnav-close {
							color: #495060;
						}
						&:hover {
					    	background: #fff;
					    }
					}
				}

				
				 
				

			}

</style>
<template>
	<div class="tab-navigation-bar">
		<ul class="tabnav">
		    <li ><Icon type="arrow-left-b"></Icon></li>
		   	<li v-for="(item, index) in cloneItems" :class="item.class" @click="handleClick(index)" ><!--  @click="handleClick(index)" -->
		    	<Icon :type="item.icon"></Icon>
		    	{{ item.name }}
		    	
		    	<Icon type="android-close" class="tabnav-close" v-if="index != 0"  @click.native.stop="tabNavClose(index)"></Icon>
		    </li>
		    <li ><Icon type="arrow-right-b"></Icon></li>
		</ul>                
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