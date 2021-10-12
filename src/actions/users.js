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
export function saveAns(authUser, qid, answer) {
	return {
		type: SAVE_QUESTION,
		authUser,
		qid,
		answer
	}
}

// Add Question Action Creator
export function addQut(authUser, qid) {
	return {
		type: ADD_QUESTION,
		authUser,
		qid
	}
}
