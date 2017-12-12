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

module.exports = router;