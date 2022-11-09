const db = require('../config/db.config')
const Student = db.students

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

    try{
        const student = await Student.findOne({ where: { ra: req.body.ra } })

        if(student != null){
            return res.status(403).json({errors: 'RA ja existente'});
        }

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
    }catch (error) {
        console.log(error);
        res.send({ code:400, failed: "Algum erro ocorreu em sua requisiçao"});
    }
    
    
}

exports.update = async (req, res) => {

    try{
        await Student.findByPk(req.params.id).then(student => {
        
            if(student !== null){
                Student.update({
                    name: req.body.name,
                    email: req.body.email,
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
    }catch (error) {
        console.log(error);
        res.send({ code:400, failed: "Algum erro ocorreu em sua requisiçao"});
    }
    
}

exports.delete = async (req, res) => {

    try{
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
    }catch (error) {
        console.log(error);
        res.send({ code:400, failed: "Algum erro ocorreu em sua requisiçao"});
    }
    
}


