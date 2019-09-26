<template>
    <div>
        <el-row style="margin-bottom:15px;">
            <el-col :span="8">
                <span class="demonstration">起始时间:</span>
                <el-date-picker
                v-model="StartTime"
                type="datetime"
                placeholder="选择日期时间">
                </el-date-picker>
            </el-col>
            <el-col :span="8">
                <span class="demonstration">结束时间:</span>
                    <el-date-picker
                    v-model="EndTime"
                    type="datetime"
                    placeholder="选择日期时间">
                    </el-date-picker>                
            </el-col>
            <el-col :span="8">
                <el-button type="primary" @click="showReport">查看报表</el-button>
                <el-button type="primary" @click="reload">清除数据</el-button>
            </el-col>
        </el-row>
        <div>
            <el-row style="margin-bottom:15px;">
                <el-button type="primary" v-show="displayGoback"  @click="back">返回上一级</el-button>
            </el-row>
            <el-row>
                <div  :id="id" :style="{height:height, width:width}" ref="myEchart">
                 </div>
            </el-row>

        </div>
    </div>
</template>

<script>
import moment from 'moment'
import echarts from 'echarts'
import Cache from '../util/cache.js'

export default {
  name: 'AlarmFrequencyView',
  data () {
    return {
       startTime:null,
       endTime:null,
       stateStack:null,
       maxDepth:2,
       cache:null,
       levelFunctions:[],
       level1:{
           label:[
                        'TAG1-1.HI', 'TAG1-2.HI', 'TAG1-3.HI', 'TAG1-4.HI', 'TAG1-5.HI', 'TAG1-6.HI', 'TAG1-7.HI',
                        'TAG1-8.HI', 'TAG1-9.HI', 'TAG1-10.HI', 'TAG1-11.HI', 'TAG1-12.HI', 'TAG1-13.HI', 'TAG1-14.HI',
                        'TAG1-15.HI', 'TAG1-16.HI', 'TAG1-17.HI', 'TAG1-18.HI', 'TAG1-19.HI', 'TAG1-20.HI', 'TAG1-21.HI',
                        'TAG1-22.HI', 'TAG1-23.HI', 'TAG1-24.HI', 'TAG1-25.HI', 'TAG1-26.HI', 'TAG1-27.HI',
                        'TAG1-28.HI', 'TAG1-29.HI', 'TAG1-30.HI', 'TAG1-31.HI', 'TAG1-32.HI', 'TAG1-33.HI', 'TAG1-34.HI',
                        'TAG1-35.HI', 'TAG1-36xxxxxxxxxxxxxxxx.HI', 'TAG1-37.HI', 'TAG1-38.HI', 'TAG1-39.HI', 'TAG1-40.HI', 'TAG1-41.HI',
                    ],
            value:
                [120, 200, 150, 80, 70, 110, 130,
                    120, 200, 150, 80, 70, 110, 130,
                    120, 200, 150, 80, 70, 110, 130,
                    120, 200, 150, 80, 70, 110, 130,
                    120, 200, 150, 80, 70, 110, 130,
                    120, 200, 150, 80, 70, 110]
       }, //over all
       level2:[
           //自定义对象必须要用value属性
           {id:1,name:'TAG2-21.HI',value:120},
           {id:2,name:'TAG2-22.HI',value:200},
           {id:3,name:'TAG2-23.HI',value:150},
           {id:4,name:'TAG2-24.HI',value:80},
           {id:5,name:'TAG2-25.HI',value:70},
           {id:6,name:'TAG2-26.HI',value:110}
       ],
        height:'450px',
        width:'1000px',
        id:'mychart1',
        chart:null,
    }
  },
  computed:{
      StartTime :{
        //getter
        get: function () {
            return this.startTime.format('YYYY-MM-DD HH:mm:ss.SSS');
        },
        // setter
        set: function (newValue) {
            this.startTime = moment(newValue);
        }
      },
       EndTime :{
        //getter
        get: function () {
            return this.endTime.format('YYYY-MM-DD HH:mm:ss.SSS');
        },
        // setter
        set: function (newValue) {
            this.endTime = moment(newValue);
        }
      },
      displayGoback : {
          get: function() {
              return this.stateStack.length > 1;
          }
      }
  },
  methods:{
      showReport() {

      },

      initChart() {

            var that = this;

            this.chart = echarts.init(this.$refs.myEchart);

            this.chart.on('click', function (params) {
                if(params.componentType == 'series' && params.seriesType == 'bar') {
                    if(that.stateStack.length < that.maxDepth) {
                        //if level less than max depth, then can be drilled down.

                        var currentLevel = that.stateStack.length;
                        
                        that.chart.setOption(that.levelFunctions[currentLevel].getData(params));

                        that.stateStack.push(`${params.name}-${params.value}`);
                    }
                }
                console.log(`name:${params.name}, value:${params.value}`);
            });

            

          
          var topKey = `Top-0`;

          this.chart.setOption(this.levelFunctions[0].options);
         
          this.cache[topKey]=this.level1;

          //the highest level always uses Top-0 as key
          that.stateStack.push(topKey);
      },
      reload() {
          
      },
      back() {
          if(this.stateStack.length>1) {
            this.stateStack.pop();
            var parentLevelKey = this.stateStack[this.stateStack.length-1];
            var parentLevel = this.stateStack.length-1;
            var cachedData = this.cache[parentLevelKey];
            if(cachedData) {
                //set chart data
                this.chart.setOption(this.levelFunctions[parentLevel].setChartData(cachedData));
            }
          }

      }
  },
  created() {
        var comp = this;
        this.startTime = moment();
        this.endTime = moment().add(1,'days');
        this.stateStack = new Array();
        this.cache = new Cache();
        console.log('in created.');
        this.levelFunctions = [
            {
                id:1,
                options:{
                    title:{
                        text: 'Alarm Frequency',
                        left :'center'
                    },
                    tooltip:{
                        trigger:'item'
                    },
                    grid: { // 控制图的大小，调整下面这些值就可以，
                            x: 40,
                            x2: 100,
                            y2: 150,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                        },
                    xAxis: {
                        //离散型数据用category
                        type: 'category',
                        data: this.level1.label,
                        axisLabel: {
                            rotate:45,
                            interval: 0
                        },
                        name:'报警种类'
                    },
                    yAxis: {
                        type: 'value',
                        name:'报警数量'
                    },
                    series: [{
                        data: this.level1.value,
                        type: 'bar'
                    }]
                },
                getData:function(params) {

                        
                        this.options.xAxis.data = comp.level1.label; //should get data from cache
                        this.options.series = [
                            {
                                data:comp.level1.value, //should get data from cache
                                type:'bar'
                            }
                        ];
                        var key = `${params.name}-${params.value}`;

                        comp.cache[key]=comp.level1;

                        return this.options;
                },
                setChartData(data) {
                        this.options.xAxis.data = data.label; //should get data from cache
                        this.options.series = [
                            {
                                data:data.value, //should get data from cache
                                type:'bar'
                            }
                        ];
                        return this.options;
                }
            },
            {
                id:2,
                options:{
                    title:{
                        text: '',
                        left :'center'
                    },
                    tooltip:{
                        trigger:'item'
                    },
                    grid: { // 控制图的大小，调整下面这些值就可以，
                            x: 40,
                            x2: 100,
                            y2: 150,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                        },
                    xAxis: {
                        //离散型数据用category
                        type: 'category',
                        axisLabel: {
                            rotate:45,
                            interval: 0
                        },
                        name:'报警种类'
                    },
                    yAxis: {
                        type: 'value',
                        name:'报警数量'
                    }
                },
                getData:  function(params) {
                        var title = params.name;
                        //set title
                       this.options.title.text = title;

                        //set x axis label
                        this.options.xAxis.data = comp.level2.map(v=> {return v.name;}); //should get data from cache

                        //set data series
                        this.options.series = [
                            {
                                data:comp.level2, //should get data from cache
                                type:'bar'
                            }
                        ];

                        var key = `${params.name}-${params.value}`;

                        comp.cache[key]=comp.level2;

                        return this.options;
                },
                setChartData(data) {
                     this.options.xAxis.data = data.map(v=> {return v.name;}); //should get data from cache

                    //set data series
                    this.options.series = [
                        {
                            data:data, //should get data from cache
                            type:'bar'
                        }
                    ];

                    return this.options;
                }
            }
             
        ];

        //console.log('in view created.');   
  },
  mounted() {
      this.initChart();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
