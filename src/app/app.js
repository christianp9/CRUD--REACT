import React, { Component } from 'react';

class App extends Component {
     constructor(){
         super();
         this.state = {
             title: '', 
             description: '',
             tasks: [],
             _id: ''
         };
         this.handleChange = this.handleChange.bind(this);
         this.addTask = this.addTask.bind(this);
     }
    addTask(e){
        if(this.state._id) {
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'accept': 'application',
                    'Content-Type': 'application/json'
                }
            })
             .then(res => res.json())
             .then(data => {
                console.log(data)
                this.setState({title: '', description: '', id: ''});
                this.fetchTask();
             })
        }else {
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'accept': 'application',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.setState({ title: '', description: ''});
                    this.fetchTask();
                })
                .catch(err => console.log(err));
    
                
        }
        e.preventDefault();
    }
    componentDidMount() {
        this.fetchTask();
    }
    fetchTask() {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({tasks: data});
                console.log(this.state.tasks);
            });
    }
    deleteTask(id) {
      if(confirm('Are you sure you want to delete')) {
        fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'accept': 'application',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.fetchTask();
        });
      }
    }
    editTask(id) {
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id
                })
            });
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    render() {
        return (
            <div>
                <nav className="navbar is-info">
                    <div className="container">
                        <div className="navbar-menu">
                            <div className="navbar-start">
                                <a className="navbar-item" href="/">CRUD MERN</a>
                            </div>
                        </div>
                    </div>
                </nav>
                <br />
                <div className="container">
                    <div className="columns">
                        <div className="column is-two-fifths">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="columns">
                                            <div className="column is full">
                                                <div className="field "> 
                                                    <div className="control">
                                                        <input name="title" required value={this.state.title} onChange={this.handleChange}
                                                         type="text" className="input is-rounded" placeholder="Title Task..."  /   >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="columns">
                                            <div className="column is full">
                                                <div className="field "> 
                                                    <div className="control">
                                                        <textarea name="description" required value={this.state.description} onChange={this.handleChange}
                                                         className="textarea is-small" placeholder="description..."  ></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="columns is-mobile">
                                            <div className="column is-4 is-offset-8">
                                                <button type="submit" className="button is-info">sucess</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="column is-four-fifths">
                            <table className="table table is-fullwidth table is-hoverable table is-striped">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <label onClick={() => this.deleteTask(task._id)}>
                                                            <div className="block">
                                                                <span className="tag is-danger">
                                                                    Delete
                                                                </span>
                                                            </div>
                                                        </label>
                                                        <label onClick={() => this.editTask(task._id)}>
                                                            <div className="block">
                                                                <span className="tag is-link">
                                                                    Edit
                                                                </span>
                                                            </div>
                                                        </label>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default App;