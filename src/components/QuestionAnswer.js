import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import Question from "./Question"

//Create question board Component
class QuestionAnswer extends Component {
  state = {
    voted: false,
  }

  handleToggleAnswer = (e, voted) => {
    e.preventDefault()
    this.setState(() => ({ voted }))
  }

  // Create question details UI
  render() {
    if (!this.props.authUser) {
      return (
        <Redirect to={{ pathname: "/login", state: { returnPath: "/" } }} />
      )
    }
     //Defined user image to render it on navbar.
    //  const Image = this.props.avatarURL
     // Defined user name to show it beside user image on navbar
    //  const name = this.props.name

    return (
      <div className='questions-details'>
        {this.state.voted === true ? (
          <h2 className='center'>Answered Questions</h2>
        ) : (
          <h2 className='center'>Unanswered Questions</h2>
        )}
        {/* <div className='author-details'>
          <img src={Image} alt='' className='user-avatar' />
          <h3>{name}</h3>
        </div> */}
        <div className='btn-list-group'>
          <button
            className='btn'
            onClick={(e) => this.handleToggleAnswer(e, false)}>
            Unanswered List
          </button>
          <button
            className='btn'
            onClick={(e) => this.handleToggleAnswer(e, true)}>
            Answered List
          </button>
        </div>
        <ul>
          {this.state.voted
            ? this.props.answeredQutId.map((id) => (
                <li key={id}>
                  <Question id={id} />
                </li>
              ))
            : this.props.unansweredQutId.map((id) => (
                <li key={id}>
                  <Question id={id} />
                </li>
              ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ questions,id, users, authUser }) {
  return {
    // authorImage: questions[id]
    // ? users[questions[id].author].avatarURL
    // : null,
    answeredQutId: Object.keys(questions)
      .filter(
        (question) =>
          questions[question].optionOne.votes.indexOf(authUser) > -1 ||
          questions[question].optionTwo.votes.indexOf(authUser) > -1
      )
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    unansweredQutId: Object.keys(questions)
      .filter(
        (question) =>
          questions[question].optionOne.votes.indexOf(authUser) === -1 &&
          questions[question].optionTwo.votes.indexOf(authUser) === -1
      )
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    
    authUser,
  }
}

export default connect(mapStateToProps)(QuestionAnswer)
