var p=require("./sync");
var expr=require("./expr");
var x=require("./index");
var cnn2 = "mongodb://sys:123456@localhost/kha";
var db=x.connect(cnn2);
var q=x.coll(db,"test");
var a=q.aggregate().project({
    Code:1,
    Name:"concat(Code,{0},Name)"
}," ");
a.match("contains(Name,{0})","123");

//q.where("_id==objectId({0})", "5ba7350b5c2bc29acca54dce");
//var ret=q.delete();
//console.log(ret);

//q.pull("MyScore=={0}",8).commit();
//q.where("elemMatch(items,quntity=={0} or MyScore>3)", 30);
//console.log(JSON.stringify(q.__where));
//q.where("_id==objectId({0})","5ba7350b5c2bc29acca54dce");
//q.push({items:{quntity:30}}).commit();
//q.push({Users:{username:"test",name:'test'}});
//q.commit();
console.log(a.items());
console.log(JSON.stringify(q.__where));



