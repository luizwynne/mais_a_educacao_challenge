const db = require('../config/db.config')
const Student = db.students
const { body, validationResult } = require('express-validator');
const { json } = require('body-parser');

exports.findAll = (req,res) => {
    Student.findAll().then(customers => {
        res.status(200).json(customers);
    });
}

exports.create = (req, res) => {
    Student.create({  
        name: req.body.name,
        email: req.body.email,
        ra: req.body.ra,
        cpf: req.body.cpf
    }).then(student => {    
        res.status(200).json(student);
    });
}