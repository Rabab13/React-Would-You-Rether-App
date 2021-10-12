import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { BrowserRouter as Router, Route } from "react-router-dom"
import LoadingBar from "react-redux-loading"
import { handleInitialData } from "../actions/shared"
import Nav from "./Nav"
import Login from "./Login"
import Home from "./Home"
import NewQuestion from "./NewQuestion"
import QuestionAnswer from "./QuestionAnswer"
import QuestionBoard from "./QuestionBoard"

class App extends Component {
  // Load data from a remote endpoint.
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {!this.props.login && <Nav />}
          <div className='container'>
            <div>
              <Route path='/login' exact component={Login} />
              <Route path='/home' exact component={Home} />
              <Route path='/' exact component={QuestionAnswer} />
              <Route path='/questions/:id' component={QuestionBoard} />
              <Route path='/add' exact component={NewQuestion} />
            </div>
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authUser }) {
  return {
    login: authUser === null,
  }
}

export default connect(mapStateToProps)(App)
