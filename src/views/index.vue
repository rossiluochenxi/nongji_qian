<template>
  <div id="index" ref="appRef">
    <div class="bg">
      <dv-loading v-show="loading">Loading...</dv-loading>
      <div class="host-body">
        <div>
          <!-- 顶部title部分 -->
          <el-row>
            <el-col :span="6"><dv-decoration-8 class="title_right" :color="['#008CFF', '#00ADDD']" /></el-col>
            <el-col :span="12">
              <div class="title_text" style="font-size: 36px;">陶 源 农 机 监 管 系 统</div>
              <dv-decoration-5 class="title_center" :color="['#008CFF', '#00ADDD']" />
            </el-col>
            <el-col :span="6">
              <!-- <div class="title_time">{{ dateYear + dateWeek + dateDay }}</div> -->
              <dv-decoration-8 :reverse="true" class="title_left" :color="['#008CFF', '#00ADDD']" />
            </el-col>
          </el-row>
          <!-- 主体部分 -->
          <el-row>
            <!-- 第一列 -->
            <el-col :span="6">
              <!-- 饼图部分 -->
              <div class="left_box1">
                <dv-border-box-12 :border="false">
                  <div id="Rose_diagram"></div>
                  <dv-active-ring-chart :config="config" class="left_box1_rose_right" />
                  <div class="rose_text" v-for="(item, index) in numberData" :key="index">
                    <!-- <p>
                      <span class="coin">￥</span>
                      <span class="rose_text_nmb">{{
                        item.number.number
                      }}</span>
                    </p> -->
                    <p>
                      <span>{{ item.text }}</span>
                      <span class="colorYellow"></span>
                    </p>
                  </div>
                </dv-border-box-12>
              </div>
              <!-- 柱状图部分 -->
              <div class="left_box2">
                <dv-border-box-12 style="padding-top: 13px">
                  <p style="margin-left: 25px">数 据 汇 总</p>
                  <div id="columnar"></div>
                </dv-border-box-12>
              </div>
              <!-- 轮播表格部分 :config="board_info" -->
              <div class="left_box3">
                <dv-border-box-12 style="padding-top: 10px">
                  <!-- 饼形图容器 -->
               <div ref="pieChart" style="width: 350px; height: 300px; margin-left: 50px; margin-top: 15px"></div>
                </dv-border-box-12>
               
    <!-- 饼形图容器 -->
    <!-- <div ref="pieChart" style="width: 200px; height: 50px;"></div> -->
  
              </div>
            </el-col>
            <!-- 第二列 -->
            <el-col :span="12">
              <!-- 中国地图 -->
              <div id="china-map" ref="china-map"></div>
              <!-- 折线图 -预警表-->
              <dv-border-box-8>
                <div id="line_center_diagram"></div>
              </dv-border-box-8>
<!-- 
              <dv-border-box-12 style="padding-top: 38px">
                <div class="warning_table">
                  <div style="height: 250px; overflow-y: auto;">

                    <el-table class="el-table" :data="tableData" height="100%"
                      style="width: 98%;margin-left: 10px;margin-top:-15px; color:cyan;">
                      <el-table-column prop="agroUserName" label="养殖户" width="180">
                      </el-table-column>
                      <el-table-column prop="agroLivestockIccid" label="设备编号" width="180">
                      </el-table-column>
                      <el-table-column prop="livestockVarieties" label="品种">
                      </el-table-column>
                      <el-table-column prop="info" label="预警信息">
                      </el-table-column>
                      <el-table-column prop="date" label="预警时间">
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </dv-border-box-12> -->

              <dv-border-box-12 style="padding-top: 38px">
                <div class="warning_table">
                  <div style="height: 250px; overflow-y: auto;">

                    <el-table class="el-table" :data="tableData" height="100%"
                      style="width: 98%;margin-left: 10px;margin-top:-15px; color:cyan;">
                      <el-table-column prop="agroUserName" label="农机户主" width="250">
                      </el-table-column>
                      <el-table-column prop="agroLivestockIccid" label="设备编号" width="250">
                      </el-table-column>
                      <el-table-column prop="livestockVarieties" label="土地剩余面积">
                      </el-table-column>
                      <el-table-column prop="info" label="土地汇总信息">
                      </el-table-column>
                      <el-table-column prop="date" label="预计完成时间">
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </dv-border-box-12>



            </el-col>
            <!-- 第三列 -->
            <el-col :span="6">
              <!-- 轮播排行榜部分 -->
              <div class="right_box1">
                <dv-border-box-12 :border="false">
                  <dv-decoration-7 style="width: 100%; height: 40px;font-size: 25px;"> 数 目 统 计 </dv-decoration-7>
                  <dv-scroll-ranking-board :config="config" style="width: 95%; height: 87%; margin-left: 2%" />
                </dv-border-box-12>
              </div>
              <!-- <div class="right_box1">
                <dv-border-box-12>
                  <dv-decoration-7 style="width: 100%; height: 30px"
                    >品 种 排 名</dv-decoration-7
                  >
                  <dv-scroll-ranking-board
                    :config="config"
                    style="width: 95%; height: 87%; margin-left: 2%"
                  />
                </dv-border-box-12>
              </div> -->
              <!-- 农 机 用 户 统 计 -->
              <div class="right_box2">
                <dv-border-box-12 :border="false">
                  <dv-decoration-7 style="width: 100%; height: 40px; font-size: 25px;"> 农 机 用 户 统 计 </dv-decoration-7>
                  <dv-scroll-ranking-board :config="userNum" style="width: 95%; height: 87%; margin-left: 2%" />
                </dv-border-box-12>
              </div>

              <!-- 第二个部分 -->
              <div class="right_box3">
                <dv-border-box-12 :reverse="true" class="custom-border-box">
                  <!-- <dv-conical-column-chart :config="cone" class="cone_box" /> -->
                  <div ref="collarChart" style="width: 380px; height: 300px; margin-left: 30px; margin-top: 20px"></div>
                </dv-border-box-12>
              
              </div>
              <!-- <div class="right_box2">
                <dv-border-box-12 :reverse="true">
                  <div id="dotter_bar"></div>
                </dv-border-box-12>
              </div> -->
              <!-- 部分 -->
              <!-- <div class="right_box3">
                <dv-border-box-12 :reverse="true">
                  <dv-conical-column-chart :config="cone" class="cone_box" />
                </dv-border-box-12>
              </div> -->

            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// 将自动注册所有组件为全局组件4.15
// import dataV from '@jiaminghi/data-view' 
// Vue.use(dataV)
// import ElementUI from 'element-ui';  
// import 'element-ui/lib/theme-chalk/index.css';
//  Vue.use(ElementUI);
// import geoJson from '@/views/china.json'
// import * as echarts from 'echarts'
// Vue.prototype.$echarts = echarts
// echarts.registerMap('china', geoJson);


import drawMixin from "./drawMixin"; //自适应缩放
import { listagroIndex, listagroRankingFarmers,dmAlarmDataIndexList,ebOnOffLineDevice,xqOnOffLineDevice} from "@/api/agroIndex/agroIndex";//首页品种数量
import { listUser} from "@/api/agro/user";
// import { formatTime } from "../utils/index.js"; //日期格式转换

// 引入 ECharts
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
// 使用必要的组件
echarts.use([PieChart, TooltipComponent, CanvasRenderer]);
 import chinamap from './china.json';
export default {
  mixins: [drawMixin],
  name: 'PieChartExample',
  name: 'CollarChartExample',
  data() {
    return {
      //centerl用户坐标
      centerl: [],
      //用户信息
         userList: [],
      //左侧饼形图耳标在线数量
      chartData: [],
      //右侧饼形图项圈在线数量
      collarchartData: [],
      myChart: null,
      //首页用户排名
      agroNumlist: [],
      //首页品种集合
      IndexVarList: [],
      //定时器
      timing: null,
      //loading图
      loading: true,
      //时分秒
      dateDay: null,
      //年月日
      dateYear: null,
      //周几
      dateWeek: null,
      //周几
      weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],

      //预警信息
      tableData: [],

      //轮播养殖户排名
      userNum: {
        data: [],
      },
      //轮播品种排行榜
      config: {
        data: [],
      },

      //左侧饼图文字
      numberData: [
        {
          number: {
            number: 25,
          },
          text: "土地分配框图",//牛群结构
        },
        // {
        //   number: {
        //     number: 1144,
        //   },
        //   text: "总共完成数量",
        // },
        // {
        //   number: {
        //     number: 361,
        //   },
        //   text: "正在编译数量",
        // },
      ],
      //左侧轮播表格配置项
      // board_info: {
      //   header: ["养殖户名称", "监控设备编号", "设备状态"],
      //   data: [
      //     ["张三", "10830", "在线"],
      //     ["张四", "13500", "在线"],
      //     ["张五", "10350", "在线"],
      //     ["张六", "13300", "在线"],
      //     ["张七", "12500", "在线"],
      //     ["张八", "11500", "在线"],
      //     ["张九", "12500", "在线"],
      //     ["王六", "10360", "在线"],
      //     ["王二", "10567", "在线"],
      //     ["李四", "15721", "在线"],
      //   ],
      //   evenRowBGC: "#020308",
      //   oddRowBGC: "#382B47",
      //   headerBGC: "#020308",
      // },
      // 定义颜色
      colorList: {
        linearYtoG: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#f5b44d",
            },
            {
              offset: 1,
              color: "#28f8de",
            },
          ],
        },
        linearGtoB: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#43dfa2",
            },
            {
              offset: 1,
              color: "#28f8de",
            },
          ],
        },
        linearBtoG: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#1c98e8",
            },
            {
              offset: 1,
              color: "#28f8de",
            },
          ],
        },
        areaBtoG: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(35,184,210,.2)",
            },
            {
              offset: 1,
              color: "rgba(35,184,210,0)",
            },
          ],
        },
      },

      //锥形柱状图
      // cone: {
      //   data: [

      //     {
      //       name: "鸡",
      //       value: 66,
      //     },

      //     {
      //       name: "鸭",
      //       value: 80,
      //     },

      //     {
      //       name: "牛",
      //       value: 45,
      //     },

      //     {
      //       name: "鹅",
      //       value: 29,
      //     },

      //     {
      //       name: "兔",
      //       value: 55,
      //     },
      //     {
      //       name: "羊",
      //       value: 120,
      //     },

      //   ],
      //   showValue: true,
      // },
    };
  },
  created() {
    this.getIndexVarList();
    this.getAgroNumlist();
    this.getDmAlarmDataIndexList();
    this.getebDeviceState();
    this.getxqDeviceState();
    this.getUserList();
  },

  mounted() {
 // 假设在 mounted 钩子函数中获取后端数据，并赋值给 IndexVarList 数组
    // this.fetchData();
    // //获取实时时间
    // this.timeFn();
    //加载loading图
    this.cancelLoading();

    //中间折线图
    this.line_center_diagram();
    //虚线柱状图
    // this.dotter_bar();

  },
  beforeDestroy() {
    //离开时删除计时器
    clearInterval(this.timing);
  },
  methods: {
        /**
          * 获取农户信息
          */ 
      getUserList(){
        listUser().then( res => {
          if( res.code != 200){ return this.message("系统错误,请重新查询") }
          this.userList = res.rows
          this.userList.forEach(user => {
          const lon = parseFloat(user.lon); // 将经度字符串转换为浮点数
          const lat = parseFloat(user.lat); // 将纬度字符串转换为浮点数
          const userName =user.name
              // 将经纬度数据添加到 this.centerl 数组中
            this.centerl.push({userName:[userName],value: [lon, lat] });
              //中国地图
             this.china_map();
          });

            //获取设备数据
            // this.getList();
          // 在成功获取用户列表后再初始化地图
          // this.initMap();


          // console.log(this.userLis+"============"+ res.rows);
       }
         )
    },
    //项圈在线数量
    initCollarChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(this.$refs.collarChart);

      // 配置项
      const option = {
        title: {
            text: '土地面积占耕比',  //项圈在线数
            left: 'center',
            textStyle: {
              color: 'white' // 设置字体颜色为白色
            }
          },
          textStyle: {
                      fontFamily: 'Helvetica', // 设置字体为 Helvetica
                      fontSize: 20, // 设置字体大小为 25 像素
                     
                    },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '在线情况',
            type: 'pie',
            radius: '50%',
            data: this.collarchartData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      // 使用配置项显示图表
      myChart.setOption(option);
    },

    //耳标在线数量
    initPieChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(this.$refs.pieChart);

      // 耳标在线数量配置项
      const option = {
        title: {
            text: '农机产品在线数量',  //耳标在线数
            left: 'center',
            textStyle: {
              color: 'white' // 设置字体颜色为白色
            }
          },
          textStyle: {
                      fontFamily: 'Helvetica', // 设置字体为 Helvetica
                      fontSize: 20, // 设置字体大小为 25 像素
                     
                    },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '面积',//耳标
            type: 'pie',
            radius: '50%',
            data: this.chartData,
            color: ['#CD5C5C','#90EE90'], // 设置颜色数组
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      // 使用配置项显示图表
      myChart.setOption(option);
    },
   /**
    * 获取品种信息
    */
    getIndexVarList() {
      this.loading = true;
      listagroIndex().then(response => {
        // 获取后端返回的数据
        const rows = response.rows;

        // 将获取的数据赋值给 IndexVarList
        // this.IndexVarList = rows;

        // 对数据进行格式化并赋值给 config 对象中的 data 属性
        const formattedData = rows.map(item => {
          return {
            value: parseInt(item.varietiesNum), // 将字符串转换为整数
            name: item.livestockVarieties
          };
        });
        this.$delete(this.config, 'data');
        this.$set(this.config, 'data', formattedData);
        // this.config.data=formattedData;

        //左侧柱状图
        this.columnar();
        //左侧玫瑰饼图
        this.Rose_diagram();
        this.loading = false; // 数据加载完成后设置 loading 为 false
      }).catch(error => {
        console.error('获取数据出错：', error);
        this.loading = false; // 数据加载出错时也需要设置 loading 为 false
      });
    },
    /**
     * 
     * 获取养殖户排名
     */
    getAgroNumlist() {
      this.loading = true;
      listagroRankingFarmers().then(response => {
        // 获取后端返回的数据
        const rows = response.rows;

        // 将获取的数据赋值给 IndexVarList
        // this.agroNumlist = rows;

        // 对数据进行格式化并赋值给 config 对象中的 data 属性
        const formattedData = rows.map(item => {
          return {
            value: parseInt(item.num), // 将字符串转换为整数
            name: item.agroUserName
          };
        });
        this.$delete(this.userNum, 'data');
        this.$set(this.userNum, 'data', formattedData);
        // this.config.data=formattedData;


        this.loading = false; // 数据加载完成后设置 loading 为 false
      }).catch(error => {
        console.error('获取数据出错：', error);
        this.loading = false; // 数据加载出错时也需要设置 loading 为 false
      });
    },

    /**
     * 报警数据
     */
    getDmAlarmDataIndexList() {
      this.loading = true;
      dmAlarmDataIndexList().then(response => {
        // 获取后端返回的数据
    this.tableData = response.rows;
    this.loading = false; // 数据加载完成后设置 loading 为 false
      }).catch(error => {
        console.error('获取数据出错：', error);
        this.loading = false; // 数据加载出错时也需要设置 loading 为 false
      });
    },
       /**
        * 耳标设备在线离线数量
        *  
        */  
    getebDeviceState() {
    this.loading = true;
    ebOnOffLineDevice().then(response => {
             this.chartData = response.rows.map(row => {
             return {
                value: parseInt(row.totalNumber),
                name: row.deviceStatus === '在线' ? '在线耳标' : '离线数量', //离线耳标
                itemStyle: {
                    color: row.deviceStatus === '在线' ? '#90EE90' : '#CD5C5C'
                }
            };
             });
               // 初始化 耳标 
    this.initPieChart();
        this.loading = false; // 数据加载完成后设置 loading 为 false
    }).catch(error => {
        console.error('获取数据出错：', error);
        this.loading = false; // 数据加载出错时也需要设置 loading 为 false
    }); 
},

     /**
        * 项圈设备在线离线数量
        *  
        */  


    //原版
    // getxqDeviceState() {
    //   this.loading = true;
    //   xqOnOffLineDevice().then(response => {
    //    this.collarchartData = response.rows.map(row => {
    //          return {
    //             value: parseInt(row.totalNumber),
    //             name: row.deviceStatus === '在线' ? '在线项圈' : '离线项圈',
    //             itemStyle: {
    //                 color: row.deviceStatus === '在线' ? '#90EE90' : '#CD5C5C'
    //             }
    //         };
    //          });
    //HongSymbol 改版
             getxqDeviceState() {
      this.loading = true;
      xqOnOffLineDevice().then(response => {
       this.collarchartData = response.rows.map(row => {
             return {
                value: parseInt(row.totalNumber),
                name: row.deviceStatus === '在线' ? '在线项圈' : '空地占比',
                itemStyle: {
                    color: row.deviceStatus === '在线' ? '#90EE90' : '#CD5C5C'
                }
            };
             });

      


    // 初始化 项圈 
    this.initCollarChart();
        this.loading = false; // 数据加载完成后设置 loading 为 false
      }).catch(error => {
        console.error('获取数据出错：', error);
        this.loading = false; // 数据加载出错时也需要设置 loading 为 false
      });
    },

    //loading图
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    /*
      显示中国地图
    */
    china_map() {

   this.myChart = this.$echarts.init(document.getElementById("china-map")); 
      window.onresize = this.myChart.resize; //如果容器变大小，自适应从新构图

      // 2. 注册可用的地图，只在 geo 组件或者map图表类型中使用
      this.$echarts.registerMap("china", chinamap); //用导入的json文件注册一个name:china的地图组件
           // 3. 设置图表 option
      var option = {
 geo: {
          map: "china", //中国地图
          zoom: 1.2, //缩放倍数
          roam: true, //是否允许缩放和拖拽地图
          label: {
            normal: {
              show: true, // 是否显示省份名字，现在是隐藏的状态，因为和散点图的名字重叠了。如果需要就true
              textStyle: {
                //名字的样式
                color: "#000080",
              },
            },
            emphasis: {
              show: true,
            },
          },
          //地图样式
          itemStyle: {
            normal: {
              borderColor: "#293171", //地图边框颜色
              borderWidth: "2", //地图边框粗细
              areaColor: "#0A0F33", //地图背景色
            },
            //省份地图阴影
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "#fff",
            },
          },
        },
 
  
   
        series: [
          {
            smooth: true,

      // 这里将 require 的结果直接作为 symbol 的值
            symbol: 'image://' + require('../assets/images/blue.png'),
            symbolSize: 40,
            name: "在地图中显示散点图",
            type: "scatter",
            coordinateSystem: "geo", //设置坐标系为 geo
            data: this.centerl,
              itemStyle: {
              normal: {
                color: "red",
              },
            },
            //线的颜色样式 
            lineStyle: {
              normal: {
                color: this.colorList.linearBtoG,
                width: 3,
              },
            },
            //填充颜色样式
            areaStyle: {
              normal: {
                color: this.colorList.areaBtoG,
              },
            },
             label: {
      show: true,
      position: "right", // 文字显示在点的右侧
      formatter: function(params) {
        // 在这里设置需要显示的文字内容
        return params.data.userName;
      },
      textStyle: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
      }
    }
          },
        ],
      };
      // 4. myChart.setOption
      this.myChart.setOption(option);
    }, 
  
    //玫瑰饼图
    Rose_diagram() {
      let mapChart = this.$echarts.init(
        document.getElementById("Rose_diagram")
      ); //图表初始化，china-map是绑定的元素
      window.onresize = mapChart.resize; //如果容器变大小，自适应从新构图
      // 提取config1中的数据
      let roseData = this.config.data;


      let option = {
        color: [
          "#37a2da",
          "#32c5e9",
          "#9fe6b8",
          "#ffdb5c",
          "#ff9f7f",
          "#fb7293",
          "#e7bcf3",
          "#8378ea",
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        toolbox: {
          show: true,
        },
        calculable: true,
        series: [
          {
            name: "通过率统计",
            type: "pie",
            radius: [10, 50],
            roseType: "area",
            center: ["50%", "40%"],
            data: roseData,
          },
        ],
      };
      mapChart.setOption(option); //生成图表
    },

    //柱状图
    columnar() {
      let mapChart = this.$echarts.init(document.getElementById("columnar")); //图表初始化，china-map是绑定的元素
      window.onresize = mapChart.resize; //如果容器变大小，自适应从新构图

      // 提取config1中的数据
      let xAxisData = this.config.data.map(item => item.name);
      let seriesData = this.config.data.map(item => item.value);
      let option = {
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,0.1)",
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
              backgroundColor: "#7B7DDC",
            },
          },
        },
        grid: {
          x: "8%",
          width: "95%",
          y: "4%",
        },
        xAxis: {
          data: xAxisData, // 使用config1中的数据
          // data: [
          // xAxisData, // 使用config1中的数据
          // ],
          axisLine: {
            lineStyle: {
              color: "#B4B4B4",
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#B4B4B4",
              },
            },

            axisLabel: {
              formatter: "{value} ",
            },
          },
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#956FD4" },
                  { offset: 1, color: "#3EACE5" },
                ]),
              },
            },
            data: seriesData, // 使用config1中的数据
            // data: [
            //   46, 50, 55, 650, 75, 85, 99, 125,
            // ],
          },
        ],
      };
      mapChart.setOption(option); //生成图表
    },
    //折线图
    line_center_diagram() {
      let mapChart = this.$echarts.init(
        document.getElementById("line_center_diagram")
      ); //图表初始化，china-map是绑定的元素
      window.onresize = mapChart.resize; //如果容器变大小，自适应从新构图
      let option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          position: "bottom",
          axisLine: true,
          axisLabel: {
            color: "rgba(255,255,255,.8)",
            fontSize: 12,
          },
        },
        yAxis: {
          type: "value",
          name: "年度生产量",
          nameLocation: "end",
          nameGap: 24,
          nameTextStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: 14,
          },
          splitNumber: 4,
          axisLine: {
            lineStyle: {
              opacity: 0,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#fff",
              opacity: 0.1,
            },
          },
          axisLabel: {
            color: "rgba(255,255,255,.8)",
            fontSize: 12,
          },
        },
        grid: {
          left: 50,
          right: 10,
          bottom: 25,
          top: "18%",
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
            symbol: "emptyCircle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#fff",
              },
            },
            //线的颜色样式
            lineStyle: {
              normal: {
                color: this.colorList.linearBtoG,
                width: 3,
              },
            },
            //填充颜色样式
            areaStyle: {
              normal: {
                color: this.colorList.areaBtoG,
              },
            },
          },
        ],
      };
      mapChart.setOption(option); //生成图表
    },

  },
};
</script>

<style lang="scss">
//全局样式部分！！！！
* {
  margin: 0px;
  padding: 0px;
  list-style-type: none;
  outline: none;
  box-sizing: border-box;
}

html {
  margin: 0;
  padding: 0;
}

// body {
//   font-family: Arial, Helvetica, sans-serif;
//   // line-height: 1.2em;
//   background-color: #f1f1f1;
//   margin: 0;
//   padding: 0;
// }

a {
  color: #343440;
  text-decoration: none;
}

//--------------------------------------------

//页面样式部分！！！！
.container {
  color: #d3d6dd;
  max-width: 1700px;
  /* 最大宽度限制为1700px */
  width: 100%;
  /* 初始宽度为100% */
  height: auto;
  /* 高度自适应 */
  margin: 0 auto;
  /* 水平居中 */
  overflow: visible;
  /* 尝试修改 overflow 属性为 visible */
}

// .container {
//   color: #d3d6dd;
//   width: 100%; /* 初始宽度为100% */
//   max-width: 1700px; /* 最大宽度限制为1700px */
//   height: auto; /* 高度自适应 */
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   transform-origin: left top;
//   overflow: visible; /* 尝试修改 overflow 属性为 visible */
// }

.container-inner {
  width: 50%;
}

#index {
  color: #d3d6dd;
  width: 1890px;
  height: auto;
  position: absolute;
  top: 49%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: left top;
  overflow: hidden;

  .bg {
    //整体页面背景
    width: 100%;
    height: 100%;
    padding: 16px 16px 0 16px;
    background-image: url("../assets/images/background.png"); //背景图
    background-size: cover; //背景尺寸
    background-position: center center; //背景位置
  }

  //顶部右边装饰效果
  .title_left {
    width: 100%;
    height: 50px;
  }

  //顶部左边装饰效果
  .title_right {
    width: 100%;
    height: 50px;
    margin-top: 18px;
  }

  //顶部中间装饰效果
  .title_center {
    width: 100%;
    height: 5px;
  }

  //顶部中间陶源生物资产监管系统
  .title_text {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-top: 30px;
    color: #008cff;
  }

  //时间日期
  .title_time {
    text-align: center;
  }

  //中国地图
  #china-map {
    height: 610px;
    width: 100%;
  }

  //中间折线图
  .line_center {
    width: 100%;
    height: 300px;
  }

  //左1模块
  .left_box1 {
    height: 300px;
    width: 96%;
    margin-left: 2%;
    margin-bottom: 10px;
    position: relative;
  }

  //左2模块
  .left_box2 {
    height: 280px;
    width: 96%;
    margin-left: 2%;
    margin-bottom: 10px;
  }

  //左3模块
  .left_box3 {
    height: 300px;
    width: 96%;
    margin-left: 2%;
  }

  //右1模块
  .right_box1 {
    height: 300px;
    width: 94%;
    margin-left: 2%;
    margin-bottom: 10px;
  }

  //右2模块
  .right_box2 {
    height: 280px;
    width: 94%;
    margin-left: 2%;
    margin-bottom: 10px;
  }

  //右3模块
  .right_box3 {
    height: 300px;
    width: 94%;
    margin-left: 2%;
  }

  //左1模块-玫瑰饼图
  #Rose_diagram {
    height: 80%;
    width: 55%;
    top: 60px;
  }

  //左1模块-圆环图
  .left_box1_rose_right {
    height: 85%;
    width: 55%;
    position: absolute;
    right: 0;
    top: 25px;
  }

  //左1模块-文字部分
  .rose_text {
    display: inline-block;
    margin-top: 4%;
    margin-left: 4%;
  }

  // 左1模块-￥符号样式
  .coin {
    font-size: 20px;
    color: #ffc107;
  }

  //左1模块-（件）样式
  .colorYellow {
    color: yellowgreen;
  }

  //左1模块-数字样式
  .rose_text_nmb {
    font-size: 20px;
    color: #00b891;
  }

  //左2模块 柱状图
  #columnar {
    height: 97%;
    width: 95%;
    margin-left: 3%;
    margin-top: 10px;
  }

  //折线图
  #line_center_diagram {
    height: 100%;
    width: 100%;
  }

  //轮播表格
  .carousel_list {
    width: 96%;
    height: 98%;
    margin-left: 10px;
  }

  //虚线柱状图
  #dotter_bar {
    width: 100%;
    height: 100%;
  }

  //锥形图
  .cone_box {
    width: 95%;
    height: 97%;
    margin-left: 3%;
  }
}

//预警信息背景透明
.el-table,
.el-table__expanded-cell,
tr,
.el-table__cell {
  background-color: transparent !important;
}

/* 在你的样式表中添加自定义样式 */
.custom-border-box {
  border: none;
  /* 移除边框 */
  padding: 10px;
  /* 可选：控制内容与边框的间距 */
  display: inline-block;
  /* 或者使用 display: inline-flex; */
  /* 其他样式 */
}
// .pie-chart-container {
//     width: 200px;
//     height: 200px;
//     margin-right: 200px;
//     margin-bottom: 200px;
//   }
</style>
