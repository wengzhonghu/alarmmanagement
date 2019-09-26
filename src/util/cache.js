

function Cache() {
    this.data = {};
}

Cache.prototype.set= function(key,val) {
    this.data[key] = val;
};

Cache.prototype.get = function(key) {
    return this.data[key];
};

Cache.prototype.remove = function(key) {
    if(this.data[key]) {
        delete this.data[key];
    }
}



export default Cache

