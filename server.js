const express = require("express");
const bodyparser = require('body-parser');
const app = express();

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const uri = `mongodb+srv://KaiserNex:${process.env.DBPASSWORD}@a3-cluster.enhbv.mongodb.net/datatest?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });

let loginCollection = null

client.connect(err => {
  loginCollection = client.db("datatest").collection("Accounts")
});


app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

app.post('/login', bodyparser.json(),(req, res) =>{
  loginCollection.find({uname: req.body.uname}).toArray(function(err, result){
    if (err) throw err;
    if(result.length == 0){
        res.json({login: false})
    }
    else{
      if(req.body.psw == result[0].psw) {
        res.json({newu:false,login: true})
      }
      else{
        res.json({login: false})
      }
    }
  })
})

app.post('/create', bodyparser.json(),(req, res) =>{
  loginCollection.find({uname: req.body.uname}).toArray(function(err, result){
    if (err) throw err;
    if(result.length == 0){
        loginCollection.insertOne({uname: req.body.uname, psw: req.body.psw})
      .then( dbresponse => {
        console.log( dbresponse.ops[0].uname )
        res.json({newu: true,login: true})
      })
    }
    else{
      res.json({newU: false, login: false});
    }
  })
})
