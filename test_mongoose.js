var x=require("mongoose");
x.createConnection("mongodb://root:123456@localhost:27017/hrm").then(r=>{
    console.log(r);
})