const express = require("express");
const Sequelize = require("sequelize");
const dbConfig = require('../postgreSQlConn/db.config')
var app = express();

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


let InsuranceTable = sequelize.define('Insurances',{
    p_num:{
        primaryKey:true,
        type:Sequelize.INTEGER
    },
    P_H_Name:Sequelize.STRING,
    Amount:Sequelize.INTEGER,
    Maturity_amount:Sequelize.INTEGER,
    Nominee:Sequelize.STRING

},{
    timestamps:false,
    freezeTableName:true
});
// InsuranceTable.sync().then(()=>{
//         console.log("table is created ");
//     }).catch((err)=>{
//         console.error("error is "+err);
//     }).finally(()=>{
//         sequelize.close();
//     })
    
app.get('/',(req,res)=>{
    console.log("at get of localhost:8000");
    res.send("hello.....")
})
    
    //its get the all the in the table 
app.get('/getAllPolicy',(req,res)=>{
    InsuranceTable.findAll({raw:true}).then(data=>{
        console.log(data);
        res.status(200).send(data);
    
    }).catch(err=>{
        console.error("error is :"+err);
        res.status(400).send(err);
    })
});

app.get("/getInsuranceById/:id",(req,res)=>{
    var id =req.params.id;
    console.log("given id is :"+id);

    InsuranceTable.findByPk(id,{raw:true}).then(data=>{
        console.log(data);
        res.status(200).send(data);
    }).catch(err=>{
        console.error("error is "+err);
        res.status(400).send(err);
    });

    
});


app.use(express.json());
app.post("/InserNewRecord",(req,res)=>{
    var p_num = req.body.p_num;
    var P_H_Name = req.body.P_H_Name;
    var Amount = req.body.Amount;
    var Maturity_amount = req.body.Maturity_amount;
    var Nominee = req.body.Nominee;

    var insObj = InsuranceTable.build({p_num:p_num,P_H_Name:P_H_Name,Amount:Amount,
        Maturity_amount:Maturity_amount,Nominee:Nominee});
        insObj.save().then(data=>{
            console.log(data);
            var strMsg = "record has been added into the table...";
            res.status(201).send(strMsg);
        }).catch(err=>{
            console.error("error is :"+err);
            res.status(400).send(err);
        });
});

app.put("/updateInsurance",(req,res)=>{
    var p_num = req.body.p_num;
    var P_H_Name = req.body.P_H_Name;
    var Amount = req.body.Amount;
    var Maturity_amount = req.body.Maturity_amount;
    var Nominee = req.body.Nominee;

    InsuranceTable.update(
        {P_H_Name:P_H_Name,Amount:Amount,
        Maturity_amount:Maturity_amount,Nominee:Nominee},{where:{p_num:p_num}}
        ).then(data=>{
            console.log(data);
            var strMsg = "record is updated ....";
            res.status(201).send(strMsg);
        }).catch(err=>{
            console.log("error is :"+err);
            res.status(400).send(err);
        })
});

app.delete("/deleteById/:id",(req,res)=>{
    console.log("entering deleteEmployeeByid");
    var id =req.params.id;
    console.log("given id is :"+id);

    InsuranceTable.destroy({where:{p_num:id}}).then(data=>{
        console.log(data);
        var strMsg ="record deleted..... ";
        res.status(200).send(strMsg);
    }).catch(err=>{
        console.error("error is :"+err);
        res.status(400).send(err);
    })
})

let usersTable = sequelize.define('users',{
    uid:{
        primaryKey:true,
        type:Sequelize.INTEGER
    },
    pass:Sequelize.STRING

},{
    timestamps:false,
    freezeTableName:true
});
// usersTable.sync().then(()=>{
//         console.log("table is created ");
//     }).catch((err)=>{
//         console.error("error is "+err);
//     }).finally(()=>{
//         sequelize.close();
//     })

app.post("/login",(req,res)=>{
    var uid =req.body.uid;
    var pass = req.body.pass;

    fl = false;
    const Op = Sequelize.Op;

    usersTable.findAll({where:{[Op.and]:[{uid:uid},{pass:pass}]},
        raw:true,
    }).then((data)=>{
        console.log(data);
        console.log(typeof data);
        if(data){
            fl =true;
        }
    });
    if(fl){
        var strMsg="your valid user";
        res.status(201).send(strMsg);
    }else{
        var strMsg ="valid users enter correct details";
        res.status(401).send(strMsg);
    }

})

app.post("/register",(req,res)=>{
    var uid = req.body.uid;
    var pass = req.body.pass;
    
    var userObj = usersTable.build({uid:uid,pass:pass});
    userObj.save().then(data=>{
        var stri = "record is inserted";
        res.status(201).send(stri);
    }).catch(err=>{
        console.error("error is :"+err);
        res.status(400).send(err);
    })
})

app.listen(8000,()=>{
    console.log("server is listening at 8000");
})
