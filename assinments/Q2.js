let express = require("express");
let app = express();

const emp=[
    {ID:101,names:"navnath",dept:'cse',desi:'FS'},
    {ID:102,names:"varun",dept:'it',desi:'FS'}
]

app.get('/getAllEmp',(req,res)=>{
    res.send(emp);
});

app.get('/getEmpByID/:id',(req,res)=>{
    var id = req.params.id;
    res.send('your id is :'+id);

});
app.get('/getEmpByID/:name',(req,res)=>{
    var name = req.params.name;
    res.send('your id is :'+name);

});

app.post('/insertEmpData',(req,res)=>{
    emp.push(req.body);
    res.send("inserted");
});

app.put('/updateEmpData/:ID',(req,res)=>{
    var ia =req.params.ID;
    var index = -1;
    for(let i=0;i<emp.length;i++){
        if(emp[i].id==ia)
        {
            index = i;
            break;
        }
    } 
    if(index ==-1)
        res.send(index)=req.body;
        res.send("updated .....")
})

app.delete("/deleteData",(req,res)=>{
    var idd = req.params.ID;
    var fl = -1;
    for(let i=0;i<emp.length;i++){
        if(emp[i].id ===idd)
            fl = i;
            break;
    }

    if(fl==-1){
        res.send("not found")
    }
    else{
        emp.splice(fl,1);
        res.send("deleted ....")
    }
});

app.listen(8000,()=>{
    console.log("server is listening");
});