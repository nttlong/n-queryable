function RequiredFields(message,fields){
    Error.call(message);
    this.fields=fields;
    this.code="requiredFields";
}
module.exports={
    RequiredFields: RequiredFields
};