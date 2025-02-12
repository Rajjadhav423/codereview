const express = require('express');
const cors = require('cors');
const GenerateResponse = require('./service/ai.service');
const aiRoutes = require('./routes/ai.routes');
const app = express();

app.use(express.json());
app.use(cors()); 
app.use(aiRoutes);

module.exports = app;