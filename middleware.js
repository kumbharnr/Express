var express = require('express');
var app = express();

// app.get('/trial/:name/:id',function(req,res){
//     res.send("the id you specified "+req.params.id + "and name"+req.params.name)
// });


//pre filter  --->actual code /actual code---->post filter

app.use((req,res,next)=>{
    console.log("In the pre filter code....URL :"+req.url +" method :"+req.method);
    next();

});

//actual route
app.get("/processData",function(req,res,next){
    console.log("In ProcessData route....");
    res.send("In /ProcessData route....");
    next();
})

//post filter of route /processdata

app.use("/processData",function(req,res,next){
    console.log("post filter of processData");

})

app.listen(8000,function(){
    console.log("server is listening at http://localhost:8000");
})