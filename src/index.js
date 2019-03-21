const express = require('express');
const morgan = require('morgan');
const path = require('path')
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
const {Mongoose} = require('./config/database')

//Middelewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
require('./routes/routes_task')(app);

//Statick Files
app.use(express.static(path.join(__dirname,'public')));

//init port
app.listen(app.get('port'), ()=>{
    console.log(`server on port ${app.get('port')}`);
})