require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const database = require('./database')
const isValidUrl = require('./validationUrl').isValidUrl

// Basic Configuration
const port = process.env.PORT || 3000;
const url = database.url
let latest = 1

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {
  if (!isValidUrl(req.body.url)) 
    res.json({"error": "invalid url"})
  else
    url.findOne().sort({short_url: -1}).exec((err, data) => {    

      if ((!err) && (data != undefined)) {
        latest = data.short_url + 1
      }

      url.findOne({"original_url": req.body.url}, (err, data) => {
        if ((!err)&&(data != undefined))
          res.json({
            "original_url": data.original_url,
            "short_url": data.short_url
          })
        else {
          const newUrl = new url({
            "original_url": req.body.url,
            "short_url": latest
          })
    
          newUrl.save((err, data) => {
            if (!err)
              res.json({
                "original_url": req.body.url,
                "short_url": latest
              })
          })
        }
      })
    })
})

app.get("/api/shorturl/:short_url", (req, res) => {
  url.findOne({"short_url": req.params.short_url}, (err, data) => {
    if((!err) && (data != undefined))
      res.redirect(data.original_url)
    else 
      res.send("URL not found")
  })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});