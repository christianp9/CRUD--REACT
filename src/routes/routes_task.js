module.exports=(app)=>{
const Task_model = require('../model/model_task');
const TaskCtrl = require('../controller/controller_routes');

API_ROUTES =`/api/tasks`
API_ID=`/api/tasks/:id`


app.get(`${API_ROUTES}`, TaskCtrl.Task );
app.get(`${API_ID}`, TaskCtrl.FindId );
app.post(`${API_ROUTES}`, TaskCtrl.Post );
app.put(`${API_ID}`, TaskCtrl.Put);
app.delete(`${API_ID}`, TaskCtrl.Delete);
}

