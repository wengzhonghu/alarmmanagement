import Vue from 'vue'
import AllRoutesData from "../router/fullpath.js"
import * as utils from "./utils.js"

Vue.prototype.$_has = function(rArray) {
    let RequiredPermissions = [];
    let permission = true;
    let resourcePermission = utils.session('resourcePermissions');

    if(resourcePermission) 
    {
      if (Array.isArray(rArray)) {
        rArray.forEach(e => {
          if(e && e.p){
            RequiredPermissions = RequiredPermissions.concat(e.p);
          }
        });
      } else {
        if(rArray && rArray.p){
          RequiredPermissions = rArray.p;
        }     
      }
      
      for(let i=0;i<RequiredPermissions.length;i++){
        let p = RequiredPermissions[i];
        if (!resourcePermission[p]) {
          permission = false;
          break;
        }
      }
      
      return permission;
    }
    else  {
      return false;
    }
}

Vue.directive('has', {
  inserted: function(el, binding) {
    if (Vue.prototype.$_has && !Vue.prototype.$_has(binding.value)) {
      el.parentNode.removeChild(el);
    }
  }
});


var permUtils = {
    extendRoutes: function(routePermission) {

        //routePermission的格式如下
        /**
         * [
                    "/AlarmFrequency",
                    "/AlarmFrequency/Chart",
                    "/AlarmFrequency/ByArea",
                    "/AlarmFrequencyDrilldown"
            ]
         */
        // Filtering local routes, get actual routing
        
        let actualRouter = [];
        let findLocalRoute = function(array, base) {
          let replyResult = [];
          array.forEach(route => {
            let pathKey = (base ? base + '/' : '') + route.path;
            if (routePermission[pathKey]) {
              if (Array.isArray(route.children)) {
                route.children = findLocalRoute(route.children, (base ? base + '/' : '') + route.path);
              }
              replyResult.push(route);
            }
          });
          if (base) {
            return replyResult;
          } else {
            actualRouter = actualRouter.concat(replyResult);
          }
        }

        console.log(AllRoutesData[0].children);
        findLocalRoute(AllRoutesData[0].children);
        
        actualRouter = actualRouter.concat([{
          path: '*',
          redirect: '/404'
        }]);

        let originPath = utils.deepcopy(AllRoutesData[0]);
        originPath.children = actualRouter;
        

        return [originPath];
    }
};

export default permUtils

