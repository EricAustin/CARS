var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js')


router.get('/', function (req, res) {
    console.log('get authorization route hit');
    if (req.isAuthenticated()) {
        pool.connect(function (err, client, done) {
            if (err) {
                console.log("Error connecting: ", err);
                res.sendStatus(500);
            }
            client.query("SELECT * FROM customer_info WHERE service_status = 'scheduled' order by date_of_request asc;",
                function (err, result) {
                    done;
                    if (err) {
                        console.log("Error inserting data: ", err);
                        res.sendStatus(500);
                    } else {
                        console.log('result.rows', result.rows);
                        res.send(result.rows)
                    }
                });
        })
    } else {
        // failure best handled on the server. do redirect here.
        console.log('not logged in');
        // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
        res.send(false);
    }
});

router.get('/:id', function (req, res) {
    console.log('get authorization route hit');
    if (req.isAuthenticated()) {
        pool.connect(function (err, client, done) {
            if (err) {
                console.log("Error connecting: ", err);
                res.sendStatus(500);
            }
            client.query("SELECT * FROM cars_checklist WHERE customer_id=$1;",
                [req.params.id],
                function (err, result) {
                    done;
                    if (err) {
                        console.log("Error inserting data: ", err);
                        res.sendStatus(500);
                    } else {
                        console.log('result.rows', result.rows);
                        res.send(result.rows)
                    }
                });
        })
    } else {
        // failure best handled on the server. do redirect here.
        console.log('not logged in');
        // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
        res.send(false);
    }
});

router.put('/', function (req, res) {
    console.log('/authorization router hit');
    console.log('req.body is', req.body);

    pool.connect(function (errorConnectingToDatabase, client, done) {
        //checking the status of the connection
        if (errorConnectingToDatabase) {
            //if the connection failed
            console.log("error connecting to customer_info table in db: ", errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            //the connection is successful
            client.query('UPDATE customer_info SET address=$1, alternative_phone=$2, cellphone=$3, city=$4, email_address=$5, make=$6, model=$7, name=$8, service_requested=$9, state=$10, vin=$11, year=$12, zip=$13  WHERE customer_id=$14;',
                [req.body.address, req.body.alternative_phone, req.body.cellphone, req.body.city, req.body.email_address, req.body.make, req.body.model, req.body.name, req.body.service_requested, req.body.state, req.body.vin, req.body.year, req.body.zip, req.body.customer_id],
                function (err, result) {
                    done();
                    if (err) {
                        console.log('Error updating customer info: ', err);
                        res.sendStatus(500);
                    } else {
                        client.query('UPDATE cars_checklist SET current_mileage=$1 WHERE customer_id=$2;',
                        [req.body.current_mileage, req.body.customer_id],
                        function (err, result) {
                            done();
                            if (err) {
                                console.log('Error updating customer info: ', err);
                                res.sendStatus(500);
                            } else {
                                res.sendStatus(200);
                            }
                        }
                    );
                    }
                }
            );
        }
    });
    // pool.connect(function (errorConnectingToDatabase, client, done) {
    //     //checking the status of the connection
    //     if (errorConnectingToDatabase) {
    //         //if the connection failed
    //         console.log("error connecting to customer_info table in db: ", errorConnectingToDatabase);
    //         res.sendStatus(500);
    //     } else {
    //         //the connection is successful

            
    //     }
    // });
});

module.exports = router;