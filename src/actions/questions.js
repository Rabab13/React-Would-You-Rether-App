import { addNewQuestion, saveQuestionAnswer } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_QUESTION = 'SAVE_QUESTION'

export function receiveQut(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions
	}
}
// Add question func action creator 
 export function saveAns(authUser, qid, answer) {
	return {
		type: SAVE_QUESTION,
		authUser,
		qid,
		answer
	}
}

// Add question func action creator 
function addQut(question) {
	return {
		type: ADD_QUESTION,
		question
	}
}

// Add new question.
export function handleAddNQut(optionOneText, optionTwoText) {
	return (dispatch, getState) => {
		const { authUser } = getState()
		return addNewQuestion({ optionOneText, optionTwoText, author: authUser })
				.then((question) => dispatch(addQut(question)))
				
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