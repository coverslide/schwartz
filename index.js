'use strict'
void function(root, factory){
  if (typeof exports === 'object') {
    module.exports = factory()

  } else if (typeof define === 'function' && define.amd) {
      define(['sort_by'], factory)
  } else {
    var sort_by = factory()
    sort_by.bind$()
  }
}(this, function(){

  sort_by.bindToNative = function(){
    if(!Array.prototype.sort_by)
      Array.prototype.sort_by = function(cb){
        return sort_by(this, cb)
      }
  }

  sort_by.bind$ = function(){
    sort_by.bindToNative()

    //like native sort(), sorts in-place and returns undefined
    if(!Array.prototype.sort_by$)
      Array.prototype.sort_by$ = function(cb){
        var sorted = this.sort_by(cb)
        for(var i = 0, l = this.length ; i < l ; i++)
          this[i] = sorted[i]
      }
  }

  return sort_by

  function sort_by(arr, cb){
    var schwartzed = arr.map(function(item){
      var schwartz_value = cb(item)
      if(!Array.isArray(schwartz_value))
        throw new Error('Callback must return an array')
      return [schwartz_value, item]
    });

    // assume that all types are the same
    schwartzed.sort(function(x, y){
      if(Array.isArray(x))
        return compare_arrays(x[0], y[0])
      else
        return compare(x[0], x[1])
    });


    return schwartzed.map(function(item){
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
    return a < b ? -1 :  a > b ? 1 : 0
  }

})
