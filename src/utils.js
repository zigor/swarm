'use strict';


if (!Float32Array.prototype.slice) {
    Float32Array.prototype.slice = function (start, end) {
        var that = this;
        if (end == undefined) end = that.length;
        var result = new ArrayBuffer(end - start);
        var resultArray = new Float32Array(result);
        for (var i = 0; i < resultArray.length; i++)
            resultArray[i] = that[i + start];
        return resultArray;
    }
}

