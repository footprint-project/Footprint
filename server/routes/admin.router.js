
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var pool = require('../modules/pool.js');


router.post('/', function(req, res) {
  console.log("BODY: ", req.body);
  var csv = req.body;

  pool.connect(function (err, db, done) {
      if (err) {
          console.log('Error connecting', err);
          res.sendStatus(500);
      } else {
          var queryText = 'INSERT INTO "trial_footprints" ("organization", "plane", "car", "train", "hotel", "fuel", "grid", "propane", "air", "sea", "truck", "freight_train") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);';
          db.query(queryText, ['no name', csv.plane, csv.car, csv.train_travel, csv.hotel, csv.fuel, csv.grid, csv.propane, csv.air, csv.sea, csv.truck, csv.train_shipping], function (err, result) {
              done();
              if (err) {
                  console.log('Error making query', err);
                  res.sendStatus(500);
              } else {
                  // console.log('result', result.rows);
                  res.sendStatus(201);
              }
          });
      }
  });
});





module.exports = router;
