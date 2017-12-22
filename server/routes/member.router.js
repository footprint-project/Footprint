
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var pool = require('../modules/pool.js');
//oh, i'm surprised it logs this:
console.log('member router');

var types = ['Health', "Food/Nutrition", "Education", 'Non-Food Items (NFI)', "Shelter", "Conflict", "Migration/Camp Management", "Faith-based", "Research", "Governance", "Business/Entrepreneur", "Donor"];

var months = ['January', "February", 'March', "April", 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


router.delete('/delete/:id', function(req, res) {
  console.log(req.params.id);

  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      var queryText = 'DELETE FROM "shipping" WHERE "footprint_id" = $1;';

      db.query(queryText, [req.params.id], function (errorMakingQuery, result) {
        if (errorMakingQuery) {
          console.log('Error with country GET', errorMakingQuery);
        } else {
          // console.log(result.rows[0]);
          queryText = 'DELETE FROM "living" WHERE "footprint_id" = $1;';
          db.query(queryText, [req.params.id], function (err, result) {
            done();
            if (err) {
              console.log(err);
            } else {

              queryText = 'DELETE FROM "travel" WHERE "footprint_id" = $1;';
              db.query(queryText, [req.params.id], function (err, result) {
                if (err) {
                  console.log(err);
                  res.sendStatus(500);
                } else {
                  queryText = 'DELETE FROM "footprints" WHERE "id" = $1;';
                  db.query(queryText, [req.params.id], function(err, result) {
                    done();
                    res.sendStatus(201);

                  });

                }
              });
            }
          });
        }
      });
    }
  });

});

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
          console.log('Error with country GET', errorMakingQuery);
          res.sendStatus(501);
        } else {
          res.send(result);
        }
      });
    }
  });
});


/**
* @api {post} /newproject Post new project
* @api NewProject
* @apiGroup User
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 201 OK
*/

//Posts a new project to the database, inserting into "projects" and "project_type":
router.post('/newproject', function(req, res) {
  console.log("BODY: ", req.body);
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT * FROM "countries" WHERE "countries"."name" = $1;';

      db.query(queryText, [req.body.selectedCountry], function (errorMakingQuery, result) {
        if (errorMakingQuery) {
          console.log('Error with country GET', errorMakingQuery);
        } else {
          console.log(result.rows[0]);
          queryText = 'INSERT INTO "projects" ("name", "user_id", "country_id") VALUES ($1, $2, $3) RETURNING id;';
          db.query(queryText, [req.body.projectName, req.user.id, result.rows[0].id], function (err, result) {
            done();
            if (err) {
              console.log(err);
            } else {
              console.log("ID: ", result.rows[0].id);

              for (var i=0; i<req.body.project.length - 1; i++) {
                var typeNow = types.indexOf(req.body.project[i]);
                queryText = 'INSERT INTO "project_type" ("project_id", "type_id") VALUES ($1, $2);';
                db.query(queryText, [result.rows[0].id, typeNow + 1], handlePost);
              }
              var typeNow2 = types.indexOf(req.body.project[req.body.project.length - 1]);
              queryText = 'INSERT INTO "project_type" ("project_id", "type_id") VALUES ($1, $2);';
              db.query(queryText, [result.rows[0].id, typeNow2 + 1], function (err, result) {
                done();
                if (err) {
                  console.log(err);
                  res.sendStatus(500);
                } else {
                  res.sendStatus(201);

                }
              });
            }
          });
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

/**
* @api {get} /allprojects Get user's projects
* @api UserProjects
* @apiGroup User
*
* @apiSuccessExample Success-Response:
* {
*   id: 2,
*   name: "Safe Tiger"
*   user_id: 2
*   }
*/

//Gets all of a user's projects to populate the dropdown in upload footprint modal:
router.get('/allprojects', function (req, res) {
  pool.connect(function (err, db, done) {
    if (err) {
      console.log("Error connecting for project footprints: ", err);
      res.sendStatus(500);
    }
    else {
      var queryText = 'SELECT * FROM "projects" WHERE user_id = $1';
      db.query(queryText, [req.user.id], function (errorMakingQuery, result) {
        done();
        if (errorMakingQuery) {
          console.log('Error with project footprints GET', errorMakingQuery);
          res.sendStatus(501);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
});

//Gets all of the user's footprints that are of a certain kind (e.g. all periods, all projects) to populate dropdown for bar graph, and for donut chart:
router.post('/bars', function(req, res) {
  console.log("BODY: ", req.body);
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      var queryText;
      if (req.body.view == 'period') {
        queryText = 'SELECT "period" as period FROM "projects" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" WHERE "users"."id" = $1 GROUP BY "period";';
      } else if (req.body.view == 'project') {
        queryText = 'SELECT "projects"."name" as project FROM "projects" JOIN "users" ON "users"."id" = "projects"."user_id" WHERE "users"."id" = $1;';
      } else if (req.body.view == 'country') {
        queryText = 'SELECT "countries"."name" as country FROM "projects" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "countries" ON "countries"."id" = "projects"."country_id" WHERE "users"."id" = $1;';
      } else if (req.body.view == 'type') {
        queryText = 'SELECT "types"."name" as type FROM "projects" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id"="type_id" WHERE "users"."id" = $1 GROUP BY "types"."name";';
      }
      db.query(queryText, [req.user.id], function (errorMakingQuery, result) {
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

//Gets the requested footprint data, summed into one row:
router.post('/bars_numbers', function(req, res) {
  console.log("BODY: ", req.body);
  var view;
  var particular;

  if (req.body.view == 'project') {
    view = 'projects';
  } else if (req.body.view == 'period') {
    view = 'periods';
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
        queryText = 'SELECT SUM(air) as air, SUM(truck) as truck, SUM(sea) as sea, SUM(freight_train) as freight_train, SUM(plane) as plane, SUM(car) as car, SUM(train) as train, SUM(hotel) as hotel, SUM(grid) as grid, SUM(propane) as propane, SUM(fuel) as fuel FROM "countries" JOIN "projects" ON "countries"."id" = "projects"."country_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id" = "project_type"."type_id" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "users"."id" = $1 AND "projects"."name" = ' + '\'' + req.body.particular + '\'' + ';';
      } else if (req.body.view == 'period') {
        var period = req.body.particular.slice(0, 10);
        queryText = 'SELECT SUM(air) as air, SUM(truck) as truck, SUM(sea) as sea, SUM(freight_train) as freight_train, SUM(plane) as plane, SUM(car) as car, SUM(train) as train, SUM(hotel) as hotel, SUM(grid) as grid, SUM(propane) as propane, SUM(fuel) as fuel FROM "countries" JOIN "projects" ON "countries"."id" = "projects"."country_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id" = "project_type"."type_id" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "users"."id" = $1 AND "period" = ' + '\'' + period + '\'' + ';';
      } else if (req.body.view == 'country') {
        queryText = 'SELECT SUM(air) as air, SUM(truck) as truck, SUM(sea) as sea, SUM(freight_train) as freight_train, SUM(plane) as plane, SUM(car) as car, SUM(train) as train, SUM(hotel) as hotel, SUM(grid) as grid, SUM(propane) as propane, SUM(fuel) as fuel FROM "countries" JOIN "projects" ON "countries"."id" = "projects"."country_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id" = "project_type"."type_id" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "users"."id" = $1 AND "countries"."name" = ' + '\'' + req.body.particular + '\'' + ';';
      } else if (req.body.view == 'type') {
        queryText = 'SELECT SUM(air) as air, SUM(truck) as truck, SUM(sea) as sea, SUM(freight_train) as freight_train, SUM(plane) as plane, SUM(car) as car, SUM(train) as train, SUM(hotel) as hotel, SUM(grid) as grid, SUM(propane) as propane, SUM(fuel) as fuel FROM "countries" JOIN "projects" ON "countries"."id" = "projects"."country_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id" = "project_type"."type_id" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "users"."id" = $1 AND "types"."name" = ' + '\'' + req.body.particular + '\'' + ';';
      }


      db.query(queryText, [req.user.id], function (errorMakingQuery, result) {
        done();
        if (errorMakingQuery) {
          console.log('Error with country GET', errorMakingQuery);
          res.sendStatus(501);
        } else {
          console.log(result.rows);
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


//Posts a footprint to "footprints", also inserting into "shipping", "travel" and "living":
router.post('/project_submit', function(req, res){
  var info = req.body.userInfo;
  var dataIn = req.body.dataIn;
  console.log("INFO: ", info, "DATA: ", dataIn);
  pool.connect(function (err, db, done) {
    if (err){
      console.log('error connecting', err);
      res.sendStatus(500);
    }
    else {
      var querytext = 'SELECT "projects"."id" as id FROM "projects" JOIN "users" ON "projects"."user_id" = "users"."id" WHERE "projects"."name" = $1 AND "users"."id" = $2;';
      db.query(querytext, [info[2].project, req.user.id], function(errorMakingQuery, result) {
        // done();
        if(errorMakingQuery){
          console.log('Error with FP POST', errorMakingQuery);
          res.sendStatus(501);
        } else {
          console.log(result.rows[0].id);
          var mon = info[0].selectedMonth;
          var month = months.indexOf(info[0].selectedMonth) + 1;
          if (mon == 'October' || mon == 'November' || mon == 'December') {
            // month = months.indexOf(info[0].selectedMonth) + 1;
          } else {
            month = '0' + month;
          }

          var per = info[1].selectedYear + '-' + month + '-01';
          queryText = 'INSERT INTO "footprints" ("period", "project_id") VALUES ($1, $2) RETURNING "id";';
          db.query(queryText, [per, result.rows[0].id], function(err, result) {
            if(err) {
              console.log(err);
            } else {
              console.log(result.rows[0].id);
              queryText = 'INSERT INTO "shipping" ("air", "sea", "truck", "freight_train", "footprint_id") VALUES ($1, $2, $3, $4, $5);';

              var dat = dataIn[0];
              var fpId = result.rows[0].id;
              db.query(queryText, [dat.air, dat.sea, dat.truck, dat.train_shipping, fpId], function(err, result) {
                if (err) {
                  console.log(err);
                } else {
                  queryText = 'INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES ($1, $2, $3, $4);';
                  db.query(queryText, [dat.plane, dat.car, dat.train_travel, fpId], function(err, result) {
                    if (err) {
                      console.log(err);
                    } else {
                      queryText = 'INSERT INTO "living" ("hotel", "grid", "fuel", "propane", "footprint_id") VALUES ($1, $2, $3, $4, $5)';
                      db.query(queryText, [dat.hotel, dat.grid, dat.fuel, dat.propane, fpId], function(err, result) {
                        done();
                        if (err) {
                          console.log(err);
                          res.sendStatus(501);
                        } else {
                          res.sendStatus(201);
                        }
                      });
                    }
                  });
                }
              });
              // res.sendStatus(201);
            }
          });
          // res.sendStatus(201);
        }
      });
    }
  });

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




//Gets all the compiled data for footprints of a certain kind (e.g. period) and sliced in a certain way (e.g. by category):
router.post('/donut', function(req, res) {
  console.log("BODY: ", req.body);
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      var view, particular, slice, queryText, array;

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

      particular = req.body.particular;
      blingArray = [req.user.id, particular];

      queryText = 'SELECT "period", "countries"."id" as country_id, "projects"."name", "project_type"."type_id", SUM("hotel") OVER (PARTITION BY ' + slice + ') as hotel, SUM("fuel") OVER (PARTITION BY ' + slice + ') as fuel, SUM("propane") OVER (PARTITION BY ' + slice +') as propane, SUM("grid") OVER (PARTITION BY ' + slice + ') as grid, SUM("air") OVER (PARTITION BY ' + slice + ') as air, SUM("sea") OVER (PARTITION BY ' + slice + ') as sea, SUM("truck") OVER (PARTITION BY ' + slice + ') as truck, SUM("freight_train") OVER (PARTITION BY ' + slice + ') as freight_train, SUM("car") OVER (PARTITION BY ' + slice + ') as car, SUM("plane") OVER (PARTITION BY ' + slice + ') as plane, SUM("train") OVER (PARTITION BY ' + slice +
      ') as train FROM "countries" JOIN "projects" ON "countries"."id" = "projects"."country_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id" = "project_type"."type_id" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "users"."id" = $1 AND ' + view + '."name" = $2;';

      if (req.body.slice == 'Category') {
        queryText = 'SELECT SUM("hotel") as hotel, SUM("fuel") as fuel, SUM("grid") as grid, SUM("propane") as propane, SUM("air") as air, SUM("sea") as sea, SUM("truck") as truck, SUM("freight_train") as freight_train, SUM("car") as car, SUM("plane") as plane, SUM("train") as train FROM "countries" JOIN "projects" ON "countries"."id" = "projects"."country_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id" = "project_type"."type_id" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "users"."id" = $1 AND ' + view + '."name" = $2;';
      }

      if (req.body.view == 'category') {
        blingArray = [req.user.id, 10000];
        queryText = 'SELECT "period", "countries"."id" as country_id, "projects"."name", "project_type"."type_id", SUM("hotel") OVER (PARTITION BY ' + slice + ') as hotel, SUM("fuel") OVER (PARTITION BY ' + slice + ') as fuel, SUM("propane") OVER (PARTITION BY ' + slice +') as propane, SUM("grid") OVER (PARTITION BY ' + slice + ') as grid, SUM("air") OVER (PARTITION BY ' + slice + ') as air, SUM("sea") OVER (PARTITION BY ' + slice + ') as sea, SUM("truck") OVER (PARTITION BY ' + slice + ') as truck, SUM("freight_train") OVER (PARTITION BY ' + slice + ') as freight_train, SUM("car") OVER (PARTITION BY ' + slice + ') as car, SUM("plane") OVER (PARTITION BY ' + slice + ') as plane, SUM("train") OVER (PARTITION BY ' + slice +
        ') as train FROM "countries" JOIN "projects" ON "countries"."id" = "projects"."country_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id" = "project_type"."type_id" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "users"."id" = $1 OR "users"."id" = $2;';
      }

      if (req.body.view == 'period') {
        var particularPeriod = '\'' + req.body.particular + '\'';
        blingArray = [req.user.id, 10000];
        queryText = 'SELECT "period", "countries"."id" as country_id, "projects"."name", "project_type"."type_id", SUM("hotel") OVER (PARTITION BY ' + slice + ') as hotel, SUM("fuel") OVER (PARTITION BY ' + slice + ') as fuel, SUM("propane") OVER (PARTITION BY ' + slice +') as propane, SUM("grid") OVER (PARTITION BY ' + slice + ') as grid, SUM("air") OVER (PARTITION BY ' + slice + ') as air, SUM("sea") OVER (PARTITION BY ' + slice + ') as sea, SUM("truck") OVER (PARTITION BY ' + slice + ') as truck, SUM("freight_train") OVER (PARTITION BY ' + slice + ') as freight_train, SUM("car") OVER (PARTITION BY ' + slice + ') as car, SUM("plane") OVER (PARTITION BY ' + slice + ') as plane, SUM("train") OVER (PARTITION BY ' + slice +
        ') as train FROM "countries" JOIN "projects" ON "countries"."id" = "projects"."country_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id" = "project_type"."type_id" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE (("users"."id" = $1) OR ("users"."id" = $2)) AND "period" =' + particularPeriod + ';' ;
      }

      if (req.body.view == 'period' && req.body.slice == 'Category') {
        var particularPeriod2 = '\'' + req.body.particular + '\'';
        blingArray= [req.user.id, 10000];
        queryText = 'SELECT SUM("hotel") as hotel, SUM("fuel") as fuel, SUM("grid") as grid, SUM("propane") as propane, SUM("air") as air, SUM("sea") as sea, SUM("truck") as truck, SUM("freight_train") as freight_train, SUM("car") as car, SUM("plane") as plane, SUM("train") as train FROM "countries" JOIN "projects" ON "countries"."id" = "projects"."country_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id" = "project_type"."type_id" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE (("users"."id" = $1) OR ("users"."id" = $2)) AND "period" =' + particularPeriod2 + ';' ;

      }

      db.query(queryText, blingArray, function(err, result){
        done();
        if(err) {
          console.log('Error making query', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
          console.log(result.rows);
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

//Slices total footprint of an organization by period, used for line graph on home page (FP's fp):
router.get('/footprints_footprint_by_period', function(req, res) {
  var userId = 1;
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT "period", SUM("hotel") OVER (PARTITION BY "period") as hotel, SUM("fuel") OVER (PARTITION BY "period") as fuel, SUM("propane") OVER (PARTITION BY "period") as propane, SUM("grid") OVER (PARTITION BY "period") as grid, SUM("air") OVER (PARTITION BY "period") as air, SUM("sea") OVER (PARTITION BY "period") as sea, SUM("truck") OVER (PARTITION BY "period") as truck, SUM("freight_train") OVER (PARTITION BY "period") as freight_train, SUM("car") OVER (PARTITION BY "period") as car, SUM("plane") OVER (PARTITION BY "period") as plane, SUM("train") OVER (PARTITION BY "period") as train ' +
      'FROM "countries" JOIN "projects" ON "countries"."id" = "projects"."country_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id" = "project_type"."type_id" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "users"."id" = $1;';
      db.query(queryText, [userId], function(err, result){
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

//Slices total footprint of an organization by period, used for line graph on home page (FP's fp):
router.get('/footprint_by_period', function (req, res) {

  if(req.isAuthenticated()) {
    var userId = req.user.id;
    pool.connect(function (err, db, done) {
      if (err) {
        console.log('Error connecting', err);
        res.sendStatus(500);
      } else {
        var queryText = 'SELECT "period", SUM("hotel") OVER (PARTITION BY "period") as hotel, SUM("fuel") OVER (PARTITION BY "period") as fuel, SUM("propane") OVER (PARTITION BY "period") as propane, SUM("grid") OVER (PARTITION BY "period") as grid, SUM("air") OVER (PARTITION BY "period") as air, SUM("sea") OVER (PARTITION BY "period") as sea, SUM("truck") OVER (PARTITION BY "period") as truck, SUM("freight_train") OVER (PARTITION BY "period") as freight_train, SUM("car") OVER (PARTITION BY "period") as car, SUM("plane") OVER (PARTITION BY "period") as plane, SUM("train") OVER (PARTITION BY "period") as train ' +
          'FROM "countries" JOIN "projects" ON "countries"."id" = "projects"."country_id" JOIN "project_type" ON "projects"."id" = "project_type"."project_id" JOIN "types" ON "types"."id" = "project_type"."type_id" JOIN "users" ON "users"."id" = "projects"."user_id" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "users"."id" = $1;';
        db.query(queryText, [userId], function (err, result) {
          done();
          if (err) {
            console.log('Error making query', err);
            res.sendStatus(500);
          } else {
            res.send(result.rows);
          }
        });
      }
    });
  } else {
    res.sendStatus(401);
  }

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
