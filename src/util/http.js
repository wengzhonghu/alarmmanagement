import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import  {Loading} from 'element-ui'
import * as utils from './utils.js'

var instance = axios.create({
    baseURL: 'http://localhost:3572/api', // api的base_url
    timeout: 15000 // 请求超时时间
  });
  
//instance.defaults.withCredentials = true;
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

instance.interceptors.request.use(config=>{
  //在发送前做某件事
  if (config.method === "post") {
    config.data = qs.stringify(config.data);
  }
  return config;
},(error)=>{
  console.log('error parameters.');
  return Promise.reject(error);
});



// http.interceptors.request.use(config=> {

//   let perms = utils.session('resourcePermissions');

//   if(perms) {
    
//     //已经排除了querystring
//     let urlname = config.url.replace(config.baseURL, '').split('?')[0];

//     //RESTful type 1 /path/**
//     let reg1 = urlname.match(/^(\/[^\/]+\/)[^\/]+$/);
//     if (reg1) {
//       urlname = reg1[1] + '*';
//     }
//     //RESTful type 2 /path/*/path
//     let reg2 = urlname.match(/^\/[^\/]+\/([^\/]+)\/[^\/]+$/);
//     if (reg2) {
//       urlname = urlname.replace(reg2[1], '*');
//     }

      
//       if (!perms[config.method + ',' + urlname]) {
        
//         return Promise.reject({
//           message: 'no permission'
//         });
//       }


//   }
//   else  {
//     // reject
//     return Promise.reject({
//       message: 'no permission'
//     });
//   }

// },(error)=>{
//   console.log('error parameters.');
//   return Promise.reject(error);
// });





instance.interceptors.response.use((res)=> {
  if(!res.data.success) {
    return Promise.resolve(res);
  }
  return res;
},(error)=> {
  console.log("网络异常");
  return Promise.reject(error);
});

Vue.prototype.$http = instance;
Vue.prototype.qs = qs;

export function fetchPut(url,params, loadingText) {
  let loadingbar = Loading.service({
    text:loadingText && loadingText !== ''?loadingText:"loading data...",
    target:"#contentArea"
  });
  return new Promise((resolve,reject)=> {
    instance
    .put(url,params)
    .then(response=> {
      resolve(response);
      Vue.nextTick(function() {
        loadingbar.close();
        console.log("put close then.");
      });
    },
    err=> {
      reject(err);
      Vue.nextTick(function() {
        loadingbar.close();
        console.log("put close err.");
      });
    })
    .catch((error)=>{
      reject(error);
      Vue.nextTick(function() {
        loadingbar.close();
        console.log("put close catch");
      });
    });
  });
}

export function fetchDelete(url,params, loadingText) {
  let loadingbar = Loading.service({
    text:loadingText && loadingText !== ''?loadingText:"loading data...",
    target:"#contentArea"
  });
  return new Promise((resolve,reject)=> {
    instance
    .delete(url)
    .then(response=> {
      resolve(response);
      Vue.nextTick(function() {
        loadingbar.close();
        console.log("delete close then.");
      });
    },
    err=> {
      reject(err);
      Vue.nextTick(function() {
        loadingbar.close();
        console.log("delete close err.");
      });
    })
    .catch((error)=>{
      reject(error);
      Vue.nextTick(function() {
        loadingbar.close();
        console.log("delete close catch");
      });
    });
  });
}



export function fetchPost(url,params, loadingText) {

  let loadingbar = Loading.service({
    text:loadingText && loadingText !== ''?loadingText:"loading data...",
    target:"#contentArea"
  });
  return new Promise((resolve,reject)=> {
    instance
    .post(url,params)
    .then(response=> {
      resolve(response);
      Vue.nextTick(function() {
        loadingbar.close();
        console.log("post close then.");
      });
    },
    err=> {
      reject(err);
      Vue.nextTick(function() {
        loadingbar.close();
        console.log("post close err.");
      });
    })
    .catch((error)=>{
      reject(error);
      Vue.nextTick(function() {
        loadingbar.close();
        console.log("post close catch");
      });
    });
  });
}

export function fetchGet(url,param,loadingText) {
  let loadingbar = Loading.service({
    text:loadingText && loadingText !== ''?loadingText:"loading data...",
    target:"#contentArea"
  });
  return new Promise((resolve,reject)=>{

    instance.get(url,{params:param})
      .then(response=>{
        resolve(response);
        Vue.nextTick(function() {
          loadingbar.close();
          console.log("get close then.");
        });
      },err=>{
        reject(err);
        Vue.nextTick(function() {
          loadingbar.close();
          console.log("get close err.");
        });
      })
      .catch(err=>{
        reject(err);
        Vue.nextTick(function() {
          loadingbar.close();
          console.log("get close catch.");
        });
      })
  });
}

export function addHeader(header,value) {
  instance.defaults.headers.common[header] = value;
}

export default {
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
  addHeader
}



/*

import Vue from 'vue'
import axios from 'axios'
import Qs from 'qs';


var instance = axios.create({
  //baseURL: 'https://some-domain.com/api/',
  timeout: timeout,
  responseType: 'json', // default,
  //headers: {'apikey': 'foobar'},
    transformRequest:function(data,headers){
     //为了避免qs格式化时对内层对象的格式化先把内层的对象转为
     //由于使用的form-data传数据所以要格式化
      if (typeof data == 'string') {
        
            headers.post['Content-Type'] = "application/json; charset=utf-8";
        
        }
      else if(!(data instanceof FormData)){
      headers.post['Content-Type'] = "application/x-www-form-urlencoded";
      
         for(let key in data){
            if(data[key]===undefined){
                data[key]=null;
            }
         }
         data = Qs.stringify(data);
    }

     return data;
    }
});
export default instance;  

Vue.prototype.$http=instance;
*/