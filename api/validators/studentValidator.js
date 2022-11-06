const {check, validationResult} = require('express-validator');

exports.validateStudent = [
    check('name').not().isEmpty(),
    check('email').isEmail().not().isEmpty(),
    check('ra').isLength({ min: 9 }),
    check('cpf').isLength({ min: 11 }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({errors: errors.array()});
        next();
    }
]