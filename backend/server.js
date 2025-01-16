const express = require('express');
const http =require('http');
const app = express()
const data = require('./data.json');
const server = new http.Server(app);
const cors = require('cors');
app.use(cors());
app.get('/', (req, res) => {   
    res.status(200).json(data);
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});