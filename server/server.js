const {request} = require('express');
const express = require('express');
const app = express();
const chefs = require('./chefs.json');
const cors = require('cors');
const bodyParser = require('body-parser');
const uuid4 = require('uuid4');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded());


app.route('/chefs')
    .get((req, res) => {
        res.status(200).send(chefs)
    });






app.listen(8080, () => {
    console.log('The server is running');
});
