const express = require('express');

const bodyParser= require('body-parser')

const app = express();

const MongoClient = require('mongodb').MongoClient;



app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
console.log('May Node be with you')




  app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => 
    {
        if (err) return console.log(err)
            res.render('index.ejs',{messages:result})})
    
  })


  app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
      if (err) return console.log(err)
  
      console.log('saved to database')
      res.redirect('/')
    })
  })
  


  MongoClient.connect('mongodb://sidgore:sidgore@sidmongo-shard-00-00-uesva.mongodb.net:27017,sidmongo-shard-00-01-uesva.mongodb.net:27017,sidmongo-shard-00-02-uesva.mongodb.net:27017/ram?ssl=true&replicaSet=SidMongo-shard-0&authSource=admin', (err, database) => {
    if (err) return console.log(err)
        db = database
        app.listen(3000, () => {
          console.log('listening on 3000')
        })
      })