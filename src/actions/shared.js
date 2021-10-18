import { showLoading, hideLoading } from 'react-redux-loading'
// import Func from api
import { getInitialData} from '../utils/api'
// import our app actions creator
import { userAddQut,receiveUsers, userAnswer, handleSaveAnsUs } from './users'
import { receiveQut, handleAddNQut } from './questions'

export function handleInitialData() {
	return (dispatch) => {
		return getInitialData()
			.then(({ users, questions }) => {
				dispatch(receiveUsers(users))
				dispatch(receiveQut(questions))
			})
	}
}



// Using thunk middleware to create new quetion by user.
export function handleAddQut(optionOneText, optionTwoText, authUser) {
	return (dispatch) => {
		dispatch(showLoading())
		return dispatch(handleAddNQut(optionOneText, optionTwoText))
			.then((question) => {
					dispatch(userAddQut(authUser, question.question.id))
					dispatch(hideLoading())
				}
			)
	}
}




// handle user answer and voting.
export function handleSaveAns(authedUser, qid, answer) {
	return (dispatch) => {
		dispatch(showLoading())
		dispatch(handleSaveAnsUs(authedUser, qid, answer))
		dispatch(userAnswer(authedUser,qid, answer))
			.then(() => 
				dispatch(hideLoading())
			)
	}
}



