var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors = require('cors')
app.use(bodyParser.json())
app.use(cors({ origin: ['http://localhost:8080'], }))

const db = require('./config/db.config.js');

db.sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});



app.use('/api/students', require('./routes/student.route'))

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("App listening at http://%s:%s", host, port)
})