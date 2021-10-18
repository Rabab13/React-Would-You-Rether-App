import React, { Component } from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import {  userLogout } from "../actions/authUser"

class Nav extends Component {
  //func to logout
  userLogout = () => {
    const { dispatch } = this.props
    dispatch(userLogout())
  }

  render() {
    //Defined user image to render it on navbar.
    const image = this.props.avatarURL
    // Defined user name to show it beside user image on navbar
    const name = this.props.name

    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/leaderboard' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Questions
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' exact activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li className='user-details'>
            <img src={image} alt='' className='users-avatar' />
            <h4>{name}</h4>
            <button className='logout' onClick={this.userLogout}>Logout</button>
          </li>
        </ul>
        <hr />
      </nav>
    )
  }
}

function mapStateToProps({ users, authUser}) {
  return {
    avatarURL: users[authUser].avatarURL,
    name: users[authUser].name,
  }
}

export default connect(mapStateToProps)(Nav)
