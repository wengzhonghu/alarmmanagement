<template>
  <div v-loading="loading" 
    :element-loading-text="loadingText">
      <el-form  >
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <h1 style="line-height:36px;">Tag Upload</h1>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="选择OPC服务器">
                    <el-select v-model="selectedOPC"  placeholder="请选择">
                        <el-option
                        v-for="item in servers"
                        :key="item.id"
                        :label="item.displayName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-button type="primary"  @click="handleConnect">连接</el-button>
            </el-col>
        </el-row>          
      </el-form>
      <el-row>
          <el-col :span="24">
              <el-button type="primary"  @click="handleUpload">上传</el-button>
              <el-button type="primary" @click="handleRead">读取</el-button>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="4">
            <el-table border :data="stationsList" highlight-current-row  height="450px">
                <el-table-column property="name" label="名称"></el-table-column>
            </el-table>
          </el-col>
          <el-col :span="20">
            <el-table border :data="tagList" highlight-current-row  height="450px">
                <el-table-column property="name" label="名称"></el-table-column>
                <el-table-column property="desc" label="描述"></el-table-column>
                <el-table-column property="functionblock" label="功能块"></el-table-column>
                <el-table-column property="uploadStatus" label="更新状态"></el-table-column>
            </el-table>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import http from '@/util/http.js'
import qs from 'qs'

export default {
  name: 'TagUpload',
  data () {
    return {
      loading: false,
      loadingText:'拼命加载中',
      selectedTagIndex:-1,
      selectedOPC: null,
      stationsList:[
          {
              id:1,
              name:'FCS0101',
              desc:'fcs station 01'
          }
      ],
      tagList: [
          {
              id:1,
              name:'Tag1-1',
              desc:'Tag1-1 test',
              functionblock:'PVI'
          },
          {
              id:2,
              name:'Tag1-2',
              desc:'Tag1-2 test',
              functionblock:'PVI'
          },
          {
              id:3,
              name:'Tag1-3',
              desc:'Tag1-3 test',
              functionblock:'PVI'
          },
          {
              id:4,
              name:'Tag1-4',
              desc:'Tag1-4 test',
              functionblock:'PVI'
          },
          {
              id:5,
              name:'Tag1-5',
              desc:'Tag1-5 test',
              functionblock:'PVI'
          },
          {
              id:6,
              name:'Tag1-6',
              desc:'Tag1-6 test',
              functionblock:'PVI'
          }
      ],
      servers:[
        {
          id: 1,
          displayName: "OPC43",
          ip: "192.168.6.43",
          aeprogid: "Yokogawa.ExaopcDACS1",
          daprogid: "Yokogawa.ExaopcAECS1"
        },
        {
          id: 2,
          displayName: "OPC38",
          ip: "10.130.36.38",
          aeprogid: "Yokogawa.ExaopcDACS1",
          daprogid: "Yokogawa.ExaopcAEVPCAMS1.1"
        }
      ]
    }
  },
  methods:{
      handleConnect(){
          if(this.selectedOPC) {
              console.log(this.selectedOPC);
              this.loading = true;
              this.loadingText = '连接中';
              http.post('/tagupload/connect', qs.stringify({
                  id:this.selectedOPC,
                  //name:'adfadsf'
              })).then((resp)=>{
                  console.log(resp.data);
                  this.loading = false;
              }).catch((err)=>{
                  console.log(err);
                  this.loading = false;
              });
          }else{
              this.$notify({
                  type:"error",
                  message:'请选择OPC',
                  title:'提示'
              });
          }
      },
      handleUpload() {
          if(this.tagList && this.tagList.length > 0) {
              this.selectedTagIndex = 0;
              this.loading = true;
              console.log('begin upload.');
              this.uploadingTag();
          }
      },
      handleRead() {

      },
      updateUploadStatus(index,status) {
        var tag = this.tagList[index];
        if(tag) {
          //tag.uploadStatus = status?'更新成功':'更新失败' 这样添加属性不是响应式的
          this.$set(tag, 'uploadStatus', status?'更新成功':'更新失败');
        }
      },
      uploadingTag() {
          if(this.selectedTagIndex<this.tagList.length) {
                var tag = this.tagList[this.selectedTagIndex];
                this.loadingText = 'uploading ' + tag.name;
                http.post('/tagupload/upload', qs.stringify({
                    id:tag.id,
                    name:tag.name
                }))
                .then((resp)=>{
                    console.log(resp.data);

                    this.updateUploadStatus(this.selectedTagIndex,true);

                    //advance tag index
                    this.selectedTagIndex ++;
                    
                    this.uploadingTag();
                }).catch((err)=>{
                    console.log(err);
                    this.loading = false;
                    this.$notify({
                      type:"error",
                      message:"upload error: "+err.toString(),
                      title:"提示"
                    });
                });
          }
          else  {
              this.loading = false;
          }
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
