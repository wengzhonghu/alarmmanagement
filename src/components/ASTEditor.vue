<template>
  <div>
      <el-form  :model="detail" ref="form1">
        <el-row>
                          <div class="grid-content bg-purple-dark">
                            <el-col :span="12">

                                    <span>位号:</span>
                                    <span class="margin-left:10px;">{{detail.tagInfo.tagName}}</span>
                            </el-col>
                            <el-col :span="12">            
                                <span>描述:</span>
                                <span class="margin-left:10px;">{{detail.tagInfo.comment}}</span>
                            </el-col> 
                          </div>
        </el-row>
        <el-row>
             <div class="grid-content bg-purple-dark">
                    <el-col :span="6">
                            <span>SH:</span>
                            <span class="margin-left:10px;">{{detail.tagInfo.sh}}</span>
                    </el-col>
                    <el-col :span="6">
                        <span>SL:</span>
                        <span class="margin-left:10px;">{{detail.tagInfo.sl}}</span>
                    </el-col>
                    <el-col :span="6">
                        <span>功能块:</span>
                        <span class="margin-left:10px;">{{detail.tagInfo.functionblock}}</span>
                    </el-col>
                    <el-col :span="6">
                        <span>报警级别:</span>
                        <span class="margin-left:10px;">{{detail.tagInfo.alarmLevel}}</span>
                    </el-col>
             </div>        
        </el-row>
        <el-row>
            <el-col :span="24">             
                    <div  class="grid-content bg-purple-dark">
                        <el-tabs type="card">
                            <el-tab-pane
                                v-for="(item, index) in detail.alarmSettings"
                                :key="item.id">
                                <div slot="label">
                                    <el-form-item 
                                    :prop="'alarmSettings.'+index+'.value'" :inline-message="true"
                                        :rules="[{ required: true, message: '请输入设定值', trigger: 'blur' }]">
                                        <span style="color: white">{{item.name}}</span>
                                        <el-input style="width:60px;" v-model="item.value" :disabled="checkRangeStatus(item.name,item.value)" ></el-input>
                                    </el-form-item>
                                </div>                           
                            </el-tab-pane>
                        </el-tabs>
                    </div>                    
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-tabs tab-position="left" type="border-card">
                    <el-tab-pane 
                        v-for="(item,index) in detail.alarmTypes" 
                        :label="item.name"
                        :key="item.id">
                        <el-row>
                            <div class="grid-content bg-purple-dark">
                                <el-col :span="8"><span>DCS优先级: High</span></el-col>
                                <el-col :span="8"><span>AAM优先级: High</span></el-col>
                                <el-col :span="8"><span>最后修改于: 2019-05-23 13:44:23</span></el-col>
                            </div>
                        </el-row>
                        <el-row>
                            
                                <el-col :span="24">
                                    <div class="grid-content bg-purple-dark" style="padding-right:10px;padding-top: 20px;padding-bottom: 1px;">
                                        <el-form-item :label-width="formLabelWidth" :label="msg.name" :key="msg.id" v-for="(msg,index) in item.advMsgs">
                                            <el-input  v-model="msg.value" auto-complete="off" ></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-form-item :label-width="formLabelWidth">
                    <el-button @click="handleSubmit" type="primary" size="small">保存</el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ASTEditor',
  data () {
    return {
      formLabelWidth: "150px",
      detail:{
          tagInfo:{
              tagName:'AT-U2620',
              comment:'Green Coke Sampling System',
              sh: 90,
              sl: 10,
              functionblock:'PVI',
              alarmLevel: 9
          },
          hierarchyInfo:{
              area:'CCU',
              unit:'U2621'
          },
          alarmSettings:[
              {id:1, name:'HH', value:0.380},
              {id:2, name:'PH', value:0.380},
              {id:3, name:'PL', value:0.000},
              {id:4, name:'LL', value:0.000},
              {id:5, name:'VL', value:0.380},
              {id:6, name:'DL', value:0.380},
              {id:7, name:'MH', value:0.380},
              {id:8, name:'ML', value:0.000}
          ],
          alarmTypes:[
              {
                  id:1,
                  name:'HH',
                  advMsgs:[
                      {id:1,name:'目的',value:'Green Coke Sampling System'},
                      {id:2,name:'后果',value:'Serious consequence.'},
                      {id:3,name:'验证步骤',value:'Look up in log files.'},
                      {id:4,name:'解决方法',value:'Restart service.'},
                      {id:5,name:'可能成因',value:'Low IO capabilities'}
                  ]
              },
               {
                  id:2,
                  name:'LL',
                  advMsgs:[
                      {id:1,name:'目的',value:'Green Coke Sampling System'},
                      {id:2,name:'后果',value:'Low battery'},
                      {id:3,name:'验证步骤',value:'Look up in log files.'},
                      {id:4,name:'解决方法',value:'Restart service.'},
                      {id:5,name:'可能成因',value:'Low Battery, re charge soon.'}
                  ]
              }
          ]   
      }
    }
  },
  methods:{
      handleSubmit() {
          this.$refs['form1'].validate((valid)=>{
              if(valid) {
                  this.$notify({
                      title:'提示',
                      message:'修改成功',
                      type:'success'
                  });
              }
          });
          return false;
      },
      clearFields() {
          var form1 = this.$refs['form1'].clearValidate();
      },
      checkRangeStatus(name,value) {
          console.log('alarm setting name: '+ name);
          console.log('alarm setting value: ' + value);
          return true;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;  
    
  }

  .grid-content span {
        text-align: center;
        line-height: 36px;
        margin-left: 10px;
    }


  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;

  }
</style>
