const express= require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs= require('fs');
var publicKey =fs.readFileSync('./public.key','utf8');


router.get('/',(req,res,next)=>{
    const token = req.headers['authorization'];
   var verified= jwt.verify( token, publicKey, {algorithm:'RS256'},(err, authData)=>{
        if (err) 
        {
            res.status(404).json({
            messsage:err
        }) // eg. invalid token, or expired token
        
    }
    else
    {
        res.status(200).json({
            messsage:"verified",
            user:authData
        })
    }
})
        
    
})

module.exports=router;