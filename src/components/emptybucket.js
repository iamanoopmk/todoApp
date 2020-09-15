import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


class EmptyBucket extends Component{

    bucketCreate(){

    }

    addBucket(){
        var { history } =this.props
        history.push("/task")
    }
    gotoTaskPage(){
        var { history } =this.props
        history.push("/task")
    }
    render(){
        
        return (
            <>
            <div className="main_div">
                <div className="center_div">
                    <br/>
                    <h1> To Do App </h1>
                    <br/>
                    <input type="text" placeholder="Create new Bucket" onChange={this.bucketCreate.bind(this)}/>
                    <button className="addTask" onClick={this.addBucket.bind(this)}> + </button>
                    <div className="emptyBucket">
                        <h2>Bucket Not Found</h2>
                    </div>
                    
                    
                </div>
            
            </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default withRouter(connect(mapStateToProps)(EmptyBucket))
