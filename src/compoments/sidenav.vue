<style lang="sass" scoped  ></style>

<template>
	<div >
		<Menu theme="dark" width="auto" @on-select="handleClick">
      <Menu-item :name="item.path" v-for="item in items" v-if="!item.children">{{ item.meta.title }}</Menu-item>
      <Submenu name="1" v-for="item in items" v-if="item.children">
          <template slot="title">
              <Icon type="ios-paper"></Icon>
              {{ item.meta.title }}
          </template>
          <MenuItem :name="its.path" v-for="its in item.children" v-if="its.meta.hidden != 1">{{ its.meta.title }} {{ its.meta.hidden }}</MenuItem>
          
      </Submenu>
      
    </Menu>
	</div>
</template>
<script>
    export default {
      created() {
        console.info(this.items);
      },
    	name:'Sidenav',
      props: {
        items:{
          type: Array,
                default () {
                    return [
                      
                    ];
                }
        }
      },
    	data() {
    		return {
                
    		}
    	},
        methods: {
        	handleClick(name) {
            // console.info(name);
            this.$router.push(name);

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