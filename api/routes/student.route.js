const express = require('express');
const router = express.Router();
const controller = require('../controllers/student.controller')
const { validateCreateStudent, validateUpdateStudent } = require('../validators/studentValidator');

router.get('/', controller.findAll)
router.get('/:id', controller.findById)
router.post('/', validateCreateStudent, controller.create)
router.put('/:id', validateUpdateStudent, controller.update)
router.delete('/:id', controller.delete)

module.exports = router;