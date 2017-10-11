var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

//Checklists status page
router.get('/', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            console.log('Error connecting to database', err);
            res.sendStatus(500);
        } else {
            client.query('SELECT customer_info.name, customer_info.year, customer_info.make, customer_info.model, customer_info.vin, customer_info.current_mileage, customer_info.service_requested, cars_checklist.checklist_status,cars_checklist.checklist_id FROM cars_checklist JOIN customer_info ON customer_info.customer_id=cars_checklist.customer_id WHERE NOT cars_checklist.checklist_status=\'finished\';',
                function (err, result) {
                    if (err) {
                        console.log('Error selecting checklists', err);
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                })
        }
    })
});

// Initial Checklist population
// Assuming that this is the first time mechanic has opened the checklist, checklist will populate with necessary information and is setting up for updates.
//This could also work with checklist histories(??)

//Basic checklist form
router.get('/:checklist_id', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            console.log('Error connecting to database', err);
            res.sendStatus(500);
        } else {
            client.query('SELECT customer_info.name, customer_info.year, customer_info.make, customer_info.model, customer_info.vin, customer_info.service_requested, customer_info.customer_id, customer_info.current_mileage, cars_checklist.* FROM cars_checklist JOIN customer_info ON customer_info.customer_id=cars_checklist.customer_id WHERE cars_checklist.checklist_id=$1;',
                [req.params.checklist_id],
                function (err, result) {
                    if (err) {
                        console.log('Error selecting checklist', err);
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows[0]);
                    }
                })
        }
    })
});

//Checklists are inserted when client has approved them for service
// Adding checklist to approved services
router.post('/addChecklist', function (req, res) {
    // only logged in users with admin roles can approve for service.
    if (req.isAuthenticated()) {
        if (req.user.role === 'admin') {
            var index = req.body.index;
            console.log("The put route for customers in requestService.router.js was hit to update status");
            //connecting to db
            pool.connect(function (errorConnectingToDatabase, client, done) {
                //checking the status of the connection
                if (errorConnectingToDatabase) {
                    //if the connection failed
                    console.log("error connecting to customer_info table in db: ", errorConnectingToDatabase);
                    res.sendStatus(500);
                } else {
                    //the connection is successful
                    client.query('INSERT INTO cars_checklist (customer_id, checklist_status) VALUES ((SELECT "customer_id" FROM "customer_info" WHERE "customer_id"=$1), \'ready\');',
                        [index],
                        function (err, result) {
                            done();
                            if (err) {
                                console.log('Error saving new checklist: ', err);
                                res.sendStatus(500);
                            } else {
                                res.sendStatus(200);
                            }
                        });
                }
            });
        } else {
            console.log('Not an admin');
            res.send('Current user is not an admin');
        }
    } else {
        console.log('Not logged in');
        res.send('Not logged in, cant approve for service');
    }
});

//NG-Change saves all information we pass automatically
router.put('/submit', function (req, res) {
    // only logged in users with admin roles can approve for service.
    if (req.isAuthenticated()) {
        if (req.user.role) {
            var checklist = req.body;
            //console.log('checklist in router', checklist)
            //connecting to db
            pool.connect(function (errorConnectingToDatabase, client, done) {
                //checking the status of the connection
                if (errorConnectingToDatabase) {
                    //if the connection failed
                    console.log("error connecting to cars_checklist table in db: ", errorConnectingToDatabase);
                    res.sendStatus(500);
                } else {
                    //the connection is successful
                    client.query('UPDATE cars_checklist SET headlights_high = $1, headlights_low = $2, parkinglights_front = $3, turnsignals_front = $4, taillights = $5, turnsignals_rear = $6, brakelights = $7, backup_lights = $8, licensetabs_expiration = $9, sparetirepressure = $10, currenttirepressure_lf = $11, currenttirepressure_rf = $12, currenttirepressure_lr = $13, currenttirepressure_rr = $14, finaltirepressure_lf = $15, finaltirepressure_rf = $16, finaltirepressure_lr = $17, finaltirepressure_rr = $18, tirecondition_lf = $19, tirecondition_rf = $20, tirecondition_lr = $21, tirecondition_rr = $22, wipercondition = $23, airfiltercondition = $24, brakefluid = $25, powersteeringfluid = $26, transmissionfluid = $27, oillevel = $28, washerfluid = $29, coolantlevel = $30, coolantlevel_strength = $31, radiatorhosecondition = $32, batterycondition = $33, serpentinebeltcondition = $34, otherbeltscondition = $35, lubehoodlatch = $36, shockstruttest = $37, frontwheelbearingtest = $38, tierodtest = $39, balljointtest = $40, controlarmcondition = $41, stabilizerbarlinkcondition = $42, cvbootcondition = $43, frontbrakecondition = $44, frontbrakecalipers = $45, reardiscbrakecondition = $46, rearbrakecalipers = $47, rearstabilizerbarlinkcondition = $48, torqueallwheelsremoved = $49, exhaustsystem = $50, enginescancodes = $51, oilchange = $52, addoil_amount = $53, addoil_weight = $54, oilfilter_brand = $55, oilfilter_number = $56, oiltype = $57, finishup_checklist = $58, vehicle_observations = $59, recommended_repairs = $60, repairs_declined = $61, parts_installed = $62, cost = $63, mechanics = $64, date_completed=now(), checklist_status=$66, drain_oil=$67, remove_filter_gasket=$68, install_drain_plug=$69, install_tighten_filter=$70, checkoil_plug=$71, check_filter=$72, oilchange_sticker=$73, checkoil_level = $74, oilcap_secure = $75,  start_idle = $76  WHERE checklist_id = $65;',
                        [
                            checklist.headlights_high,
                            checklist.headlights_low,
                            checklist.parkinglights_front,
                            checklist.turnsignals_front,
                            checklist.taillights,
                            checklist.turnsignals_rear,
                            checklist.brakelights,
                            checklist.backup_lights,
                            checklist.licensetabs_expiration,
                            checklist.sparetirepressure,
                            checklist.currenttirepressure_lf,
                            checklist.currenttirepressure_rf,
                            checklist.currenttirepressure_lr,
                            checklist.currenttirepressure_rr,
                            checklist.finaltirepressure_lf,
                            checklist.finaltirepressure_rf,
                            checklist.finaltirepressure_lr,
                            checklist.finaltirepressure_rr,
                            checklist.tirecondition_lf,
                            checklist.tirecondition_rf,
                            checklist.tirecondition_lr,
                            checklist.tirecondition_rr,
                            checklist.wipercondition,
                            checklist.airfiltercondition,
                            checklist.brakefluid,
                            checklist.powersteeringfluid,
                            checklist.transmissionfluid,
                            checklist.oillevel,
                            checklist.washerfluid,
                            checklist.coolantlevel,
                            checklist.coolantlevel_strength,
                            checklist.radiatorhosecondition,
                            checklist.batterycondition,
                            checklist.serpentinebeltcondition,
                            checklist.otherbeltscondition,
                            checklist.lubehoodlatch,
                            checklist.shockstruttest,
                            checklist.frontwheelbearingtest,
                            checklist.tierodtest,
                            checklist.balljointtest,
                            checklist.controlarmcondition,
                            checklist.stabilizerbarlinkcondition,
                            checklist.cvbootcondition,
                            checklist.frontbrakecondition,
                            checklist.frontbrakecalipers,
                            checklist.reardiscbrakecondition,
                            checklist.rearbrakecalipers,
                            checklist.rearstabilizerbarlinkcondition,
                            checklist.torqueallwheelsremoved,
                            checklist.exhaustsystem,
                            checklist.enginescancodes,
                            checklist.oilchange,
                            checklist.addoil_amount,
                            checklist.addoil_weight,
                            checklist.oilfilter_brand,
                            checklist.oilfilter_number,
                            checklist.oiltype,
                            checklist.finishup_checklist,
                            checklist.vehicle_observations,
                            checklist.recommended_repairs,
                            checklist.repairs_declined,
                            checklist.parts_installed,
                            checklist.cost,
                            checklist.mechanics,
                            checklist.checklist_id,
                            checklist.checklist_status,
                            checklist.drain_oil,
                            checklist.remove_filter_gasket,
                            checklist.install_drain_plug,
                            checklist.install_tighten_filter,
                            checklist.checkoil_plug,
                            checklist.check_filter,
                            checklist.oilchange_sticker,
                            checklist.checkoil_level,
                            checklist.oilcap_secure,
                            checklist.start_idle
                        ],
                        function (err, result) {
                            done();
                            if (err) {
                                console.log('Error saving new checklist: ', err);
                                res.sendStatus(500);
                            } else {
                                client.query('UPDATE customer_info SET name = $1, vin = $2, year = $3, make = $4, model = $5, current_mileage=$6 WHERE customer_id = $7;',
                                    [checklist.name, checklist.vin, checklist.year, checklist.make, checklist.model, checklist.current_mileage, checklist.customer_id],
                                    function (err, result) {
                                        if (err) {
                                            console.log('Error saving new checklist: ', err);
                                            res.sendStatus(500);
                                        } else {
                                            res.sendStatus(200);
                                        }
                                    });
                            }
                        });
                }
            });
        } else {
            console.log('Not an admin');
            res.send('Current user is not an admin');
        }
    } else {
        console.log('Not logged in');
        res.send('Not logged in, cant approve for service');
    }
});

module.exports = router;