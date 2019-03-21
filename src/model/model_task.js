const DB = require('../config/database');

const taskSchema = new DB.Schema({
    title: {type: String},
    description: {type: String}

})

module.exports = DB.model('tasks_model',taskSchema);