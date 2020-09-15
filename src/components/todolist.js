import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleTodoTask } from "../actions/todoAction"
import { apiAction } from '../utils.js'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import queryString from "query-string"

class Todolist extends Component{
    componentDidMount() {
        this.fetchBucketData()
        // var { dispatch } = this.props
        // let response = await apiAction("get")
        // dispatch(handleTodoTask("bucket",response))
    }

    async fetchBucketData(){
        var {dispatch,location} = this.props
        const parsed = queryString.parse(location.search)
        const response = await apiAction("api/bucket/"+ parsed.bucket + "/","get")
        dispatch(handleTodoTask( "bucketName", response.bucket_name))
        dispatch(handleTodoTask("bucketData",response))
        dispatch(handleTodoTask( "taskList", response.todos))

        
    }


    taskCreate(key,event){
        var { dispatch } = this.props
        dispatch(handleTodoTask( key, event.target.value))
    }

    addTask(e){
        var { dispatch } = this.props
        this.postTaskCall()
        dispatch(handleTodoTask( "task",""))

    }

    async postTaskCall(){
        const { reducer, dispatch,location } = this.props
        const { task,taskList,bucketData } = reducer
        const parsed = queryString.parse(location.search)
        console.log("+++++",task,taskList)
        const postData = {
            todo_name: task,
            status: false
        }
        const res = await apiAction("api/todo/", "post", postData)
        var bucket_todos =  bucketData.todos.map((todo)=>todo.id)
        bucket_todos.push(res.id)
        await apiAction("api/bucket/" + parsed.bucket + "/", "put", {bucket_name:bucketData.bucket_name,todos : bucket_todos})
        taskList.push(res)
        dispatch (handleTodoTask( "taskList", taskList))  
    }


    handleEditTask(task_id){
        
         
    }

    confirmDeleteTask(index,taskName){
        confirmAlert({
            title: 'Are you sure to delete below task',
            message: taskName,
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => this.handleDeleteTask(index)
                },
                {
                  label: 'No',
                }
              ]
            });
    }

    async handleDeleteTask(index){
        await apiAction("api/todo/" + index + "/", "delete", null)
        this.fetchBucketData()
    }


    render(){
        const { reducer } = this.props
        

        let Task_List = reducer.taskList.map((data,i) =>{
            return(
                <>
                    <li key={i}>
                        <input className="checkMark" type="checkbox" />
                        {data.todo_name}
                        <button title="edit" className="btn-edit" onClick={this.handleEditTask.bind(this,data.id)}><i className="fa fa-pencil"></i></button>
                        <button title="delete" className="btn-delete" onClick={this.confirmDeleteTask.bind(this,data.id,data.todo_name)}><i className="fa fa-close"></i></button>
                    </li>
                    <hr/>
                </>
            )
        })

        return (
            <>
            <div className="main_div">
                <div className="center_div">
                    <br/>
                    <h1 style={{textTransform:"uppercase"}}> {reducer.bucketName} </h1>
                    <br/>
                    <input type="text" placeholder="Add a New Task" value={reducer.task} onChange={this.taskCreate.bind(this,"task")}/>
                    <button className="addTask" onClick={this.addTask.bind(this)}> + </button>

                    <ol>
                        {Task_List}
                    </ol>
                </div>

            </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default withRouter(connect(mapStateToProps)(Todolist))