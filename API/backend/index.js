const express = require('express');
const path = require('path');
const app = express();
const port = 1009;
const db = require('./Confing/db');
const route = require('./Route/route');
const register = require('./Route/register');
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use("/upload", express.static(path.join(__dirname, "upload")));
app.use(cors(origin = 'http://localhost:1009'));

app.use('/', route);
app.use('/', register);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});