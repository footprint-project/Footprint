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

//cheating -- this is not a post route, but i needed some data.
//req.body.view, i.e. the variable x, will be TYPES, COUNTRIES, or PROJECTS (**can't** do PERIODS, CATEGORIES like this):
//will be able to implement req.body.slice, i.e. variable y, like this as well!
router.post('/donut', function(req, res) {
  console.log("BODY: ", req.body);
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      var view, particular, slice;

      if (req.body.view == 'type') {
        //wait is this right?
        view = '"project_type"."type"."id"';
      } else if (req.body.view == 'project') {
        view = "projects";
      } else if (req.body.view == 'period') {
        view = "period";
      } else if (req.body.view == 'country') {
        view = "countries";
      } else if (req.body.view == 'category') {
        //what to do here?
      }

      if (req.body.slice == 'type') {
        slice = '"project_type"."type_id"';
      } else if (req.body.slice == 'project') {
        slice = '"projects"."name"';
      } else if (req.body.slice == 'period') {
        slice = '"project_type"."type_id"';
      } else if (req.body.slice == 'country') {
        slice = '"countries"."id"';
      } else if (req.body.slice == 'category') {
        //what to do?
      }
      var x = '"projects"';
      var y = '"period"';
      var queryText = 'SELECT "period", SUM("hotel") OVER (PARTITION BY ' + y + ') as hotel, SUM("fuel") OVER (PARTITION BY ' + y + ') as fuel, SUM("propane") OVER (PARTITION BY ' + y +') as propane, SUM("grid") OVER (PARTITION BY ' + y + ') as grid, SUM("air") OVER (PARTITION BY ' + y + ') as air, SUM("sea") OVER (PARTITION BY ' + y + ') as sea, SUM("truck") OVER (PARTITION BY ' + y + ') as truck, SUM("freight_train") OVER (PARTITION BY ' + y + ') as freight_train, SUM("car") OVER (PARTITION BY ' + y + ') as car, SUM("plane") OVER (PARTITION BY ' + y + ') as plane, SUM("train") OVER (PARTITION BY ' + y +
      ') as train FROM "countries" JOIN "projects" ON "countries"."id" = "projects"."country_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id" = "project_type"."type_id" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "users"."id" = $1 AND ' + x + '."id" = $2;';
      db.query(queryText, [3, 5], function(err, result){
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


router.get('/footprint_by_project', function(req, res) {
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT "projects"."name", SUM("hotel") OVER (PARTITION BY "projects"."name") as hotel, SUM("fuel") OVER (PARTITION BY "projects"."name") as fuel, SUM("propane") OVER (PARTITION BY "projects"."name") as propane, SUM("grid") OVER (PARTITION BY "projects"."name") as grid, SUM("air") OVER (PARTITION BY "projects"."name") as air, SUM("sea") OVER (PARTITION BY "projects"."name") as sea, SUM("truck") OVER (PARTITION BY "projects"."name") as truck, SUM("freight_train") OVER (PARTITION BY "projects"."name") as freight_train, SUM("car") OVER (PARTITION BY "projects"."name") as car, SUM("plane") OVER (PARTITION BY "projects"."name") as plane, SUM("train") OVER (PARTITION BY "projects"."name") as train FROM "countries" JOIN "projects" ON "countries"."id" = "projects"."country_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON ' +
      '"types"."id" = "project_type"."type_id" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON' + '"projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "users"."id" = 3;';
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


router.get('/footprint_by_period', function(req, res) {
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT "period", SUM("hotel") OVER (PARTITION BY "period") as hotel, SUM("fuel") OVER (PARTITION BY "period") as fuel, SUM("propane") OVER (PARTITION BY "period") as propane, SUM("grid") OVER (PARTITION BY "period") as grid, SUM("air") OVER (PARTITION BY "period") as air, SUM("sea") OVER (PARTITION BY "period") as sea, SUM("truck") OVER (PARTITION BY "period") as truck, SUM("freight_train") OVER (PARTITION BY "period") as freight_train, SUM("car") OVER (PARTITION BY "period") as car, SUM("plane") OVER (PARTITION BY "period") as plane, SUM("train") OVER (PARTITION BY "period") as train ' +
      'FROM "countries" JOIN "projects" ON "countries"."id" = "projects"."country_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id" = "project_type"."type_id" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "users"."id" = 3;';
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
