const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const pasport      = require('passport');

require('./api/models/db');
require('./api/config/passport');

app.use(passport.initialize());