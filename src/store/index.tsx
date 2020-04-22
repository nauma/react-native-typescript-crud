import React from 'react'

import { combineReducers, createStore } from "redux"
import { Provider } from 'react-redux'
//
import { usersReducer } from './users/reducers'
//
const rootReducer = combineReducers({
	user: usersReducer,
})

const store = createStore(rootReducer)
//
export default function Store (props: any): React.ReactElement {
	return <Provider store={store}>
			{props.children}
		</Provider>
}