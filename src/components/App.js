import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LoadingBar from "react-redux-loading"
import { handleInitialData } from "../actions/shared"
import Nav from "./Nav"
import Login from "./Login"
import Home from "./Home"
import NewQuestion from "./NewQuestion"
import QuestionAnswer from "./QuestionAnswer"
import QuestionBoard from "./QuestionBoard"
import Not404Found from "./Not404Found"
import PrivateRoute from './PrivateRoute'

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
            <Switch>
              <Route path='/login' exact component={Login} />
              {/* After successful login, redirect users to the page they originally requested. */}
              <PrivateRoute path='/leaderboard' exact component={Home} />
              <PrivateRoute path='/' exact component={QuestionAnswer} />
              <PrivateRoute path='/questions/:id' component={QuestionBoard} />
              <PrivateRoute path='/add' exact component={NewQuestion} />
              <Route path="/404" component={Not404Found} />
              If user write on adress bar not 
              <Route path="/" component={Not404Found} />
              </Switch>
                       
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
