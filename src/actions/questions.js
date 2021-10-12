
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
export function addNQut(question) {
	return {
		type: ADD_QUESTION,
		question
	}
}

