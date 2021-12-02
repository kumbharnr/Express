const express = require("express");
const app = express();

app.use(express.json());

app.post('/salary',(req,res)=>{
    var bas = req.body.bas;
    var HRA = req.body.HRA;
    var DA = req.body.DA;
    var IT = req.body.IT;
    var PF = req.body.PF;
    var total = bas + HRA +DA -(IT+PF);
    console.log("total salary is :"+total);
    res.send("your salary is :"+total);
});
app.listen(8000,()=>{
    console.log("server is listening at 8000");
})