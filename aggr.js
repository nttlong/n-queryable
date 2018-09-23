var expr=require("./expr");
var sync=require("./sync");
function aggr(db,name){
    this.db=db;
    this.name=name;
    this.__pipe=[];
}
aggr.prototype.project=function(){
    var fields;
    var  params=[];
    fields=arguments[0];
    for(var i=1;i<arguments.length;i++){
        params.push(arguments[i]);
    }

    var _project={};
    var _keys = Object.keys(fields);
    for (var i = 0; i < _keys.length;i++){
        _key = _keys[i];
        var _val = fields[_key];
        if(_val===1 || _val==0){
            _project[_key]=_val;
        }
        else if (typeof _val==="string") {
            var _expr=expr.filter(_val,params);
            _project[_key] = _expr;
        }
    }
    this.__pipe.push(
       { $project: _project}
    );
    return this;

};
aggr.prototype.items=function(cb){
    var me=this;
    function exec(cb){
        me.db.collection(me.name).aggregate(me.__pipe).toArray(function(e,r){
            me.__pipe =[];
            cb(e,r);
        });
    }
    if(cb) exec(cb);
    else {
        return sync.sync(exec,[]);
    }
};
aggr.prototype.item=function(cb){
    var me = this;
    function exec(cb) {
        me.db.collection(me.name).aggregate(me.__pipe).toArray(function (e, r) {
            me.__pipe = [];
            if(e) cb(e);
            else {
                if(r.length>0){
                    cb(null,r[0]);
                }
                else {
                    cb();
                }
            }
        });
    }
    if (cb) exec(cb);
    else {
        return sync.sync(exec, []);
    }
};
module.exports = function (db, name) {
    return new aggr(db, name);
};