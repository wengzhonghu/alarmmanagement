export const session = function(key, value){
    if (value === void(0)) {
      var lsVal = sessionStorage.getItem(key);
      if(lsVal && lsVal.indexOf('autostringify-') === 0 ){
        return JSON.parse(lsVal.split('autostringify-')[1]);
      }else{
        return lsVal;
      }
    }else {
      if (typeof(value)==="object" || Array.isArray(value)) {
        value = 'autostringify-' + JSON.stringify(value);
      }
      return sessionStorage.setItem(key, value);
    }
} 


export const deepcopy = function (source) {
  if (!source) {
    return source;
  }
  let sourceCopy = source instanceof Array ? [] : {};
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item];
  }
  return sourceCopy;
};