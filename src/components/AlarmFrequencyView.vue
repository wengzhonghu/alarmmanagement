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
            </el-col>
        </el-row>
        <div>
            <keep-alive>
                <router-view>
                </router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'AlarmFrequencyView',
  data () {
    return {
       startTime:null,
       endTime:null,
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
  },
  methods:{
      showReport() {
          //call router to go to alarm frequency chart view.
          //this.$router.push('/AlarmFrequency/Chart'); //不带参
        //   this.$router.push({
        //       name:'AlarmFrequencyChart',
        //       params:{
        //           start:this.startTime.format('YYYY-MM-DD HH:mm:ss.SSS'),
        //           end: this.endTime.format('YYYY-MM-DD HH:mm:ss.SSS')
        //       }
        //   });
        this.$router.push({
              path:'/AlarmFrequency/Chart',
              query:{
                  start:this.startTime.format('YYYY-MM-DD HH:mm:ss.SSS'),
                  end: this.endTime.format('YYYY-MM-DD HH:mm:ss.SSS')
              }
        });
      }
  },
  created() {
        this.startTime = moment();
        this.endTime = moment().add(1,'days');
        console.log('in view created.');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
