import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

class Question extends Component {
  render() {
    const { question, id } = this.props

    return (
      <div className='question'>
        <div className='options'>
          <div className='option'>
            <p className='center'>{question.optionOne.text}</p>
          </div>
          <div className='divider'>
            <p className='center'>or</p>
          </div>
          <div className='option'>
            <p className='center'>{question.optionTwo.text}</p>
          </div>
        </div>
        <div className='details center'>
          <Link to={`/questions/${id}`}>Users Vote</Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ questions, authUser }, { id }) {
  const question = questions[id]
  const optionOneSelected = questions[id].optionOne.votes.indexOf(authUser) > -1
  const optionTwoSelected = questions[id].optionTwo.votes.indexOf(authUser) > -1
  return {
    question,
    optionOneSelected,
    optionTwoSelected,
  }
}

export default connect(mapStateToProps)(Question)
