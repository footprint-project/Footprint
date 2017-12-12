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

module.exports = router;