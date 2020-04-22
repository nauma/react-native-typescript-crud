import {
	SET_LOADING,
	SET_USERS,
	SET_USER,
	//
	UsersState,
	UserActionTypes,
} from "./types";
//
const initialState: UsersState = {
	users: [],
	user: null,
	loading: false
}
//
export const usersReducer = function (state = initialState, action: UserActionTypes) {
	switch (action.type) {
		case SET_LOADING:
			return { ...state, loading: action.payload }
		case SET_USERS:
			return { ...state, users: action.payload }
		case SET_USER:
			return { ...state, user: action.payload }
		default:
			console.log(`Users reducer, nothing to mutate...`)
			return state
	}
}