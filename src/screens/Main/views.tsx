import React from "react"
import { Card, CardItem, Body, Text, Button } from "native-base"
import moment from 'moment'
//
import Styles from './styles'

import { UserItemType } from './types'
//
export type UserBlockPropsType = {
	onPress?: any
}

export function UserBlock (props: UserItemType & UserBlockPropsType): React.ReactElement {
	return <Card>
		<CardItem header bordered button onPress={props.onPress}>
			<Body>
				<Text><Text style={Styles.card_item_title}>id:</Text> { props._id }</Text>
			</Body>
		</CardItem>

		<CardItem>
			<Body>
				<Text><Text style={Styles.card_item_title}>Fullname:</Text> { props.name } { props.surname }</Text>
			</Body>
		</CardItem>

		<CardItem>
			<Body>
				<Text><Text style={Styles.card_item_title}>Email:</Text> { props.email }</Text>
			</Body>
		</CardItem>

		<CardItem>
			<Body>
				<Text><Text style={Styles.card_item_title}>Phone Number:</Text> { props.phone_number }</Text>
			</Body>
		</CardItem>
	</Card>
}

UserBlock.defaultProps = {
	onPress: (() => {}),
}

//
export type UserFullPropsType = {
	onPressEdit?: any
	onPressRemove?: any
}

export function UserFull (props: UserItemType & UserFullPropsType): React.ReactElement {
	return <Card>
		<CardItem header bordered>
			<Body>
				<Text><Text style={Styles.card_item_title}>id:</Text> { props._id }</Text>
			</Body>
		</CardItem>

		<CardItem>
			<Body>
				<Text><Text style={Styles.card_item_title}>Fullname:</Text> { props.name } { props.surname }</Text>
			</Body>
		</CardItem>

		<CardItem>
			<Body>
				<Text><Text style={Styles.card_item_title}>Email:</Text> { props.email }</Text>
			</Body>
		</CardItem>

		<CardItem>
			<Body>
				<Text><Text style={Styles.card_item_title}>Phone Number:</Text> { props.phone_number }</Text>
			</Body>
		</CardItem>

		<CardItem>
			<Body>
				<Text><Text style={Styles.card_item_title}>Birthday:</Text> { props.birthday_date }</Text>
			</Body>
		</CardItem>

		<CardItem>
			<Body>
				<Text><Text style={Styles.card_item_title}>Create datetime:</Text> { moment(Number(props.created)).format('LLL') }</Text>
			</Body>
		</CardItem>

		<CardItem>
			<Body>
				<Text><Text style={Styles.card_item_title}>Last update:</Text> { moment(Number(props.updated)).format('LLL') }</Text>
			</Body>
		</CardItem>

		<CardItem footer bordered>
			<Body style={Styles.button_block}>
				<Button full bordered rounded warning style={Styles.button_margin} onPress={props.onPressEdit}><Text>Edit</Text></Button>
				<Button full bordered rounded danger onPress={props.onPressRemove}><Text>Remove</Text></Button>
			</Body>
		</CardItem>
	</Card>
}

UserFull.defaultProps = {
	onPressEdit: (() => {}),
	onPressRemove: (() => {}),
}