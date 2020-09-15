import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router';
import { withRouter } from 'react-router-dom'
import Todolist from '../components/todolist.js'
import Bucket from '../components/bucket.js'
import EmptyBucket from '../components/emptybucket.js'

class Root extends Component {

  render() {
     
    return (
            <>
            
            <div className="content-page">
                <div className="content" style={{overflow:"auto"}}>
                    <div className="page-content-wrapper" style={{"height":"98vh","width":"100%"}}>
                        <Switch>
                        <Route exact path="/" component={Bucket}/>
                        <Route exact path="/task" component={Todolist}/>
                        <Route exact path="/emptybucket" component={EmptyBucket}/>
                        </Switch> 
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
export default withRouter(connect(mapStateToProps)(Root))