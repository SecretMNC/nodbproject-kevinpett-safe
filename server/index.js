const express = require('express'),
      bodyParser = require('body-parser'),
      axios = require('axios'),
      cors = require('cors'),
      secret = require('./config.js');

const app = express(),
      port = 8080;


//middleware-----------
app.use(bodyParser.json());
app.use(cors());


//endpoints------------

app.get('/api/getstarted/:search', (req,res) => {    
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${secret}&query=${req.params.search}`)
     .then(response => {
         res.status(200).send(response.data)
     })
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})