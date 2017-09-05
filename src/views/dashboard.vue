<style  lang="css" scoped>
.dashboard {
    /*background-color: #F5F5F5;*/
}

.fl{float: left;}.fr{float: right;}

/*文字颜色*/
.wred{color: #F32F47;}
.wgreen{color: #08BA5E;}

/*头部彩色*/
.IULlist li{margin-right: 0.5%; padding: 16px; margin-bottom: 10px; float: left;width:8.62%; min-height:99px;text-align: center;background-color: #fff;box-shadow: 0 0 11px 0 rgba(0,0,0,0.03);border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;}
.IULlist li:last-child{margin-right: 0;}
.IULlist li:nth-child(1),.IULlist li:nth-child(6),.IULlist li:nth-child(10){background-image: linear-gradient(225deg, #41E3FF 0%, #38C8FF 100%);}
.IULlist li:nth-child(2),.IULlist li:nth-child(11){background-image: linear-gradient(225deg, #FDC070 0%, #F98C3D 100%);}
.IULlist li:nth-child(3),.IULlist li:nth-child(9){background-image: linear-gradient(223deg, #FF97AA 0%, #FF5D71 100%);}
.IULlist li:nth-child(4),.IULlist li:nth-child(7){background-image: linear-gradient(223deg, #B5EC45 0%, #7ED321 100%);}
.IULlist li:nth-child(5),.IULlist li:nth-child(8){background-image: linear-gradient(225deg, #CACACA 0%, #999999 100%);}
.IULlistword1{font-size: 18px; margin-top: 10px;color: #fff;}
.IULlistword2{font-size: 12px;color: #fff;line-height: 16px;}

.clearfix:after{  content: "";   display: block;   height: 0;   clear: both;  visibility: hidden;  }
.clearfix {  zoom: 1;   }
.IULlist2 {
    background-color: #fff;
    border: 1px solid #F3F3F3;
    box-shadow: 0 0 11px 0 rgba(0,0,0,0.03);
    border-radius: 4px;
}

.IULlist2 li {
    float: left;
    width: 20%;
    padding: 10px 0;
}

.IULlist2 li a {
    display: block;
    text-align: center;
    border-right: 1px solid #F3F3F3;
}

.IULlist2 li:last-child a {
    border: none;
}

.IULlist2word1 {
    font-size: 20px;
    color: #333;
}

.IULlist2word2 {
    font-size: 13.94px;
    color: #7C7C7C;
}

/*借调资料占比*/
.bili{margin-top: 10px;}
.bili li{width: 32%; margin-right:2%;}
.bili li:last-child{margin-right: 0;}
.bilitit{font-size: 14px;color: #4D4651;padding-left:10px;border-left:2px solid #15A4E6; margin-bottom: 10px;display: inline-block;}
.bilicont{background-color: #fff; height: 250px;}


/*动态提示*/
.ITips{margin-top: 10px;}
.ITipstable{background-color: #fff;border: 1px solid #F3F3F3;box-shadow: 0 0 11px 0 rgba(0,0,0,0.03);border-radius: 4px;-webkit-border-radius: 4px;-moz-border-radius: 4px;}
.ITipstable tr th{font-size: 14px;color: #707070; height: 45px;text-align: center;}
.ITipstable tr td{font-size: 12px;color: #333333; height: 40px;text-align: center;}
.look{display: inline-block; background: #02BDF2;font-size: 12px;width: 70px; height: 30px;line-height: 30px;color: #FFFFFF;border-radius: 2px;-webkit-border-radius: 2px;-moz-border-radius: 2px;}
.ITipstable tr:nth-child(1n){background: #FBFEFF;}
.ITipstable tr:nth-child(2n){background: #F0F9FF;}

</style>
<template>
    <div class="dashboard">
        
     <!--    <Row type="flex" justify="space-between" class="code-row-bg">
            <Col span="2" v-for="n in 10">
                <Card  :padding="5">
                    <p style="text-align: center;">132</p>
                    <p style="font-size: 12px;">入库-待分配影像档案数</p>
                </Card>
            </Col>
        </Row> -->

        <ul class="IULlist clearfix">
            <li> 
                <p class="IULlistword1">132</p>
                <p class="IULlistword2">入库-待分配影像档案数</p>
            </li>
            <li> 
                <p class="IULlistword1">162</p>
                <p class="IULlistword2">入库-待分配纸质档案数</p>
            </li>           
            <li> 
                <p class="IULlistword1">172</p>
                <p class="IULlistword2">入库-待分配影像档案数</p>
            </li>           
            <li> 
                <p class="IULlistword1">532</p>
                <p class="IULlistword2">入库-待审核纸质档案数</p>
            </li>           
            <li> 
                <p class="IULlistword1">172</p>
                <p class="IULlistword2">入库-待归档影像档案数</p>
            </li>
            <li> 
                <p class="IULlistword1">102</p>
                <p class="IULlistword2">入库-待归档纸质档案数</p>
            </li>            
            <li> 
                <p class="IULlistword1">532</p>
                <p class="IULlistword2">近期待归还档案</p>
            </li>            
            
            <li> 
                <p class="IULlistword1">142</p>
                <p class="IULlistword2">逾期未归还档案</p>
            </li>            
            <li> 
                <p class="IULlistword1">132</p>
                <p class="IULlistword2">出库-待审核数</p>
            </li>            
            <li> 
                <p class="IULlistword1">182</p>
                <p class="IULlistword2">出库-待分配数</p>
            </li>  
            <li> 
                <p class="IULlistword1">102</p>
                <p class="IULlistword2">出库-待取件数</p>
            </li>  
        </ul>
       

        <Row style="margin-top: 10px;">
            <Col>
                 <ul class="IULlist2 clearfix">
            <li><a href="">
                <p class="IULlist2word1">2323</p>
                <p class="IULlist2word2">已审核数</p>
            </a></li>
            <li><a href="">
                <p class="IULlist2word1">2323</p>
                <p class="IULlist2word2">已审档案入库数</p>                
            </a></li>
            <li><a href="">
                <p class="IULlist2word1">2323</p>
                <p class="IULlist2word2">已审档案出库数</p>  
            </a></li>
            <li><a href="">
                <p class="IULlist2word1">2323</p>
                <p class="IULlist2word2">已部分归档档案数</p>                  
            </a></li>
            <li><a href="">
                <p class="IULlist2word1">2323</p>
                <p class="IULlist2word2">已全部归档档案数</p>                  
            </a></li>            
        </ul>
            </Col>
        </Row>

        <Row >
            <ul class="clearfix bili">
            <li class="fl ">
                <span class="bilitit">借调资料占比</span>
                <div class="bilicont">
                    <div id="main1" style="width:100%; height:100%; "></div>    
                </div>
            </li>
            <li class="fl ">
                <span class="bilitit">借调资料占比</span>
                <div class="bilicont">
                    <div id="main2" style="width:100%; height:100%; "></div>    
                </div>
            </li>
            <li class="fl ">
                <span class="bilitit">借调资料占比</span>
                <div class="bilicont">
                    <div id="main3" style="width:100%; height:100%; "></div>    
                </div>
            </li>
        </ul>
        </Row>

       <!--  <Row style="margin-top: 20px;">
            <Col span="6" v-for="n in 4">
                <Card  style="text-align: center;" >
                    <p >132</p>
                    <p >入库-待分配影像档案数</p>
                </Card>
            </Col>
        </Row> -->

        <!--动态提示-->
        <div class="ITips">
            <p class="bilitit">动态提示</p>
            <table class="ITipstable" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr><th>消息类型</th><th>消息内容</th><th>消息时间</th><th>操作</th></tr>
                <tr>
                    <td>待分配</td>
                    <td>融信通业务系统推送了一条新的档案入库申请，请分配！</td>
                    <td>2017-08-07 12:30</td>
                    <td>
                        <a class="look" href="">查看</a>
                    </td>
                </tr>
            </table>
        </div>

        <!-- <Table height="200" :columns="columns1" :data="data1"></Table> -->
                        
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
    export default {
        created() {
            console.info('dd');
        },
        computed: {
            ...mapGetters({
                addRoutes:'addRoutes',
            })
        },

        data() {
            return {
                columns1: [
                    {
                        title: '消息类型',
                        key: 'name'
                    },
                    {
                        title: '消息内容',
                        key: 'age'
                    },
                    {
                        title: '消息时间',
                        key: 'address'
                    },
                    {
                        title: '操作',
                        key: 'acs',
                        width: 100,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, '查看')
                                
                            ]);
                        }
                    }
                ],
                data1: [
                    {
                        name: '待分配',
                        age: '入库-待分配影像档案数,请速度处理!',
                        address: '2017-09-01 14:05:07'
                    },
                    {
                        name: '待分配',
                        age: 25,
                        address: '2017-09-01 14:05:07'
                    },
                    {
                        name: '待审核',
                        age: 30,
                        address: '2017-09-01 14:05:07'
                    },
                    {
                        name: '待归档',
                        age: 26,
                        address: '2017-09-01 14:05:07'
                    }
                ],
 
                formItem: {
                    input: '',
                    select: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    textarea: '',
                    
                    siderNavHeight: document.documentElement.clientHeight - 104
                }
            }
        },
        methods: {
        }
    };
</script>