// ACTION to fetch API data.
export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'


export function setAuthUser (id) {
    return {
        type: SET_AUTHED_USER,
        id,
        
    }
}

export function authUser(user) {
	return {
		type: LOGIN_USER,
		user
	}
}
export function userLogout() {
	return {
		type: LOGOUT_USER
	}
}


