var x=require("mongoose");
var query=require("./index");
var models =require("./models")
// x.createConnection("mongodb://root:123456@localhost:27017/hrm").then(r=>{
//     console.log(r);
// });
// var db=query.connect("mongodb://root:123456@localhost:27017/hrm");
var uri="mongodb://root:123456@localhost:27017/hrm";
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var cnn=query.db("main",uri);
query.schema("test001","test.test001",{
    title:String,
    info:{
        type:Object,
        fields:{
            name:String,
            code:{
                type:String,
                required:true
            }
        },
        required:true
    }
});

var x=query.coll("main","test.test001");
var ret=x.insert({info:null}).commit();
// x.save({}).then(r=>{
//     console.log(r);
// })
// var c=x;
// query.schema({
//     title:String,
//     author:string,
//     body:string,
//     code:{
//         type:string,
//         required:true
//     }
// });
// schema definition
// var ASchema = new Schema({
//   startDate: {
//     type: Date,
//     required: true
//   },
//   endDate: {
//     type: Date,
//     required: true,
//     validate: [dateValidator, 'Start Date must be less than End Date']
//   }
// });
// var x=ASchema;
// var mongoose = require('mongoose');
//   var Schema = mongoose.Schema;

//   var blogSchema = new Schema({
//     title:  String,
//     author: String,
//     body:   String,
//     comments: [{ body: String, date: Date }],
//     date: { type: Date, default: Date.now },
//     info: new Schema({
//         code:{type:String}
//     }),
//     hidden: Boolean,
//     meta: {
//       votes: Number,
//       favs:  Number
//     },
//     phone: {
//         type: String,
//         validate: {
//           validator: function(v) {
//             return /\d{3}-\d{3}-\d{4}/.test(v);
//           },
//           message: props => `${props.value} is not a valid phone number!`,
//           code:'invalidate'
//         },
//         required: [true, 'User phone number required']
//       }
//   });
//   var x=blogSchema;
// var Blog = cnn.model('test.Blog', blogSchema);
// var b=new Blog();
// // b.phone="dasdasd";
// b.info="XXX";
// var x=b.validateSync();

// // function that validate the startDate and endDate
// function dateValidator(value) {
//   // `this` is the mongoose document
//   return this.startDate <= value;
// }