import {
	SET_LOADING,
	SET_USERS,
	SET_USER,

	UserItemType,
	UserActionTypes
} from "./types";

export function SetUsersLoading (loading: boolean): UserActionTypes {
	return {
		type: SET_LOADING,
		payload: loading
	}
}

export function SetUsersList (users: Array<UserItemType>): UserActionTypes {
	return {
		type: SET_USERS,
		payload: users
	}
}

export function SetUserItem (user: UserItemType): UserActionTypes {
	return {
		type: SET_USER,
		payload: user
	}
}