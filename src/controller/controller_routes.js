'use strict'
const  Task_model = require('../model/model_task');
const  TaskCtrl = {};

TaskCtrl.Task = async(req,res)=>{
    const task = await Task_model.find(req.body);
        console.log(task);
        res.json(task);
};
TaskCtrl.FindId = async (req,res) => {
    const task = await Task_model.findById(req.params.id);
    res.json(task)
};
TaskCtrl.Post = async(req, res) => {
    const {title, description} = req.body
    const task = new Task_model({title,description});
    await task.save();
    res.json({"status": "tarea guardada"})
};
TaskCtrl.Put = async (req,res) => {
    const { title, description } = req.body;
    const newTask = { title, description };
    await Task_model.findByIdAndUpdate(req.params.id, newTask);       
    res.json({"status":"update"});
};
TaskCtrl.Delete = async (req, res) => {
    await Task_model.findByIdAndDelete(req.params.id);
    res.json({"status":"delete"})
};


module.exports = TaskCtrl;


