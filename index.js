var express = require('express');
var app = express();
const port = 8000;

var things =require('./things.js');
app.use('/things',things);


app.get('/hello',function(req,res){
    res.send("HI THESE IS FIRST PROGRAM OF EXPRESS")
});
app.post("/hello",function(req,res){
    res.send("you called the post method at '/hello'")
})

app.listen(port,()=>{
    console.log(`example of express at http://localhost:${port}`);
})

