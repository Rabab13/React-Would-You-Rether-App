import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { handleSaveAns } from "../actions/shared"
import { CircularProgressbar } from "react-circular-progressbar"
//Handling CircularProgressbar style inside render method
import "react-circular-progressbar/dist/styles.css"

class QuestionBoard extends Component {
  // Func to make user able to vote
  handleUserVote = (e, qid, answer) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(handleSaveAns(qid, answer))
  }

  //Create question detials UI
  render() {
    const {
      id,
      authorImage,
      question,
      voteOneSelected,
      optionOneVotesPercentage,
      voteTwoSelected,
      optionTwoVotesPercentage,
      authUser,
    } = this.props

    // Create CircularProgressbar and changeing each bar size by it's value
    const percentageOne = optionOneVotesPercentage
    const percentageTwo = optionTwoVotesPercentage

    if (!authUser) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { returnPath: "/questions/" + id },
          }}
        />
      )
    }

    return (
      <div className='question-details'>
        <h2 className='center'>Would You Rather...?</h2>
        <div className='author-details'>
          <img src={authorImage} alt='Author Avatar' className='user-avatar' />
          <h3>{question.author}</h3>
        </div>
        {voteOneSelected !== true && voteTwoSelected !== true && (
          <div className='options-details'>
            <div className='option'>
              <p className='center'>{question.optionOne.text}</p>
              <button
                className='btn'
                onClick={(e) => this.handleUserVote(e, id, "optionOne")}>
                Vote
              </button>
            </div>
            <div className='option'>
              <p className='center'>{question.optionTwo.text}</p>
              <button
                className='btn'
                onClick={(e) => this.handleUserVote(e, id, "optionTwo")}>
                Vote
              </button>
            </div>
          </div>
        )}
        {(voteOneSelected === true || voteTwoSelected === true) && (
          <div className='options-details'>
            <div className='option'>
              <p className='center'>{question.optionOne.text}</p>
              <p className='center'>
                Total Vote: {question.optionOne.votes.length}
              </p>
              <p className='vote-percent'></p>
              <CircularProgressbar
                value={percentageOne}
                text={`${optionOneVotesPercentage}%`}
                strokeWidth={10}
                background
                backgroundPadding={0}
                styles={{
                  pathTransitionDuration: 0.5,
                  background: { fill: "black" },
                  path: { stroke: "rgb(241, 71, 59)" },
                  trail: { stroke: "white" },
                  text: {
                    fill: "rgb(241, 71, 59)",
                    fontSize: "30px",
                    fontWeight: "bold",
                  },
                }}
              />
              ;
              {
                // Used to show which question did user selected
                voteOneSelected && <p className='center'>Your Selection</p>
              }
            </div>
            <div className='option'>
              <p className='center'>{question.optionTwo.text}</p>
              <p className='center'>
                Total Vote: {question.optionTwo.votes.length}
              </p>
              <CircularProgressbar
                value={percentageTwo}
                text={`${optionTwoVotesPercentage}%`}
                strokeWidth={10}
                background
                backgroundPadding={0}
                styles={{
                  background: { fill: "black" },
                  path: { stroke: "rgb(241, 71, 59)" },
                  trail: { stroke: "white" },
                  text: {
                    fill: "rgb(241, 71, 59)",
                    fontSize: "30px",
                    fontWeight: "bold",
                  },
                }}
              />
              ;{voteTwoSelected && <p className='center'>Your Selection</p>}
            </div>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ users, questions, authUser }, { match }) {
  const { id } = match.params

  const authorImage = questions[id]
    ? users[questions[id].author].avatarURL
    : null
  const question = questions[id] ? questions[id] : null
  const optionOneVotesPercentage = questions[id]
    ? (questions[id].optionOne.votes.length /
        (questions[id].optionOne.votes.length +
          questions[id].optionTwo.votes.length)) *
      100
    : null
  const optionTwoVotesPercentage = questions[id]
    ? (questions[id].optionTwo.votes.length /
        (questions[id].optionOne.votes.length +
          questions[id].optionTwo.votes.length)) *
      100
    : null
  const voteOneSelected = questions[id]
    ? questions[id].optionOne.votes.indexOf(authUser) > -1
    : null
  const voteTwoSelected = questions[id]
    ? questions[id].optionTwo.votes.indexOf(authUser) > -1
    : null
  const author = question ? users[question.author] : null

  return {
    id,
    authUser,
    author,
    question,
    optionOneVotesPercentage,
    optionTwoVotesPercentage,
    authorImage,
    voteTwoSelected,
    voteOneSelected,
  }
}

export default connect(mapStateToProps)(QuestionBoard)
