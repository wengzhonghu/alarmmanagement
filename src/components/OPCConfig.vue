<template>
  <div>
    <!-- v-loading="loading" 
    :element-loading-text="loadingText" -->
    <!-- header:button panel -->
    <div>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" @click="AddEntry" v-has="[opc.create]">添加</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- content: table -->
    <div>
      <el-table border :data="gridData">
        <el-table-column property="displayName" label="名称"></el-table-column>
        <el-table-column property="ip" label="IP"></el-table-column>
        <el-table-column property="aeProgId" label="AE Program Id"></el-table-column>
        <el-table-column property="daProgId" label="DA Program Id"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small" v-has="[opc.getbyid]">修改</el-button>
            <el-button @click="handleDelete(scope.row)" type="text" size="small" v-has="[opc.remove]">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- :before-close="handleClose" -->

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" :modal="true">
      <el-form :model="form" ref="form1">
        <el-form-item
          label="名称"
          prop="displayName"
          :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.displayName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="IP"
          prop="ip"
          :rules="[{ required: true, message: '请输入ip', trigger: 'blur' }]"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.ip" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="DA Program Id"
          prop="daProgId"
          :rules="[{ required: true, message: '请输入Program Id', trigger: 'blur' }]"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.daProgId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="AE Program Id"
          prop="aeProgId"
          :rules="[{ required: true, message: '请输入Program Id', trigger: 'blur' }]"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.aeProgId" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item
                  label="年龄"
                  prop="age"
                  :rules="[
                    { required: true, message: '年龄不能为空'},
                    { type: 'number', message: '年龄必须为数字值'}
                  ]"
                >
                  <el-input type="age" v-model.number="numberValidateForm.age" auto-complete="off"></el-input>
        </el-form-item>-->

        <el-form-item :label-width="formLabelWidth">
          <el-button type="primary" @click="submitForm">确定</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer"></span>
    </el-dialog>
  </div>
</template>

<script>

import http from '../util/http.js';
import * as opc from '../api/opc'

let myMixin = {
  data: function() {
    return { opc }
  }
}


export default {
  name: "OPCConfig",
  mixins: [myMixin],
  data: function() {
    //自定义验证规则
    // var validatePass = (rule, value, callback) => {
    //     if (value === '') {
    //       callback(new Error('请输入密码'));
    //     } else {
    //       if (this.ruleForm2.checkPass !== '') {
    //         this.$refs.ruleForm2.validateField('checkPass');
    //       }
    //       callback();
    //     }
    //   };
    //   var validatePass2 = (rule, value, callback) => {
    //     if (value === '') {
    //       callback(new Error('请再次输入密码'));
    //     } else if (value !== this.ruleForm2.pass) {
    //       callback(new Error('两次输入密码不一致!'));
    //     } else {
    //       callback();
    //     }
    //   };
    //   return {
    //     ruleForm2: {
    //       pass: '',
    //       checkPass: '',
    //       age: ''
    //     },
    //     rules2: {
    //       pass: [
    //         { validator: validatePass, trigger: 'blur' }
    //       ],
    //       checkPass: [
    //         { validator: validatePass2, trigger: 'blur' }
    //       ],
    //       age: [
    //         { validator: checkAge, trigger: 'blur' }
    //       ]
    //     }
    //   };

    return {
      // loading: false,
      // loadingText:'拼命加载中',
      dialogVisible: false,
      dialogVisible2: false,
      dialogTitle: "添加",
      gridData: [
        // {
        //   id: 1,
        //   displayName: "OPC43",
        //   ip: "192.168.6.43",
        //   aeProgId: "Yokogawa.ExaopcDACS1",
        //   daProgId: "Yokogawa.ExaopcAECS1"
        // },
        // {
        //   id: 2,
        //   displayName: "OPC38",
        //   ip: "10.130.36.38",
        //   aeProgId: "Yokogawa.ExaopcDACS1",
        //   daProgId: "Yokogawa.ExaopcAEVPCAMS1.1"
        // }
      ],
      form: {
        id: 0,
        displayName: "",
        ip: "",
        aeProgId: "",
        daProgId: ""
      },
      // { type: 'number', message: '只能输入数字', trigger: 'blur' },
      formLabelWidth: "150px"
    };
  },
  mounted() {
    var that = this;
    //that.loading = true;
    http.fetchGet('/opcconfig',{}, "加载OPC服务器列表")
    .then(data=>{
      that.gridData = data.data.result;
      //console.log(data);
      //that.loading  = false;
    }).catch(err=>{
       this.$notify({
              title: "获取数据失败",
              message: "获取数据失败: "+ err.message,
              type: "error"
            });
      //that.loading = false;
    });
  },
  methods: {
    handleClose(done) {
      this.$confirm("Are you sure to close this dialog?")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    AddEntry() {
      this.clearFields();
      this.dialogTitle = "添加";
      this.showDialog();
    },
    showDialog() {
      this.dialogVisible = true;
      
      //this.$refs["form1"].resetFields();
      this.$nextTick(function() {
         this.$refs['form1'].clearValidate();
      })
      
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    handleEdit(row) {
      console.log("handleClick: selected opc is: " + row.displayName);

      //call web api
      http.fetchGet(`/opcconfig/${row.id}`,{},'加载OPC服务器')
      .then(data=>
      {
        if(data.data.code == 0) {
            //edit
          this.dialogTitle = "编辑";
          this.form.id = row.id;
          this.form.displayName = row.displayName;
          this.form.ip = row.ip;
          this.form.aeProgId = row.aeProgId;
          this.form.daProgId = row.daProgId;
          this.showDialog();
        } else  {
          this.$notify({
            title:"获取失败",
            message:`获取OPC服务器失败:${data.data.message}`,
            type:"error"
          });
        }
      })
      .catch(err=>
      {
          this.$notify({
            title:'获取失败',
            message:`获取失败：${err.message}`,
            type:'error'
          })
      });
    },
    handleDelete(row) {
      console.log("handleDelete: selected opc is: " + row.displayName);
      this.$confirm("你确定要删除这个entry?", "tips", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(_ => {
          http.fetchDelete(`/opcconfig/${row.id}`)
          .then(data=>{
            if(data.data.code==0) {
               var index = this.gridData.indexOf(row);
                if (index != -1) {
                  this.gridData.splice(index, 1);
                  console.log("entry has been deleted.");
                  this.$notify({
                    title: "成功",
                    message: "已删除",
                    type: "success"
                  });
                } else {
                  this.$notify({
                    title: "删除失败",
                    message: "未找到条目",
                    type: "error"
                  });
                }
            }
            else {
              this.$notify({
                title:'删除失败',
                message: `删除失败:${data.data.message}`,
                type:'error'
              });
            }
          })
          .catch(err=>{
              this.$notify({
                title:'删除失败',
                message: `删除失败:${err.message}`,
                type:'error'
              });
          });

          done();
        })
        .catch(_ => {});
    },
    submitForm: function() {
      this.$refs["form1"].validate(valid => {
        if (valid) {
          //perform edit logic

          if (this.dialogTitle == "添加") {
            //perform add logic
            var newEntry = {};
            this.fill(newEntry);
            //call add web api
            http.fetchPost('/opcconfig',newEntry,'添加OPC服务器').then(data=>{
              if(data.data.code == 0) {
                  newEntry.id = data.data.result;
                  this.gridData.push(newEntry);
                  this.$notify({
                    title:'提示',
                    message: "添加成功",
                    type: "success"
                  });
              }
              else {
                    this.$notify({
                      title: "添加OPC服务器失败",
                      message: "添加OPC服务器失败: "+ data.data.message,
                      type: "error"
                    });
              }
            }).catch(err=>{
              this.$notify({
                      title: "添加OPC服务器失败",
                      message: "添加OPC服务器失败: "+ err.toString(),
                      type: "error"
                    });
            });
          } else {
            //perform edit logic
            var id = this.form.id;

            var item = this.gridData.find(e => {
              return e.id == id;
            });

            if (item) {
              
              let newEntry = {};
              this.fill(newEntry);

              // call edit web api
              http.fetchPut('/opcconfig', newEntry, '修改OPC服务器')
              .then(data=>{
                if(data.data.code==0) {
                  this.$notify({
                    title:'修改成功',
                    message:'修改OPC配置成功', 
                    type:'success'
                  });

                  this.fill(item);
                  this.closeDialog();
                }
                else {
                  this.$notify({
                    title:'修改失败',
                    message:'修改服务器配置失败',
                    type:'error'
                  });
                }
              })
              .catch(err=> {
                this.$notify({
                  title:'修改失败',
                  message:`修改服务器配置失败:${err.message}`,
                  type:'error'
                });
              });
            }else{
              this.$notify({
                title:'提示',
                message:'未找到entry',
                type:'error'
              });
              this.closeDialog();
            }
          }
          //this.closeDialog();
        } 

        return false;
      });
    },
    clearFields() {
      this.form.id = 0;
      this.form.displayName = "";
      this.form.ip = "";
      this.form.aeProgId = "";
      this.form.daProgId = "";
    },
    fill(o) {
      o.id = this.form.id;
      o.displayName = this.form.displayName;
      o.ip = this.form.ip;
      o.aeProgId = this.form.aeProgId;
      o.daProgId = this.form.daProgId;
    }
  }
};
</script>

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
  background: white;
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
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>


