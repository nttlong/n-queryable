var es=require("./es_query");
es.connect("main",[
    "https://n1rlchusq2:43a7ycvgmb@app-name-nttlong-8709556953.eu-west-1.bonsaisearch.net"
]);
var r=es.check("main");
console.log(r);
r=es.getAllIndexes("main");
console.log(r);
var fn=require("./clear_tress");
console.log(fn("Thử cái     coi"));