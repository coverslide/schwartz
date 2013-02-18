'use strict'
void function(root, factory){
  if (typeof exports === 'object') {
    module.exports = factory()

  } else if (typeof define === 'function' && define.amd) {
      define(['sort_by'], factory)
  } else {
    var sort_by = factory()
    sort_by.bindToNative()
  }
}(this, function(){

  sort_by.bindToNative = function(){
    if(!Array.prototype.sort_by)
      Array.prototype.sort_by = function(cb){
        return sort_by(this, cb)
      }
  }

  return sort_by

  function sort_by(arr, cb){
    var comparison = null
    return arr.map(function(item){
      var schwartz_value = cb(item)
      if(!comparison)
        comparison = Array.isArray(schwartz_value) ? compare_arrays : compare
      return [schwartz_value, item]
    }).sort(function(x, y){
      return comparison(x[0], y[0])
    }).map(function(item){
      return item[1]
    })
  }

  function compare_arrays(x, y){
    for(var i = 0, l = x.length ; i < l ; i++){
      var compare_value = compare(x[i], y[i])
      if(compare_value != 0)
        return compare_value;
    }
    return 0;
  }

  function compare(a, b){
    if(typeof a == 'string' || typeof b == 'string')
      a=''+a,b=''+b
    return a < b ? -1 :  a > b ? 1 : 0
  }

})
