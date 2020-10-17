const express = require("express");
const bodyparser = require('body-parser');
const app = express();
const messaging = require('./messaging-server')
var path = require('path');
var fs = require('fs');

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const uri = `mongodb+srv://KaiserNex:${process.env.DBPASSWORD}@a3-cluster.enhbv.mongodb.net/datatest?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true ,useUnifiedTopology: true});

let loginCollection = null
let scoreCollection = null

let verUser = null;

client.connect(err => {
  loginCollection = client.db("datatest").collection("Accounts")
  
});

app.use(express.static("views"));
app.use(express.static("public"));

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname+'/views/login.html'));
});


// https://expressjs.com/en/starter/basic-routing.html
//should display login.html but currently doesn't!!!
app.get("/", (request, response) => {
  response.sendFile("/views/login.html");
});

//Get request for game page
app.get("/game", (request, response) => {
  response.sendFile(__dirname + "/views/game.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

messaging.launchMessaging(listener)

//login script
app.post('/login', bodyparser.json(),(req, res) =>{
  console.log("Login");
  loginCollection.find({uname: req.body.uname}).toArray(function(err, result){
    if (err) throw err;
    if(result.length == 0){
        res.json({login: false})
    }
    else{
      if(req.body.psw == result[0].psw) {
        res.json({newu:false,login: true})
        verUser = req.body.uname;
      }
      else{
        res.json({login: false})
      }
    }
  })
})

//create new user script
app.post('/create', bodyparser.json(),(req, res) =>{
  loginCollection.find({uname: req.body.uname}).toArray(function(err, result){
    if (err) throw err;
    if(result.length == 0){
        loginCollection.insertOne({uname: req.body.uname, psw: req.body.psw, win: 0, loss: 0})
      .then( dbresponse => {
        console.log( dbresponse.ops[0].uname )
        res.json({newu: true,login: true});
          verUser = req.body.uname;
      })
    }
    else{
      res.json({newU: false, login: false});
    }
  })
})

app.post('/win', bodyparser.json(),(req, res)=>{
  console.log("Won");
  loginCollection.updateOne({uname:req.body.uname}, {$set: {win:(req.body.win+1)}});
})

app.post('/loss', bodyparser.json(),(req, res)=>{
  console.log("Loss");
  loginCollection.updateOne({uname:req.body.uname}, {$set: {loss:(req.body.loss+1)}});
})

app.post('/score', bodyparser.json(), (req, res)=> {
  console.log("We have been queried");
  loginCollection.find({uname:req.body.uname}).toArray(function(err, result){
    console.log(result[0].win);
     if (err) throw err;
    res.json({win: result[0].win, loss: result[0].loss});
  })
})
