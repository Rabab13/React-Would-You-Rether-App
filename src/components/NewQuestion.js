import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { handleAddQut } from "../actions/shared"

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    checkHomePage: false,
  }
  // Func to handle change of fisrt question and another Func for secound question.
  onChangeOptionI = (e) => {
    const optionOne = e.target.value
    this.setState(() => ({ optionOne }))
  }

  onChangeOptionII = (e) => {
    const optionTwo = e.target.value
    this.setState(() => ({ optionTwo }))
  }
  // Func to add new question contain 2 options of questions.
  handleAddQut = (e, optionOne, optionTwo) => {
    e.preventDefault()
    const { dispatch, authUser } = this.props
    dispatch(handleAddQut(optionOne, optionTwo, authUser)).then(() =>
      this.setState({
        optionOne: "",
        optionTwo: "",
        checkHomePage: true,
      })
    )
  }
  // Create Newquestion  UI
  render() {
    //Defined both options to render it.
    const { optionOne, optionTwo } = this.state

    if (!this.props.authUser) {
      return (
        <Redirect to={{ pathname: "/login", state: { returnPath: "/add" } }} />
      )
    }
    //After adding new question redirect to answered and unanswered question page
    if (this.state.checkHomePage) {
      return <Redirect to='/' />
    }

    return (
      <div className='add-new-questions'>
        <h3 className='center'>Add New Question</h3>
        <form
          className='add-question-form'
          onSubmit={(e) => this.handleAddQut(e, optionOne, optionTwo)}>
          <input
            id='optionOne'
            className='input'
            type='text'
            placeholder='Option One'
            value={optionOne}
            onChange={this.onChangeOptionI}
          />
          <input
            id='optionTwo'
            className='input'
            type='text'
            placeholder='Option Two'
            value={optionTwo}
            onChange={this.onChangeOptionII}
          />
          {optionOne && optionTwo ? (
            <button className='btn-options' type='submit'>
              Submit
            </button>
          ) : (
            <button className='btn-options' type='button' disabled>
              Submit
            </button>
          )}
        </form>
      </div>
    )
  }
}
// Using mapStateToProps to Return a plain object containing the data that the connected component needs.
function mapStateToProps({ authUser }) {
  return {
    authUser,
  }
}

export default connect(mapStateToProps)(NewQuestion)
