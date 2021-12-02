const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
    res.send("GET route to things");
});
router.post('/',function(req,res){
    res.send("POST route to things")
});


module.exports= router;