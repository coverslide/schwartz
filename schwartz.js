void function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(['schwartz'], factory);
    } else {
        root.Schwartz = factory();
        root.Schwartz.useDaSchwartz();
    }
}(this, function(){
    'use strict';

    if (Array.isArray) {
        var isArray = Array.isArray;
    } else {
        var isArray = function (object) {
            return Object.prototype.toString.call(object) === '[object Array]';
        }
    }

    if (!Array.prototype.map) {
        //quick and dirty implementation, for ES3
        Array.prototype.map = function (cb) {
            var ret = [];
            for (var i = 0, l = this.length ; i < l ; i++) {
                ret.push(this[i] ? cb(this[i]) : undefined);
            }
            return ret;
        }
    }

    function schwartz(arr, cb){
        var comparison = null
        return arr.map(function(item){
            var schwartzValue = cb(item);
            return [schwartzValue, item];
        }).sort(function(x, y){
            return compare(x[0], y[0]);
        }).map(function(item){
            return item[1];
        });
    }

    function compare (a, b) {
        if (isArray(a) && isArray(b)) {
            return compareArrays(a, b);
        }
        if(typeof a == 'string' || typeof b == 'string') {
            a=''+a;
            b=''+b;
        }
        //TODO: test edge cases
        return a < b ? -1 : a > b ? 1 : 0;
    }

    //TODO: Ensure this is similar to ruby's array comparison
    function compareArrays(x, y){
        for (var i = 0, l = x.length ; i < l ; i++) {
            var compareValue = compare(x[i], y[i])
            if (compareValue != 0) {
                return compareValue;
            }
        }
        return 0;
    }

    schwartz.compare = compare;
    schwartz.compareArrays = compareArrays;

    schwartz.bindToNative = function(){
        if (!Array.prototype.schwartz) {
            Array.prototype.schwartz = function(cb){
                return schwartz(this, cb)
            }
        }
    }

    //ESSENTIAL
    schwartz.useDaSchwartz = schwartz.bindToNative;

    return schwartz;
})
