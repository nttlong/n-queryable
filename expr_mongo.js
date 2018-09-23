var fn=require("./parse_functions");
const operators = {
    ">": "$gt",
    ">=": "$gte",
    "<": "$lt",
    "<=": "$lte",
    "==": "$eq",
    "!=": "$ne",
    "*": "$multiply",
    "+": "$add",
    "-": "$subtract",
    "/": "$divide",
    "%": "$mod",
    "and": "$and",
    "or": "$or"

};
var functions ="contains,start,end,objectId,elemMatch";
function parseToMongo(fx,params,prefix){
    var ret ={}
    if (fx.type =="SymbolNode"){
        ret=fx.name;
        while (ret.indexOf("_$$$$_dot_$$$$_")>-1){
            ret = ret.replace("_$$$$_dot_$$$$_",".");
        }
        return (prefix) ? (prefix + ret) : ret;
    }
    if (fx.type == "ConstantNode"){
        return fx.value;
    }
    if (fx.type =="FunctionNode"){

        if(functions.indexOf(fx.name)>-1){
            return fn(fx,params,prefix,parseToMongo);

        }

        if(fx.name=="get_param"){
            return params[fx.args[0].value];
        }
        else if(fx.name=="expr"){
            return {
                "$expr": parseToMongo(fx.args[0], params)
            };
        }
        else {
            ret["$" + fx.name] = [];
            for (var i = 0; i < fx.args.length; i++) {
                var x = parseToMongo(fx.args[i], params,"$");
                ret["$" + fx.name].push(x);
            }
            return ret;
        }
        

    }
    if (fx.type =="OperatorNode"){
        
        var left = parseToMongo(fx.args[0], params);
        ret[left] = {};
        var right = parseToMongo(fx.args[1], params);
        if(typeof left=="string"){
            ret[left][operators[fx.op]] = right;
            if(fx.op==="=="){
                if (typeof right == "string") {
                    ret = {};
                    ret[left] = { $regex: new RegExp("^" + right + "$", "i") };
                    return ret;
                }
                else {
                    ret = {};
                    ret[left] =  right ;
                    return ret;
                }
            }
                
        }
        else {
            ret={}
            ret[operators[fx.op]]=[left,right];
        }
        
        return ret;
    }
    console.log(fx.type);

}
module.exports =parseToMongo;