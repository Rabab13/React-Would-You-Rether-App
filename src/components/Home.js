import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

class Home extends Component {
  render() {
    if (!this.props.authUser) {
      return (
        <Redirect to={{ path: "/login", state: { returnPath: "/leaderboard" } }} />
      )
    }

    return (
      <div className='home'>
        <h3 className='center'>Home</h3>
        {this.props.users.map((user, index) => (
          <div key={user.id} className='home-row'>
            <div className='home-details'>
              <div className='user-details'>
                <img
                  src={user.avatarURL}
                  alt='User Avatar'
                  className='user-avatar'
                />
                <h3>{user.name}</h3>
              </div>
              <div className='user-state'>
                <p>
                  <b>Asked Questions: </b> {user.questions.length}
                </p>
              </div>
              <div className='user-state'>
                <p>
                  <b>Answered Questions: </b> {Object.keys(user.answers).length}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps({ users, authUser }) {
  return {
    users: Object.keys(users)
      .sort(
        (a, b) =>
          users[b].questions.length +
          Object.keys(users[b].answers).length -
          (users[a].questions.length + Object.keys(users[a].answers).length)
      )
      .map((user) => users[user]),
    authUser,
  }
}

export default connect(mapStateToProps)(Home)
