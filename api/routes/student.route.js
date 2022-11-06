const express = require('express');
const router = express.Router();

const controller = require('../controllers/student.controller')
const { validateStudent } = require('../validators/studentValidator');

router.get('/', controller.findAll)
router.post('/', validateStudent, controller.create)

module.exports = router;