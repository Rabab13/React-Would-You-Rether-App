import { RECEIVE_USERS, SAVE_QUESTION, ADD_QUESTION } from '../actions/users'


export default function users (state = {}, action) {

	switch (action.type) {

		case RECEIVE_USERS :
			return {
				...state,
				...action.users
			}

		case SAVE_QUESTION :
			return {
				...state,
		        [action.authUser]: {
		        	...state[action.authUser],
		          	answers: {
		            	...state[action.authUser].answers,
		            	[action.qid]: action.answer
		          	}
		        }
			}

		case ADD_QUESTION :
			return {
				...state,
				[action.authUser]: {
					...state[action.authUser],
					questions: state[action.authUser].questions.concat(action.qid)
				}
			}

		default :
			return state
	}
}