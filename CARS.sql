--DB setup, copy, paste and CMD+ENTER for blankDB slate
--Create a DB called CARS_DB 
--Tables for CARS_DB
--New Users
CREATE TABLE users (
	"id" serial PRIMARY KEY,
	"username" text,
	"password" text,
    "role" text
);

--New Customer
CREATE TABLE "customer_info" (
	"customer_id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zip" text NOT NULL,
	"cellphone" text NOT NULL,
	"alternative_phone" text,
	"email_address" text,
    "qualify_input" text,
    "service_status" text DEFAULT 'requested',
    "year" integer,
	"make" text,
	"model" text,
	"vin" text NOT NULL,
    "service_requested" text,
    "current_mileage" text,
    "date_of_request" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--Checklist joined to vehicle info
CREATE TABLE "cars_checklist" (
    "checklist_id" serial PRIMARY KEY,
    "customer_id" int REFERENCES "customer_info" ("customer_id"),
    "headlights_high" text,
    "headlights_low" text,
    "parkinglights_front" text,
    "turnsignals_front" text,
    "taillights" text,
    "turnsignals_rear" text,
    "brakelights" text,
    "backup_lights" text,
    "licensetabs_expiration" text,
    "sparetirepressure" integer,
    "currenttirepressure_lf" integer,
    "currenttirepressure_rf" integer,
    "currenttirepressure_lr" integer,
    "currenttirepressure_rr" integer,
    "finaltirepressure_lf" integer,
    "finaltirepressure_rf" integer,
    "finaltirepressure_lr" integer,
    "finaltirepressure_rr" integer,
    "tirecondition_lf" text,
    "tirecondition_rf" text,
    "tirecondition_lr" text,
    "tirecondition_rr" text,
    "wipercondition" text,
    "airfiltercondition" text,
    "brakefluid" text,
    "powersteeringfluid" text,
    "transmissionfluid" text,
    "oillevel" text,
    "washerfluid" text,
    "coolantlevel" text,
    "coolantlevel_strength" text,
    "radiatorhosecondition" text,
    "batterycondition" text,
    "serpentinebeltcondition" text,
    "otherbeltscondition" text,
    "lubehoodlatch" text,
    "shockstruttest" text,
    "frontwheelbearingtest" text,
    "tierodtest" text,
    "balljointtest" text,
    "controlarmcondition" text,
    "stabilizerbarlinkcondition" text,
    "cvbootcondition" text,
    "frontbrakecondition" text,
    "frontbrakecalipers" text,
    "reardiscbrakecondition" text,
    "rearbrakecalipers" text,
    "rearstabilizerbarlinkcondition" text,
    "torqueallwheelsremoved" text,
    "exhaustsystem" text,
    "checkoil_level" text,
    "oilcap_secure" text,
    "start_idle" text,
    "enginescancodes" text,
    "oilchange" boolean,
    "drain_oil" boolean,
    "remove_filter_gasket" boolean,
    "install_drain_plug" boolean,
    "install_tighten_filter" boolean,
    "addoil_amount" text,
    "addoil_weight" text,
    "checkoil_plug" boolean,
    "check_filter" boolean,
    "oilchange_sticker" boolean,
    "oilfilter_brand" text,
    "oilfilter_number" text,
    "oiltype" text,
    "finishup_checklist" boolean,
    "oilcapsecure" boolean,
    "oilsticksecure" boolean,
    "transmissionsticksecure" boolean,
    "powersteeringcapsecure" boolean,
    "brakereservoircap" boolean,
    "coolantcapsecure" boolean,
    "washerfluidcapsecure" boolean,
    "toolcheck" boolean,
    "testdrive" boolean,
    "retorquelugnuts" boolean,
    "giftpack" boolean,
    "reviewchecklist" boolean,
    "vehicle_observations" text,
    "recommended_repairs" text,
    "repairs_declined" text,
    "date_completed" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "parts_installed" text,
	"engine_size" text,
    "cost" money,
    "checklist_status" text,
    "mechanics" text,
    "checkout_completed" boolean
);
--End DB setup

--Vehicle with new customer join
--Obsolete, combining both forms into one
-- CREATE TABLE "vehicle_info" (
-- 	"vehicle_id" serial PRIMARY KEY,
-- 	"year" integer,
-- 	"make" text,
-- 	"model" text,
-- 	"vin" text NOT NULL,
--     "service_request" text,
--     "date_timestamp" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
-- 	"customer_id" int REFERENCES "customer_info" ("customer_id")
-- );

--Inserting a new customer with vehicle information
--Change to be dynamic
INSERT INTO customer_info (	"name", "address", "city", "state", "zip", "cellphone", "vin" ) VALUES
('john', 'address', 'city', 'state', 00000, 5555555, 'VIN#AAAABBBBCC');

--Once a vehicle has been approved for service
--Creates an empty checklist for mechanics, timestamp is updated with every update.
--Change to be dynamic
INSERT INTO cars_checklist ( "customer_id", "checklist_status" ) VALUES
((SELECT "customer_id" FROM "customer_info" WHERE "customer_id"='$1'), 'ready');

--Selecting customer's name, cellphone contact (Should we include another in case there is no cellphone??, cell is required...), why they qualify and the vin for pending requests (admin) view:
SELECT customer_info.name, customer_info.cellphone, customer_info.qualify_input, customer_info.vin 
FROM customer_info;

--Selecting customer, vehicle info and current checklist
SELECT customer_info.name, customer_info.year, customer_info.make, customer_info.model, customer_info.vin, customer_info.service_requested, cars_checklist.* 
FROM cars_checklist 
JOIN customer_info ON customer_info.customer_id=cars_checklist.customer_id  
WHERE cars_checklist.checklist_id=3;