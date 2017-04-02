'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var configAuth = require('../config/config');


const yelp = require('yelp-fusion');

// Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const clientId = configAuth.yelpAuth.Key;
const clientSecret = configAuth.yelpAuth.Secret;




router.get('/', function(req, res, next){
  res.render('index');
});

router.get('/results', function(req, res, next){
  res.render('results');
});

router.post('/results', function(req, res, next){
  const venue = req.body.place;
  const location = req.body.loc || "110 E Houston St, San Antonio, TX 78205";
  const radius = (req.body.radius)*1600 || 5*1600;
  console.log(venue);
  const searchRequest = {
    term: venue,
    location: location,
    radius: radius
  };
  yelp.accessToken(clientId, clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token);

    client.search(searchRequest).then(response => {
      const firstResult = response.jsonBody.businesses[0];
      const results = response.jsonBody.businesses;
      const prettyJson = JSON.stringify(firstResult, null, 4);
        res.render('results', {data: results});
        // console.log('dude: ', results);
    });
  }).catch(e => {
    console.log(e);
  });

});

module.exports = router;
