const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sipRoutes = require('./routes/sipRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/sip', sipRoutes);

module.exports = app;
