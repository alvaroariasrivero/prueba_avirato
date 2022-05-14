const express = require('express');
require('./utils/dbMongocon');
require('dotenv').config();

const usersApiRouter = require('./routes/clientApi');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello world')
});

app.use('/', usersApiRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});