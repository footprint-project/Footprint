
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var pool = require('../modules/pool.js');


router.post('/', function(req, res) {
  // console.log("BODY: ", req.body);
  var csv = req.body;

  pool.connect(function (err, db, done) {
      if (err) {
          console.log('Error connecting', err);
          res.sendStatus(500);
      } else {
          var queryText = 'INSERT INTO "trial_footprints" ("organization", "plane", "car", "train", "hotel", "fuel", "grid", "propane", "air", "sea", "truck", "freight_train") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);';
          db.query(queryText, [csv.organization, csv.plane, csv.car, csv.train_travel, csv.hotel, csv.fuel, csv.grid, csv.propane, csv.air, csv.sea, csv.truck, csv.train_shipping], function (err, result) {
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

router.get('/users', function (req, res) {
  // console.log('Get users');
  pool.connect(function (err, db, done) {
    if (err) {
      console.log("Error connecting: ", err);
      res.sendStatus(500);
    }
    else {
      var queryText = 'SELECT "organization", SUM("hotel") as hotel, SUM("propane") as propane, SUM("fuel") as fuel, SUM("grid") as grid, SUM("air") as air, SUM("sea") as sea, SUM("truck") as truck, SUM("freight_train") as freight_train, SUM("train") as train, SUM("car") as car, SUM("plane")as plane FROM "users" JOIN "projects" ON "projects"."user_id" = "users"."id" JOIN "footprints" ON "footprints"."project_id" = "projects"."id" JOIN "shipping" ON "shipping"."footprint_id" = "footprints"."id" JOIN "living" ON "living"."footprint_id" = "footprints"."id" JOIN "travel" ON "travel"."footprint_id" = "footprints"."id" GROUP BY "organization";';
      db.query(queryText, function (errorMakingQuery, result) {
        var totals = result.rows;
        if (errorMakingQuery) {
          console.log('Error with users GET', errorMakingQuery);
          res.sendStatus(501);
        } else {
          var queryText2 = 'SELECT "username", "organization", "name", "position" FROM "users";';
          db.query(queryText2, function(err, result) {
            if (err) {
              console.log(err);
              res.sendStatus(501);
            } else {
              var otherStuff = result.rows;
              var data = {totals: totals, otherStuff: otherStuff};
              res.send(data);
            }
          });
        }
      });
    }
  });
});



module.exports = router;
