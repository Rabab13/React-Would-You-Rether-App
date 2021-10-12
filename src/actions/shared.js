import { showLoading, hideLoading } from 'react-redux-loading'
// import Func from api
import { getInitialData, addNewQuestion, saveQuestionAnswer } from '../utils/api'
// import our app actions creator
import { receiveUsers, saveAns, addQut } from './users'
import { addNQut,receiveQut  } from './questions'

export function handleInitialData() {
	return (dispatch) => {
		return getInitialData()
			.then(({ users, questions }) => {
				dispatch(receiveUsers(users))
				dispatch(receiveQut(questions))
			})
	}
}

// Using thunk middleware to save the question's answer
export function handleSaveAnsQut(qid, answer) {
	return (dispatch, getState) => {
		const { authUser } = getState()
		return saveQuestionAnswer({ authedUser: authUser, qid, answer })
				.then(() => dispatch(saveAns(authUser, qid, answer)))

	}
}

// Using thunk middleware to create new quetion by user.
export function handleAddQut(optionOneText, optionTwoText, authUser) {
	return (dispatch) => {
		dispatch(showLoading())
		return dispatch(handleAddNQut(optionOneText, optionTwoText))
			.then((question) => {
					dispatch(addQut(authUser, question.question.id))
					dispatch(hideLoading())
				}
			)
	}
}


// Using thunk middleware to save user answer.
export function handleSaveAnsUs(qid, answer) {
	return (dispatch, getState) => {
		const { authUser } = getState()
		return saveQuestionAnswer({ authedUser: authUser, qid, answer })
				.then(() => dispatch(saveAns(authUser, qid, answer)))
	}
}

// handle user answer and voting.
export function handleSaveAns(qid, answer) {
	return (dispatch) => {
		dispatch(showLoading())
		dispatch(handleSaveAnsQut(qid, answer))
		dispatch(handleSaveAnsUs(qid, answer))
			.then(() => 
				dispatch(hideLoading())
			)
	}
}

// Add new question.
export function handleAddNQut(optionOneText, optionTwoText) {
	return (dispatch, getState) => {
		const { authUser } = getState()
		return addNewQuestion({ optionOneText, optionTwoText, author: authUser })
				.then((question) => dispatch(addNQut(question)))
				
	}
}


