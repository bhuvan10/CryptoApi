const  express = require('express')
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser')
const getTokenRoutes = require('./api/getToken')
const secureRoutes = require('./api/secure')
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



app.use('/api/getToken',getTokenRoutes);
app.use('/api/secure',secureRoutes);

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status= 404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    })
})
module.exports=app;