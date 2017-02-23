/**
  * Created by Suganya on 27-01-2017.
 */
var Sequelize=require('sequelize');
var express=require('express');
var bodyParser=require('body-parser');
var app=express();
app.use (express.static('public'));
app.use (express.static('node_modules'));
app.use(bodyParser());

var con =require("./connection");

// countries table defintion
var Countries=con.define('countries',
{
    id:{type:Sequelize.INTEGER,
        primaryKey:true,
        },
    sortname:{type:Sequelize.STRING},
    name:{type:Sequelize.STRING},
    phonecode:{type:Sequelize.INTEGER}
 });
//States table database
var States=con.define('states',
    {
        id:
        {type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{type:Sequelize.STRING},
        country_id:{type:Sequelize.INTEGER}
    });
//cities table defnition
var Cities=con.define('cities',
    {
        id:
        {type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{type:Sequelize.STRING},
        state_id:{type:Sequelize.INTEGER}
    });


//querying countries,state and cities table
var getCountries= function(req,res){
    var country=[],state=[],city=[];
    var returnData=function(err,data_cities)
    {
        data.cities=data_cities;
        console.log(data.cities);
        //res.send(data);
    };
    var return_cities = function(err,data_States) {
        state = data_States;
        console.log(state);
        Cities.findAndCountAll({attributes:['id','name','state_id']},{limit:1,raw:true}).then (function(result,err) {


            if (err) {
                console.log(err);
                console.log("not found")
            }
            else {


                var cities = result.rows;

                cities.forEach(function (city1) {

                    city.push(city1.dataValues);

                });
            returnData();
            //console.log(data)
            }})

    };



    var return_states= function(err,data_Countries) {
        country= data_Countries;
        States.findAndCountAll({attributes:['id','name','country_id']},{limit:1,raw:true}).then (function(result,err) {


            if (err) {
                console.log(err);
                console.log("not found")
            }
            else {


                var states = result.rows;

                states.forEach(function (state1) {

                    state.push(state1.dataValues);

                });

                
                return_cities(err,state);
            }})

    };



    Countries.findAndCountAll({attributes:['id','name']},{limit:1,raw:true}).then (function(result,err) {


        if (err) {
            console.log(err);
            console.log("not found")
        }
        else {


            var countries = result.rows;

            countries.forEach(function (country1) {

                country.push(country1.dataValues);

            });
             
            return_states(err,data);
        }})

    };

app.get("/onpageLoad",getCountries);
app.listen(3000);
console.log("listening to port 3000");

