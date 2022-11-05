// module.exports = function(app){

//     const controller = require('../controllers/student.controller')

//     app.get('/api/students', controller.findAll)

// }

const express = require('express');
const router = express.Router();

const controller = require('../controllers/student.controller')

router.get('/', controller.findAll)

module.exports = router;