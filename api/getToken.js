const express= require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs= require('fs');
var privateKey =fs.readFileSync('./private.key','utf8');
router.post('/',(req,res,next)=>{
    const Userdetails={
        name:req.body.name,
        age:req.body.age
    }
    const accessToken = jwt.sign({ name: Userdetails.name,age:Userdetails.age },privateKey,{ algorithm:'RS256',expiresIn:'1h'});
    res.status(201).json({
        messsage:'Jwt Token created',
        User :Userdetails,
        JwtToken : accessToken
    })
})

module.exports=router;