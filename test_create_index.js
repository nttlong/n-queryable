var query=require("./index");
query.db("main","mongodb://root:123456@localhost:27017/hrm");
query.createValidator("test.test_index1")
.requiredFields("code")
.properties({
    phone: {
       bsonType: "string",
       message: "must be a string and is required"
    },
    name: {
       bsonType: "string",
       message: "must be a string and is required"
    }
 });

query.applyAllValidators(query.db("main"));

var coll=query.coll("main","test.test_index1");
try {
    coll.insert({code:"aaa",phone:1234567}).commit();
} catch (error) {
    console.log(error);
}
// var ret=query.getVersion("main");
ret=coll.getInfo();
console.log(ret);
var ret=coll.createIndex({
    code:1
});
console.log(ret);