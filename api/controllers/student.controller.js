const db = require('../config/db.config')
const Student = db.students
const student = require('../models/student');

exports.findAll = (req,res) => {
    Student.findAll().then(customers => {
        res.status(200).json(customers);
    });
}

exports.findById = async (req, res) => {
    await Student.findByPk(req.params.id).then(student => {
        res.status(200).json(student)
    })
}

exports.create = async (req, res) => {
    
    await Student.create({  
        name: req.body.name,
        email: req.body.email,
        ra: req.body.ra,
        cpf: req.body.cpf
    }).then(student => {    
        res.status(200).json({
            'student': student,
            'message' : 'Aluno criado com sucesso'
        });
    });
}

exports.update = async (req, res) => {

    await Student.findByPk(req.params.id).then(student => {
        
        if(student !== null){
            Student.update({
                name: req.body.name,
                email: req.body.email,
                ra: req.body.ra,
                cpf: req.body.cpf
            },
            { where: {id: req.params.id} }
            ).then(() => {
                res.status(200).json({
                    'student': student,
                    'message': `Aluno ${req.body.name} editado com sucesso`
                });
            })
        }else{
            res.status(400).json({
                'message': `Aluno nao encontrado`
            });
        }
        
    })
    
}

exports.delete = async (req, res) => {

    await Student.findByPk(req.params.id).then(student => {

        if(student !== null){
            Student.destroy({
                where: { id: req.params.id }
            }).then(() => {
                res.status(200).json({
                    'message': `Aluno com ID ${req.params.id} deletado com sucesso`
                })
            })
        }else{
            res.status(400).json({
                'message': `Aluno nao encontrado`
            });
        }
        
    })
    
}

