//for environmental variables
require('dotenv').config(); 

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var passport = require('./strategies/sql.localstrategy');
var sessionConfig = require('./modules/session.config');

// Route includes
var indexRouter = require('./routes/index.router');
var userRouter = require('./routes/user.router');
var registerRouter = require('./routes/register.router');
var checklistRouter = require('./routes/checklist.router');
var requestServiceRouter = require('./routes/requestService.router');
var RequestsForService = require('./routes/service_request.router');
var authRouter = require('./routes/authorization.router');
var mailRouter = require('./routes/mail.router');
var summaryRouter = require('./routes/summary.router');

var port = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static('./server/public'));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/checklist', checklistRouter);
app.use('/requestservice',requestServiceRouter);
app.use('/summary', summaryRouter);
app.use('/RequestsForService', RequestsForService)

//for nodemailer
app.use('/mail', mailRouter);

app.use('/authorization', authRouter)

// Catch all bucket, must be last!
app.use('/', indexRouter);

// Listen //
app.listen(port, function(){
   console.log('Listening on port:', port);
});
