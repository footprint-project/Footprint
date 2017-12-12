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
                } else (
                    res.send(result)
                )
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

module.exports = router;
