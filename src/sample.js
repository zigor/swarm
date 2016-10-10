'use strict';

import {} from './utils'

var _zero = new THREE.Vector3(0, 0, 0);
var _white = new THREE.Color().setRGB(1, 1, 1);

export default class Sample {
    constructor(count) {
        this._count = count;

        this._points = new Float32Array(count * 3);
        this._colors = new Float32Array(count * 3);

        this._pointRule = null;
        this._colorRule = null;

        this.setPointRule(function () { return _zero });
        this.setColorRule(function () { return _white });
    }

    setPointRule(producePointRule) {
        this._pointRule = producePointRule;

        for (var i = 0; i < this._count; i += 3) {

            var v3 = producePointRule();

            this._points[i] = v3.x;
            this._points[i + 1] = v3.y;
            this._points[i + 2] = v3.z;
        }

        return this;
    }

    setColorRule(produceColorRule) {
        this._colorRule = produceColorRule;

        for (var i = 0; i < this._count; i += 3) {

            var rgb = produceColorRule(new THREE.Vector3(this._points[i], this._points[i + 1], this._points[i + 2]));

            this._colors[i] = rgb.r;
            this._colors[i + 1] = rgb.g;
            this._colors[i + 2] = rgb.b;
        }

        return this;
    }

    get count() {
        return this._count;
    }

    get points() {
        return this._points.slice(0);
    }

    get colors() {
        return this._colors.slice(0);
    }
}