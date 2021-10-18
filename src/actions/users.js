 import { saveQuestionAnswer } from '../utils/api'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SAVE_QUESTION = 'SAVE_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION_TO_USER'

// Receive Users Action Creator
export function receiveUsers(users) {
	return {
		type: RECEIVE_USERS,
		users
	}
}

// Save Question Answer Action Creator
export function userAnswer(authUser, qid, answer) {
	return {
		type: SAVE_QUESTION,
		authUser,
		qid,
		answer
	}
}

// Add Question Action Creator
export function userAddQut(authUser, qid) {
	return {
		type: ADD_QUESTION,
		authUser,
		qid
	}
}

// Using thunk middleware to save user answer.
export function handleSaveAnsUs(qid, answer) {
	return (dispatch, getState) => {
		const { authUser } = getState()
		return saveQuestionAnswer({ authedUser: authUser, qid, answer })
				.then(() => dispatch(userAnswer(authUser, qid, answer)))
	}
}