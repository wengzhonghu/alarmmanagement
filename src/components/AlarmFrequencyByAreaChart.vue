<template>
  <div>
        <span><h2>{{area}}</h2></span>   
        <div  :id="id" :style="{height:height, width:width}" ref="myEchart">
        </div>
  </div>
</template>

<script>
import echarts from 'echarts'
//using vue-router to implement drill down.
export default {
    name: 'AlarmFrequencyByAreaChart',
    data () {
        return {
                height:'450px',
                width:'1000px',
                id:'mychart1',
                chart:null,
                reportStart:null,
                reportEnd:null,
                area:''
        }
    },
    methods:{
      initChart() {
          this.chart = echarts.init(this.$refs.myEchart);
          
          var option = {
                title:{
                    text: 'Alarm Frequency Drill Down Demo',
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
      }
  },
  created() {
     this.reportStart = this.$route.query.start;
     this.reportEnd = this.$route.query.end;
     this.area = this.$route.query.area;
     console.log(`in by area created, start time:${this.reportStart}`);
     console.log(`in by area created, end time:${this.reportEnd}`);
  },
  mounted() {
      this.initChart();
  },
  watch: {
       '$route' :{
          handler(route) {
              console.log('in by area watch: '+ route.fullPath);
              if(route.path == '/AlarmFrequency/ByArea/Chart')
                //when entering this page check if route is changed
                //when leave this page, this method is also triggered, the path contains the target url,so ignore it.
                this.area = this.$route.query.area;
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

