var express = require("express");
var Sequelize = require("sequelize");
var dbConfig = require("./db.config");

const app = express();
var sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host:dbConfig.HOST,
    dialect:dbConfig.dialect,
    pool:{
        min:dbConfig.pool.min,
        max:dbConfig.pool.max,
        acquire:dbConfig.pool.acquire,
        idle:dbConfig.pool.idle

    }
});

let EmployeeTable = sequelize.define('Employees',{
    emp_id:{
        primaryKey:true,
        type:Sequelize.INTEGER
    },
    name:Sequelize.STRING,
    dept:Sequelize.STRING,
    designation:Sequelize.STRING

},{
    timestamps:false,
    freezeTableName:true
});

    

app.get('/',(req,res)=>{
    console.log("at get of localhost:8000");
    res.send("hello.....")
})

//its get the all the in the table 
app.get('/getAllEmployee',(req,res)=>{
    EmployeeTable.findAll({raw:true}).then(data=>{
        console.log(data);
        res.status(200).send(data);

    }).catch(err=>{
        console.error("error is :"+err);
        res.status(400).send(err);
    })
})

//show data by id
app.get('/getAllEmployeeById/:id',(req,res)=>{
    var id = req.params.id;
    console.log("given id is :"+id);
    
    EmployeeTable.findByPk(id,{raw:true}).then(data=>{
        console.log(data);
        res.status(200).send(data);
    }).catch(err=>{
        console.error("error is :"+err);
        res.status(400).send(err);
    })
})

//insert the data into table 
app.use(express.json());
app.post("/insertData",(req,res)=>{
    var emp_id = req.body.emp_id;
    var name = req.body.name;
    var dept = req.body.dept;
    var designation = req.body.designation;

    var empObj = EmployeeTable.build({emp_id:emp_id,name:name,dept:dept,designation:designation});
    empObj.save().then(data=>{
        var strMsg = 'record is inserted ';
        res.status(201).send(strMsg);
    }).catch(err=>{
        console.error("error is :"+err);
        res.status(400).send(err);
    })
})

//update the records by id
app.put("/updateData",(req,res)=>{
    var emp_id = req.body.emp_id;
    var name = req.body.name;
    var dept = req.body.dept;
    var designation = req.body.designation;

    var empObj = EmployeeTable.update(
        {name:name,dept:dept,designation:designation},
        {where:{emp_id:emp_id}
    }).then(data=>{
            console.log("data");
            var strmsg = "data updated......";
            res.status(201).send(strmsg);
        }).catch(err=>{
            console.error("there is an error :"+err);
            res.status(400).send(err);
        })

});

//for deleting the data from table

app.delete("/deleteData/:id",(req,res)=>{
    console.log("enter deleteby the id");
    var id =req.params.id;
    console.log("given id is :"+id);

    EmployeeTable.destroy({where:{emp_id:id}}).then(data=>{
        console.log(data);
        var strMsg = "record is deleted now..";
        res.status(200).send(strMsg);
    }).catch(err=>{
        console.error("there is some error :"+err);
        res.status(400).send(err);
    })
})


app.listen(8000,()=>{
    console.log("server is listening at 8000");
})