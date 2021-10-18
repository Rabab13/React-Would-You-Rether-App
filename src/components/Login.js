import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect, } from "react-router-dom"
import { authUser } from "../actions/authUser"




class Login extends Component {
  state = {
    // CALL AS STRINGUSING TO CREATE USERS SELECT LIST FOR LOGIN
    userId: "",
    // CALL AS STRING USING TO REDIRECT TO USERS BOARD AFTER LOGIN
    userID: "",
    // condtion to login must select from list before click login btn
    selectFromList: false,
    redirectToReferrer: false
  }

  // handle change between uesrs in order to login the app
  handleChange = (e) => {
    const userId = e.target.value
    this.setState(() => ({
      userId,
    }))
  }

  //function to handle the login the selected user from dropdown list.
  handleUserLogin = (e) => {
    e.preventDefault()
    const { userId } = this.state
    const { dispatch, selectedUser } = this.props

    // Create alert in case of clicking login button without selecting a user.
    if (selectedUser.indexOf(userId) > -1) {
      dispatch(authUser(userId))
      
    } else {
      this.setState({
        userId: "",
        selectFromList: true,
        // redirectToReferrer: true
      })
    }
  }

  render() {
    const { userId, userID, } = this.state
   
    if (this.props.authUser) {
      return <Redirect to={"/" + userID} />
     }

    return (
      <div className='login'>
        <h2 className='center'>Would You Rather...?</h2>
        <form className='login-form' onSubmit={this.handleUserLogin}>
          <select
            className='select'
            onChange={this.handleChange}
            value={userId}>
            <option value='Select'>Select Authed User</option>
            <option className='user1' value='sarahedo'>
              Sarah Edo
            </option>
            <option className='user2' value='tylermcginnis'>
              Tyler McGinnis
            </option>
            <option className='user3' value='johndoe'>
              John Doe
            </option>
          </select>
          {this.state.selectFromList && (
            <p className='login-error'>Please Select From The above List!</p>
          )}
          <div className='btn-login-group'>
          {/* {this.state.redirectToReferrer && */}
           <p className='login-error'>
          You must login to view the page</p>
          {/* )} */}
            <button className='btn'  type='submit' onClick={this.login}>
              Login
            </button>
          </div>
        </form>
      </div>
    )
  }
}


// Map the selectedUser to the Component props
function mapStateToProps({ users, authUser }) {
  return {
    selectedUser: Object.keys(users),
    authUser,
  }
}

export default connect(mapStateToProps)(Login)
