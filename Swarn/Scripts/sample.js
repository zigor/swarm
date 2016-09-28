function Sample(count) {
    this.count = count;
    this.positions = new Float32Array(count * 3);
    this.colors = new Float32Array(count * 3);    
    this.positionRule = null;  
    this.colorRule = null;  
};

Sample.prototype = {

    setPositionRule: function (producePositionRule) {
        this.positionRule = producePositionRule;
        return this;
    },

    setColorRule: function(produceColorRule) {
        this.colorRule = produceColorRule;
        return this;
    },

    refresh: function() {
        
        for (var i = 0; i < this.count; i += 3) {

            var v3 = this.positionRule();
            
            this.positions[i] = v3.x;
            this.positions[i + 1] = v3.y;
            this.positions[i + 2] = v3.z;

            var rgb = this.colorRule(v3);

            this.colors[i] = rgb.r;
            this.colors[i + 1] = rgb.g;
            this.colors[i + 2] = rgb.b;
        }
    }
}

