<template>
  <div>
            <el-row>
                <div  :id="id" :style="{height:height, width:width}" ref="myEchart">
                </div>
            </el-row>
            <el-row>
                <el-table border :data="gridData" stripe>
                    <el-table-column property="rank" label="排名"></el-table-column>
                    <el-table-column property="area" label="区域"></el-table-column>
                    <el-table-column property="unit" label="单元"></el-table-column>
                    <el-table-column property="tagName" label="位号"></el-table-column>
                    <el-table-column property="tagComment" label="注释"></el-table-column>      
                    <el-table-column property="alarmType" label="报警类型"></el-table-column>
                    <el-table-column property="priority" label="优先级"></el-table-column>
                    <el-table-column property="alarmCount" label="报警数量"></el-table-column>
                    <el-table-column property="percentage" label="百分比"></el-table-column>       
                </el-table>
            </el-row>
            <el-row>
                <el-pagination
                    :page-size="5"
                    layout="prev, pager, next"
                    :total="10"
                    @current-change="handlePageChange">
                    </el-pagination>
            </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'


export default {
    name: 'AlarmFrequencyChart',
    data () {
                return {
                height:'450px',
                width:'1000px',
                id:'mychart1',
                chart:null,
                reportStart:null,
                reportEnd:null,
                gridData:[
                    {rank:1,area:'Area1',unit:'unit1',tagName:'TAG1-1',tagComment:'TAG1-1',alarmType:'HI',priority:'Medium',alarmCount:100,percentage:'3.67'},
                    {rank:2,area:'Area1',unit:'unit1',tagName:'TAG1-2',tagComment:'TAG1-2',alarmType:'HI',priority:'Medium',alarmCount:100,percentage:'3.67'},
                    {rank:3,area:'Area1',unit:'unit1',tagName:'TAG1-3',tagComment:'TAG1-3',alarmType:'HI',priority:'Medium',alarmCount:100,percentage:'3.67'},
                    {rank:4,area:'Area1',unit:'unit1',tagName:'TAG1-4',tagComment:'TAG1-4',alarmType:'HI',priority:'Medium',alarmCount:100,percentage:'3.67'},
                    {rank:5,area:'Area1',unit:'unit1',tagName:'TAG1-5',tagComment:'TAG1-5',alarmType:'HI',priority:'Medium',alarmCount:100,percentage:'3.67'}                         
                ]
        }
    },
    methods:{
      initChart() {
          var page = this;
          this.chart = echarts.init(this.$refs.myEchart);
          this.chart.on('click', function (params) {
                if(params.componentType == 'series' && params.seriesType == 'bar') {
                    page.$router.push({                        
                        path:'/AlarmFrequency/ByArea',
                        query:{
                            start:page.reportStart,
                            end: page.reportEnd,
                            area: params.name
                        }
                    });
                }
                console.log(`name:${params.name}, value:${params.value}`);
            });


          var option = {
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
                    data: [
                        'TAG1-1.HI', 'TAG1-2.HI', 'TAG1-3.HI', 'TAG1-4.HI', 'TAG1-5.HI', 'TAG1-6.HI', 'TAG1-7.HI',
                        'TAG1-8.HI', 'TAG1-9.HI', 'TAG1-10.HI', 'TAG1-11.HI', 'TAG1-12.HI', 'TAG1-13.HI', 'TAG1-14.HI',
                        'TAG1-15.HI', 'TAG1-16.HI', 'TAG1-17.HI', 'TAG1-18.HI', 'TAG1-19.HI', 'TAG1-20.HI', 'TAG1-21.HI',
                        'TAG1-22.HI', 'TAG1-23.HI', 'TAG1-24.HI', 'TAG1-25.HI', 'TAG1-26.HI', 'TAG1-27.HI',
                        'TAG1-28.HI', 'TAG1-29.HI', 'TAG1-30.HI', 'TAG1-31.HI', 'TAG1-32.HI', 'TAG1-33.HI', 'TAG1-34.HI',
                        'TAG1-35.HI', 'TAG1-36xxxxxxxxxxxxxxxx.HI', 'TAG1-37.HI', 'TAG1-38.HI', 'TAG1-39.HI', 'TAG1-40.HI', 'TAG1-41.HI',
                    ],
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
                    data: [120, 200, 150, 80, 70, 110, 130,
                    120, 200, 150, 80, 70, 110, 130,
                    120, 200, 150, 80, 70, 110, 130,
                    120, 200, 150, 80, 70, 110, 130,
                    120, 200, 150, 80, 70, 110, 130,
                    120, 200, 150, 80, 70, 110],
                    type: 'bar'
                }]
            };
          this.chart.setOption(option);
      },
      handlePageChange(currentPageIndex) {
          console.log('current page: ' + currentPageIndex);
          //call backend service
      }
  },
  created() {
     this.reportStart = this.$route.query.start;
     this.reportEnd = this.$route.query.end;
     console.log(`in chart created start time:${this.reportStart}`);
     console.log(`in chart created end time:${this.reportEnd}`);
  },
  mounted() {
      this.initChart();
  },
  watch :{
      '$route' :{
          handler(route) {
              //console.log(route.fullPath);
              if(route.path=='/AlarmFrequency/Chart') {
                this.reportStart = this.$route.query.start;
                this.reportEnd = this.$route.query.end;
                console.log(`in chart watch: start time:${this.reportStart}`);
                console.log(`in chart watch: end time:${this.reportEnd}`);
                this.initChart();
              }
          },
          deep:true
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-table__row--striped {
    background-color: red;
}
</style>

