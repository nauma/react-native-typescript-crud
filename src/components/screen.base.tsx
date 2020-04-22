import React, { Component } from 'react'
import { View, Text } from 'react-native'
//
import API from '../api'
//
export default class BaseScreen<Props, State> extends Component<Props, State> {
	static navigationOptions: any = {}

	protected Api: API = new API()

	protected async ApiGetUsers (): Promise<void> {
		await this.props.SetUsersLoading(true)
		//
		const users = await this.Api.execute('users.list', {}, {})
		//
		await this.props.SetUsersList(users)
		await this.props.SetUsersLoading(false)
	}

	protected async ApiGetUser (id: string): Promise<void> {
		await this.props.SetUsersLoading(true)
		//
		const user = await this.Api.execute('users.get', { id }, {})
		//
		await this.props.SetUserItem(user)
		await this.props.SetUsersLoading(false)
	}

	protected async ApiAddUser (body: any): Promise<void> {
		await this.props.SetUsersLoading(true)
		//
		await this.Api.execute('users.add', {}, body)
		const users = await this.Api.execute('users.list', {}, {})
		//
		await this.props.SetUsersList(users)
		await this.props.SetUserItem(null)
		await this.props.SetUsersLoading(false)
	}

	protected async ApiEditUser (body: any): Promise<void> {
		await this.props.SetUsersLoading(true)
		//
		await this.Api.execute('users.edit', { id: body._id }, body)
		const users = await this.Api.execute('users.list', {}, {})
		//
		await this.props.SetUsersList(users)
		await this.props.SetUserItem(null)
		await this.props.SetUsersLoading(false)
	}

	protected async ApiRemoveUser (id: string): Promise<void> {
		await this.props.SetUsersLoading(true)
		//
		await this.Api.execute('users.remove', { id })
		const users = await this.Api.execute('users.list', {}, {})
		//
		await this.props.SetUsersList(users)
		await this.props.SetUserItem(null)
		await this.props.SetUsersLoading(false)
	}

	render (): React.ReactElement {
		return <View>
			<Text>Hello screen</Text>
		</View>
	}
}