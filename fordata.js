var express = require('express');

var app = express();
app.use(express.json()) //optional for post method

// app.post('/login',function(req,res){ //get
//     console.log("At /login of server side");

//     var uid = req.body.uid; //change query to ody
//     var pwd = req.body.password;// same

//     console.log(`given data for User id :${uid} and Password is :${pwd}`);

//     var strToReturn = "your not a valid user please check credentials...";

//     if(uid =='navnath' && pwd =='nrk'){;
//         strToReturn = "Valid user";
//     }
//     res.send(strToReturn);
// });

app.get('/getAllData',function(req,res){
    console.log("In GET of /getAllData....");
    res.send("In GET of /getAllData......");

})

app.post("/insertEmployee",function(req,res){
    var empid  = req.body.empid;
    var name = req.body.name;
    var dept = req.body.dept;
    var designation = req.body.designation;

    console.log(`given data is : ${empid} ${name} ${dept} ${designation} `);

    res.send("In Post of /insertEmployee");

})

app.put("/updateEmployee",function(req,res){
    res.send("In PUT  of /updateEmployee");

})

app.delete("/deleteEmployee",function(req,res){
    res.send("In DELETE of /deleteEmployee");
})

app.listen(8000,function(){
    console.log("server is listening at http://localhost:8000");
})