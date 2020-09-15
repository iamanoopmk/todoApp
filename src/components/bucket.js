import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleTodoTask } from "../actions/todoAction"
import { apiAction } from '../utils.js'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
// import queryString from "query-string"


class Bucket extends Component{
    componentDidMount() {
        this.fetchBucketData()
    }

    async fetchBucketData(){
        var {dispatch} = this.props
        const response = await apiAction("api/bucket/","get")
        dispatch(handleTodoTask( "bucketList", response))
        
    }

    bucketCreate(key,event){
        var { dispatch } = this.props
        dispatch(handleTodoTask( key, event.target.value))

    }

    async addBucket(){
        var { dispatch } = this.props
        this.postBucketCall()
        dispatch(handleTodoTask( "bucket",""))
    }

    async postBucketCall(){
        const { reducer, dispatch } = this.props
        const { bucket,bucketList } = reducer
        const postData = {
            bucket_name: bucket,  
            todos: []
            }
        const res = await apiAction("api/bucket/", "post", postData)
        bucketList.push(res)
        dispatch (handleTodoTask( "bucketList", bucketList))  
    }

    gotoTaskPage(id){
        var { history } =this.props
        history.push("/task?bucket="+ id)
    }

    async handleEditBucket(id){
        var {dispatch} = this.props
        const response = await apiAction("api/bucket/" + id +"/", "get", null)
        dispatch(handleTodoTask("bucket", response.bucket_name))
        
        
        
    }

    confirmDeleteTask(index,bucketName){
        confirmAlert({
            title: 'Are you sure to delete below task',
            message: bucketName,
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => this.handleDeleteBucket(index)
                },
                {
                  label: 'No',
                }
              ]
            });
    }

    async handleDeleteBucket(index){
        await apiAction("api/bucket/" + index + "/", "delete", null)
        this.fetchBucketData()
    }


    render(){
        const { reducer } = this.props
        let bucket = reducer.bucketList.map((data,i) => {
            return(
                <>
                    <li key={i}>
                        <p className="bucketName" onClick={this.gotoTaskPage.bind(this,data.id)}>{data.bucket_name}</p>
                        <button title="edit" className="btn-edit" onClick={this.handleEditBucket.bind(this,data.id)}><i className="fa fa-pencil"></i></button>
                        <button title="delete" className="btn-delete" onClick={this.confirmDeleteTask.bind(this,data.id,data.bucket_name)}><i className="fa fa-close"></i></button>
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
                    <h1> To Do App </h1>
                    <br/>
                    <input type="text" placeholder="Create new Bucket" value={reducer.bucket} onChange={this.bucketCreate.bind(this,"bucket")}/>
                    <button className="addTask" onClick={this.addBucket.bind(this)}> + </button>
                    <ol>
                       {bucket}                        
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

export default withRouter(connect(mapStateToProps)(Bucket))
