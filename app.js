const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");


const app=express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signUp.html")
});

app.post("/",function(req,res){
    const F_name=req.body.first_name;
    const last_name= req.body.last_name;
    const email = req.body.email;

    const data ={
        members:[
            {
              email_address: email,
              status : "subscribed"  ,
              merge_fields:{
                FNAME: F_name,
                LNAME :last_name
              }
            }
        ]
    };

    const jsonData= JSON.stringify(data);
    

    const url= "https://us8.api.mailchimp.com/3.0/lists/c0f8806c30";

    const options={
        method:"POST",
        auth:"hemant55:0b4a3b2c06992f1408c94218c84a14d4-us8"
    }

    const request1= https.request(url,options,function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");

        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });


    request1.write(jsonData);
    request1.end();


});

app.post("/failure",function(req,res){
    res.redirect("/")
});



app.listen(process.env.PORT||300,function(){
    console.log("Server has been started");
});


// api key__
// // api key__
// 0b4a3b2c06992f1408c94218c84a14d4-us8



// list_id
// c0f8806c30
