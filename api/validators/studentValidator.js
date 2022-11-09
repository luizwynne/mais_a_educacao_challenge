const {check, validationResult} = require('express-validator');
const studentController = require('../controllers/student.controller')

exports.validateCreateStudent = [

    check('name').not().isEmpty().isLength({ min: 2 }),
    check('email').isEmail().not().isEmpty(),
    check('ra').isLength({ min: 9 }).not().isEmpty(),
    check('cpf').isLength({ min: 11 }).not().isEmpty(),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty())
          return res.status(422).json({errors: errors.array()});

        next();
    }
    
]

exports.validateUpdateStudent = [

  check('name').isLength({ min: 2 }),
  check('email').isEmail(),
  check('cpf').isLength({ min: 11 }),

  (req, res, next) => {

      const errors = validationResult(req);

      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
  }

]

