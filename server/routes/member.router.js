var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var pool = require('../modules/pool.js');

router.get('/countries', function (req, res) {
    console.log('Get Countries');
    pool.connect(function (err, db, done) {
        if (err) {
            console.log("Error connecting: ", err);
            res.sendStatus(500);
        }
        else {
            var queryText = 'SELECT * FROM "countries"';
            db.query(queryText, function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error with country GET', errorMakingQuery)
                    res.sendStatus(501);
                } else {
                    res.send(result)
                }
            });

        }


    })
});

router.get('/linegraph', function(req,res){
    console.log('info for line graph');
    pool.connect(function (err, db, done) {
        if (err){
            console.log('error connecting', err);
            res.sendStatus(500);            
        }
        else {
            var querytext = 'SELECT "period", "project_id", "hotel" + "fuel" + "grid" + "propane" as living_total, "air"+ "truck"+ "sea" as shipping_total, "plane"+ "car"+ "train" as travel_total, "footprints"."id" as footprint_id, "projects"."user_id" as user_id FROM "projects" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "user_id"=2 ORDER BY "period"';
            db.query(querytext, function (errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    console.log('Error with Line Graph Get', errorMakingQuery)
                    res.sendStatus(501);
                } else{
                    res.send(result);
                }
            });
        }
    })
});

router.get('/footprints_footprint', function(req, res) {
  // console.log('get it boi', req.params.id);
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT SUM("hotel" + "fuel" + "grid" + "propane") as living_total, SUM("air"+ "truck"+ "sea") as shipping_total, SUM("plane"+ "car"+ "train") as travel_total FROM "projects" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "user_id"=2;';
      db.query(queryText, [], function(err, result){
        done();
        if(err) {
          console.log('Error making query', err);
          res.sendStatus(500);
        } else {
          // console.log(result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});

router.get('/userprojects/:userId', function (req, res) {
    console.log('user id', req.user);
    userId = req.user.id;
    console.log(userId);
    pool.connect(function (err, db, done) {
        if (err) {
            console.log('Error connecting', err);
            res.sendStatus(500);
        } else {
            var queryText = 'SELECT * from "projects" WHERE "user_id" = $1;';
            db.query(queryText, [userId], function (err, result) {
                done();
                if (err) {
                    console.log('Error making query', err);
                    res.sendStatus(500);
                } else {
                    console.log('result', result.rows);
                    res.send(result.rows);
                }
            });
        }
    });
});

module.exports = router;
