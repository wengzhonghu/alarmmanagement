
<template>
  <div>
    <div class="g-center login-page" @keyup.enter="login">
      <el-form class="login-form">
        <h1 class="main-title">AAS</h1>
        <p class="des">AAS</p>
        <el-form-item>
          <el-input
            :autofocus="true"
            placeholder="请输入账号"
            v-model="username">
            <template slot="prepend"><i class="el-icon-mobile-phone"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="password">
            <template slot="prepend"><i class="el-icon-info"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" @click.native="login" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
import * as utils from '../util/utils.js'
import permUtil from '../util/permissions.js'
import http from '../util/http.js'

//登录
const requestLogin = params => {
  let words = CryptoJS.enc.Utf8.parse(params.password);
  let base64 = CryptoJS.enc.Base64.stringify(words);
  params.password = base64;
  return http.fetchPost('/account/login',params, '登录中...');
};

export default {
  name:"Login",
  data() {
    return {
      username: '',
      password: '',
      isBtnLoading: false
    };
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '登录中...';
      return '登录';
    }
  },
  methods: {
    login() {

    let buildTables = function(data) {
        let result = {};

        data.forEach(e => {
          result[e] = true;
        });

      return result;

    }
    
      let token = null;

      var vm = this;
      if (!vm.username) {
        vm.$message.error('请填写用户名！！！');
        return;
      }
      if (!vm.password) {
        vm.$message.error('请填写密码');
        return;
      }

      let loginParams = {username: vm.username, password: vm.password};
      vm.isBtnLoading = true;
      requestLogin(loginParams)
      .then(res => {
        vm.isBtnLoading = false;
        if(res.data.code == 0){
          token = res.data.result;
          
          return http.fetchGet('/systemconfig/perms/1');
        }else{
            vm.isBtnLoading = false;
            this.$notify({
                title:'error',
                message:`login failed: ${res.data.message}`,
                type:'error'
            });
        }
      })
    .then(data=>{
      if(data.data.code==0) {
        utils.session("resourcePermissions", buildTables(data.data.result));
        return http.fetchGet('/systemconfig/sysmenus/1');
      }
      else  {
          this.$notify({
          title:'error',
          message:`get permission data failed: ${data.data.message}`,
          type:'error'
        });
      }
    })
    .then(data=>{
      if(data.data.code==0) {
        utils.session("menus", data.data.result);
        return http.fetchGet('/systemconfig/routes/1');
      }
      else  {
          this.$notify({
          title:'error',
          message:`get menus data failed: ${data.data.message}`,
          type:'error'
        });
      }
    })
  .then(data=>{
      if(data.data.code==0) {
             //根据用户权限得到路径后生成路由表
        let actualRoutes = permUtil.extendRoutes(buildTables(data.data.result));

        utils.session('token', token);

        http.addHeader("Authorization","Bearer " + token);
        
        this.$router.addRoutes(actualRoutes);

        vm.$router.push('/');
      }
      else  {
          this.$notify({
          title:'error',
          message:`get routes data failed: ${data.data.message}`,
          type:'error'
        });
      }
    })
    .catch(err => {
        vm.isBtnLoading = false;
        this.$notify({
            title:'error',
            message:`login failed: ${err.message}`,
            type:'error'
        });
      });
    }
  },
  created() {
    sessionStorage.clear();
  }
};
</script>

<style scoped>
  #app{display: table;width:100%;}
  .main-title{text-align: center;}
  .des{text-align: center;color:#999;margin-bottom: 2em;}
  .login-form{width: 400px;margin:13% auto 0;}
  .login-page{background:#fff;}
</style>
