// types
export const SET_LOADING: string = 'users/set_loading'
export const SET_USERS: string = 'users/set_users'
export const SET_USER: string = 'users/set_user'
//
export type UsersState = {
	users: Array<UserItemType>
	user: UserItemType | null
	loading: Boolean
}

export type UserItemType = {
	_id?: string
	name: string
	surname: string
	birthday_date: string
	phone_number: string
	email: string
	created?: string
	updated?: string
}
//
interface SetLoadingAction {
	type: typeof SET_LOADING
	payload: boolean
}

interface SetUsersAction {
	type: typeof SET_USERS
	payload: Array<UserItemType>
}

interface SetUserAction {
	type: typeof SET_USER,
	payload: UserItemType | null
}

export type UserActionTypes = SetLoadingAction | SetUsersAction | SetUserAction
