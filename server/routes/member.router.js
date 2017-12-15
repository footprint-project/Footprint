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

router.post('/project_submit', function(req, res){
  console.log(req.body);
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

//Sum all entries from Footprint's own projects; we will compute the carbon footprint on client side:
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
//we need to talk about which combinations are actually salient:
router.post('/donut', function(req, res) {
  console.log("BODY: ", req.body);
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      var view, particular, slice, queryText;

      if (req.body.view == 'type') {
        view = '"types"';
      } else if (req.body.view == 'project') {
        view = "projects";
      } else if (req.body.view == 'country') {
        view = "countries";
      }

      if (req.body.slice == 'type') {
        slice = '"project_type"."type_id"';
      } else if (req.body.slice == 'project') {
        slice = '"projects"."name"';
      } else if (req.body.slice == 'period') {
        slice = '"period"';
      } else if (req.body.slice == 'country') {
        slice = '"countries"';
      }

      queryText = 'SELECT "period", "projects"."name", "project_type"."type_id", SUM("hotel") OVER (PARTITION BY ' + slice + ') as hotel, SUM("fuel") OVER (PARTITION BY ' + slice + ') as fuel, SUM("propane") OVER (PARTITION BY ' + slice +') as propane, SUM("grid") OVER (PARTITION BY ' + slice + ') as grid, SUM("air") OVER (PARTITION BY ' + slice + ') as air, SUM("sea") OVER (PARTITION BY ' + slice + ') as sea, SUM("truck") OVER (PARTITION BY ' + slice + ') as truck, SUM("freight_train") OVER (PARTITION BY ' + slice + ') as freight_train, SUM("car") OVER (PARTITION BY ' + slice + ') as car, SUM("plane") OVER (PARTITION BY ' + slice + ') as plane, SUM("train") OVER (PARTITION BY ' + slice +
      ') as train FROM "countries" JOIN "projects" ON "countries"."id" = "projects"."country_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id" = "project_type"."type_id" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "users"."id" = $1 AND ' + view + '."id" = $2;';

      if (req.body.slice == 'category') {
        queryText = 'SELECT SUM("hotel") as hotel, SUM("fuel") as fuel, SUM("grid") as grid, SUM("propane") as propane, SUM("air") as air, SUM("sea") as sea, SUM("truck") as truck, SUM("freight_train") as freight_train, SUM("car") as car, SUM("plane") as plane, SUM("train") as train FROM "countries" JOIN "projects" ON "countries"."id" = "projects"."country_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id" = "project_type"."type_id" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "users"."id" = $1 AND ' + view + '."id" = $2;';
      }

      if (req.body.view == 'category') {
        if (req.body.particular == 'shipping') {

        } else if (req.body.particular == 'living') {

        } else if (req.body.particular == 'travel') {

        }
      }

      if (req.body.view == 'period') {
        var particularPeriod = '\'' + req.body.particular + '\'';

        queryText = 'SELECT "period", "projects"."name", "project_type"."type_id", SUM("hotel") OVER (PARTITION BY ' + slice + ') as hotel, SUM("fuel") OVER (PARTITION BY ' + slice + ') as fuel, SUM("propane") OVER (PARTITION BY ' + slice +') as propane, SUM("grid") OVER (PARTITION BY ' + slice + ') as grid, SUM("air") OVER (PARTITION BY ' + slice + ') as air, SUM("sea") OVER (PARTITION BY ' + slice + ') as sea, SUM("truck") OVER (PARTITION BY ' + slice + ') as truck, SUM("freight_train") OVER (PARTITION BY ' + slice + ') as freight_train, SUM("car") OVER (PARTITION BY ' + slice + ') as car, SUM("plane") OVER (PARTITION BY ' + slice + ') as plane, SUM("train") OVER (PARTITION BY ' + slice +
        ') as train FROM "countries" JOIN "projects" ON "countries"."id" = "projects"."country_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id" = "project_type"."type_id" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE ("users"."id" = $1 OR "projects"."id" = $2) AND "period" =' + particularPeriod + ';' ;
      }

      db.query(queryText, [3, 4], function(err, result){
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

//slices a user's total footprint by projects..which now that I think about it is not the most useful thing, but it is a skeleton for more useful things:
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

//slices total footprint of an organization by period, used for line graph:
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
