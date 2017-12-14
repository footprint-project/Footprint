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
            var queryText = 'SELECT * FROM "countries";';
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
            var querytext = 'SELECT "period", "project_id", "hotel" + "fuel" + "grid" + "propane" as living_total, "air"+ "truck"+ "sea"+"freight_train" as shipping_total, "plane"+ "car"+ "train" as travel_total, "footprints"."id" as footprint_id, "projects"."user_id" as user_id FROM "projects" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "user_id"=2 ORDER BY "period";';
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

//Sum all entries from Footprint's own projects; compute the carbon footprint on client side:
router.get('/footprints_footprint', function(req, res) {
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT SUM("hotel") as hotel, SUM("fuel") as fuel, SUM("grid") as grid, SUM("propane") as propane, SUM("air") as air, SUM("truck") as truck, SUM("sea") as sea, SUM("freight_train") as freight_train, SUM("plane") as plane, SUM("car") as car, SUM("train") as train FROM "projects" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "user_id"=2;';
      db.query(queryText, [], function(err, result){
        done();
        if(err) {
          console.log('Error making query', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
});

// for the list of user projects on projects view
router.get('/userprojects/:userId', function (req, res) {
    console.log('user id', req.user);
    userId = req.user.id;
    console.log(userId);
    pool.connect(function (err, db, done) {
        if (err) {
            console.log('Error connecting', err);
            res.sendStatus(500);
        } else {
            var queryText = 'SELECT projects.*, array_agg(project_type.type_id) as projectTypes, array_agg(types.name) as names FROM projects JOIN project_type ON projects.id = project_type.project_id JOIN types ON project_type.type_id = types.id WHERE user_id = $1 GROUP BY projects.id;';
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
