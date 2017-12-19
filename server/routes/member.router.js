var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var pool = require('../modules/pool.js');
console.log('member router');

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

var types = ['Health', "Food/Nutrition", "Education", 'Non-Food Items (NFI)', "Shelter", "Conflict", "Migration/Camp Management", "Faith-Based", "Research", "Governance", "Business/Entrepreneur", "Donor"];

router.post('/newproject', function(req, res) {
  console.log("BODY: ", req.body);
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT * FROM "countries" WHERE "countries"."name" = $1;';

      db.query(queryText, [req.body.selectedCountry], function (errorMakingQuery, result) {
        // done();
        if (errorMakingQuery) {
          console.log('Error with country GET', errorMakingQuery);
          res.sendStatus(501);
        } else {
          console.log(result.rows[0]);
          queryText = 'INSERT INTO "projects" ("name", "user_id", "country_id") VALUES ($1, $2, $3) RETURNING id;';
          db.query(queryText, [req.body.projectName, req.user.id, result.rows[0].id], function (err, result) {
            done();
            if (err) {
              console.log(err);
              res.sendStatus(501);
            } else {
              console.log("ID: ", result.rows[0].id);
              for (var i=0; i<req.body.project.length - 1; i++) {
                var typeNow = types.indexOf(req.body.project[i]);
                queryText = 'INSERT INTO "project_type" ("project_id", "type_id") VALUES ($1, $2);';
                db.query(queryText, [result.rows[0].id, typeNow], handlePost);
              }
              var typeNow2 = types.indexOf(req.body.project[req.body.project.length - 1]);
              queryText = 'INSERT INTO "project_type" ("project_id", "type_id") VALUES ($1, $2);';
              db.query(queryText, [result.rows[0].id, typeNow2], function (err, result) {
                done();
                if (err) {
                  console.log(err);
                  res.sendStatus(500);
                } else {
                  res.sendStatus(201);

                }
              });
              // queryText = 'INSERT INTO "project_type" ("project_id", "type_id")'
            }
          });
          // res.send(result.rows);
        }
      });
    }
  });
});

function handlePost(err, result) {
  if (err) {
    console.log('whoops dog');
  } else {
    console.log('well done amigo');
  }
}





router.post('/bars', function(req, res) {
  console.log("BODY: ", req.body);
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      var queryText;
      if (req.body.view == 'period') {
        queryText = 'SELECT "period" as period FROM "projects" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" WHERE "users"."id" = 3 GROUP BY "period";';
      } else if (req.body.view == 'project') {
        queryText = 'SELECT "projects"."name" as project FROM "projects" JOIN "users" ON "users"."id" = "projects"."user_id" WHERE "users"."id" = 3;';
      } else if (req.body.view == 'country') {
        queryText = 'SELECT "countries"."name" as country FROM "projects" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "countries" ON "countries"."id" = "projects"."country_id" WHERE "users"."id" = 3;';
      } else if (req.body.view == 'type') {
        queryText = 'SELECT "types"."name" as type FROM "projects" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id"="type_id" WHERE "users"."id" = 3 GROUP BY "types"."name";';
      }
      db.query(queryText, function (errorMakingQuery, result) {
        done();
        if (errorMakingQuery) {
          console.log('Error with country GET', errorMakingQuery);
          res.sendStatus(501);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
});

router.post('/bars_numbers', function(req, res) {
  console.log("BODY: ", req.body);
  var view;
  var particular;
  if (req.body.view == 'project') {
    view = 'projects';
  } else if (req.body.view == 'period') {
    view = 'projects';
  } else if (req.body.view == 'country') {
    view = 'countries';
  } else if (req.body.view == 'type') {
    view = 'types';
  }
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      var queryText;
      if (req.body.view == 'project') {
          queryText = 'SELECT SUM(air) as air, SUM(truck) as truck, SUM(sea) as sea, SUM(freight_train) as freight_train, SUM(plane) as plane, SUM(car) as car, SUM(train) as train, SUM(hotel) as hotel, SUM(grid) as grid, SUM(propane) as propane, SUM(fuel) as fuel FROM "countries" JOIN "projects" ON "countries"."id" = "projects"."country_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id" = "project_type"."type_id" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "users"."id" = 3 AND "projects"."name" = ' + '\'' + req.body.particular + '\'' + ';';
      } else if (req.body.view == 'period') {
        var period = req.body.particular.slice(0, 10);
        queryText = 'SELECT SUM(air) as air, SUM(truck) as truck, SUM(sea) as sea, SUM(freight_train) as freight_train, SUM(plane) as plane, SUM(car) as car, SUM(train) as train, SUM(hotel) as hotel, SUM(grid) as grid, SUM(propane) as propane, SUM(fuel) as fuel FROM "countries" JOIN "projects" ON "countries"."id" = "projects"."country_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id" = "project_type"."type_id" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "users"."id" = 3 AND "period" = ' + '\'' + period + '\'' + ';';
      } else if (req.body.view == 'country') {
        queryText = 'SELECT SUM(air) as air, SUM(truck) as truck, SUM(sea) as sea, SUM(freight_train) as freight_train, SUM(plane) as plane, SUM(car) as car, SUM(train) as train, SUM(hotel) as hotel, SUM(grid) as grid, SUM(propane) as propane, SUM(fuel) as fuel FROM "countries" JOIN "projects" ON "countries"."id" = "projects"."country_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id" = "project_type"."type_id" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "users"."id" = 3 AND "countries"."name" = ' + '\'' + req.body.particular + '\'' + ';';
      } else if (req.body.view == 'type') {
        queryText = 'SELECT SUM(air) as air, SUM(truck) as truck, SUM(sea) as sea, SUM(freight_train) as freight_train, SUM(plane) as plane, SUM(car) as car, SUM(train) as train, SUM(hotel) as hotel, SUM(grid) as grid, SUM(propane) as propane, SUM(fuel) as fuel FROM "countries" JOIN "projects" ON "countries"."id" = "projects"."country_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id" = "project_type"."type_id" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "users"."id" = 3 AND "types"."name" = ' + '\'' + req.body.particular + '\'' + ';';
      }


      db.query(queryText, function (errorMakingQuery, result) {
        done();
        if (errorMakingQuery) {
          console.log('Error with country GET', errorMakingQuery);
          res.sendStatus(501);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
});


router.get('/project_footprints/:projectId', function (req, res) {
  console.log('Get Footprints');
  console.log('project id', projectId);
  var projectId = req.params.projectId;
  pool.connect(function (err, db, done) {
    if (err) {
      console.log("Error connecting for project footprints: ", err);
      res.sendStatus(500);
    }
    else {
      var queryText = 'SELECT * FROM "footprints" WHERE project_id = $1';
      db.query(queryText,[projectId], function (errorMakingQuery, result) {
        done();
        if (errorMakingQuery) {
          console.log('Error with project footprints GET', errorMakingQuery)
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

      if (req.body.slice == 'Type') {
        slice = '"project_type"."type_id"';
      } else if (req.body.slice == 'Project') {
        slice = '"projects"."name"';
      } else if (req.body.slice == 'Period') {
        slice = '"period"';
      } else if (req.body.slice == 'Country') {
        slice = '"countries"';
      }

      queryText = 'SELECT "period", "countries"."id" as country_id, "projects"."name", "project_type"."type_id", SUM("hotel") OVER (PARTITION BY ' + slice + ') as hotel, SUM("fuel") OVER (PARTITION BY ' + slice + ') as fuel, SUM("propane") OVER (PARTITION BY ' + slice +') as propane, SUM("grid") OVER (PARTITION BY ' + slice + ') as grid, SUM("air") OVER (PARTITION BY ' + slice + ') as air, SUM("sea") OVER (PARTITION BY ' + slice + ') as sea, SUM("truck") OVER (PARTITION BY ' + slice + ') as truck, SUM("freight_train") OVER (PARTITION BY ' + slice + ') as freight_train, SUM("car") OVER (PARTITION BY ' + slice + ') as car, SUM("plane") OVER (PARTITION BY ' + slice + ') as plane, SUM("train") OVER (PARTITION BY ' + slice +
      ') as train FROM "countries" JOIN "projects" ON "countries"."id" = "projects"."country_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id" = "project_type"."type_id" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "users"."id" = $1 AND ' + view + '."id" = $2;';

      if (req.body.slice == 'Category') {
        queryText = 'SELECT SUM("hotel") as hotel, SUM("fuel") as fuel, SUM("grid") as grid, SUM("propane") as propane, SUM("air") as air, SUM("sea") as sea, SUM("truck") as truck, SUM("freight_train") as freight_train, SUM("car") as car, SUM("plane") as plane, SUM("train") as train FROM "countries" JOIN "projects" ON "countries"."id" = "projects"."country_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id" = "project_type"."type_id" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "users"."id" = $1 AND ' + view + '."id" = $2;';
      }

      if (req.body.view == 'category') {
        queryText = 'SELECT "period", "countries"."id" as country_id, "projects"."name", "project_type"."type_id", SUM("hotel") OVER (PARTITION BY ' + slice + ') as hotel, SUM("fuel") OVER (PARTITION BY ' + slice + ') as fuel, SUM("propane") OVER (PARTITION BY ' + slice +') as propane, SUM("grid") OVER (PARTITION BY ' + slice + ') as grid, SUM("air") OVER (PARTITION BY ' + slice + ') as air, SUM("sea") OVER (PARTITION BY ' + slice + ') as sea, SUM("truck") OVER (PARTITION BY ' + slice + ') as truck, SUM("freight_train") OVER (PARTITION BY ' + slice + ') as freight_train, SUM("car") OVER (PARTITION BY ' + slice + ') as car, SUM("plane") OVER (PARTITION BY ' + slice + ') as plane, SUM("train") OVER (PARTITION BY ' + slice +
        ') as train FROM "countries" JOIN "projects" ON "countries"."id" = "projects"."country_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id" = "project_type"."type_id" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "users"."id" = $1 OR "countries"."id" = $2;';
      }

      if (req.body.view == 'period') {
        var particularPeriod = '\'' + req.body.particular + '\'';

        queryText = 'SELECT "period", "countries"."id" as country_id, "projects"."name", "project_type"."type_id", SUM("hotel") OVER (PARTITION BY ' + slice + ') as hotel, SUM("fuel") OVER (PARTITION BY ' + slice + ') as fuel, SUM("propane") OVER (PARTITION BY ' + slice +') as propane, SUM("grid") OVER (PARTITION BY ' + slice + ') as grid, SUM("air") OVER (PARTITION BY ' + slice + ') as air, SUM("sea") OVER (PARTITION BY ' + slice + ') as sea, SUM("truck") OVER (PARTITION BY ' + slice + ') as truck, SUM("freight_train") OVER (PARTITION BY ' + slice + ') as freight_train, SUM("car") OVER (PARTITION BY ' + slice + ') as car, SUM("plane") OVER (PARTITION BY ' + slice + ') as plane, SUM("train") OVER (PARTITION BY ' + slice +
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
