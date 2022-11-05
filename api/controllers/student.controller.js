const db = require('../config/db.config')
const Student = db.students

exports.findAll = (req,res) => {
    res.end("something");
}