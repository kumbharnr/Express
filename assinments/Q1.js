var express = require("express");
var app = express();
var path = require("path");

// console.log(path.join(__dirname,"./public"));
// const loginpath = path.join(__dirname,"./public")

port=8000;
app.use(express.json());

app.post("/loginpage",(req,res)=>{
    console.log("logging into web page");
    var uid = req.query.uid;
    var pass = req.query.password;

    console.log(`the give UID :${uid} and password is :${pass}`);
    if (uid=="navnath" && pass=="admin")
    {
        res.send("your valid user");
    }
    res.send("Not valid crediantial please enter valid uid and password")

});

app.listen(port,()=>{
    console.log("server is listening at 8000");
});
