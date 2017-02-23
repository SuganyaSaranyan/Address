'use strict';
var express=require('express');
var bodyParser=require('body-parser');
var app=express();
app.use (express.static('public'));
app.use(bodyParser());


var Sequelize=require('sequelize'),
sequelize = new Sequelize('address','root','root',
    {
        host:"localhost",
        dialect:'mysql'

    });

sequelize.authenticate().then( function(err){
    console.log("created");

},function(err){
    console.log("unable to connect",err)
});
module.exports= sequelize;

