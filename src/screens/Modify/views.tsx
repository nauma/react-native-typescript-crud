import React from "react"
import {Content, Card, CardItem, Body, Text, Button, Form, Label, Input, Item, Grid, Row, Col} from "native-base";
//
import Styles from './styles'
import * as Types from './types'
//
export type UserBlockType = {
	onSubmit?: any
	onChangeName?: any
	onChangeSurname?: any
	onChangeEmail?: any
	onChangePhone?: any
	onChangeBirthday?: any
	validator?: any
}

export function UserModify (props: Types.UserItemType & UserBlockType): React.ReactElement {
	const [day, month, year]: Array<string> = props.birthday_date.split('.')
	// @ts-ignore
	return <Card transparent>
		<CardItem cardBody bordered>
			<Content>
				<Form>
					<Item stackedLabel error={props.validator.name === 'error' ? true : undefined} success={props.validator.name === 'success' ? true : undefined}>
						<Label>First name</Label>
						<Input defaultValue={props.name} onChangeText={props.onChangeName} maxLength={60} />
					</Item>

					<Item stackedLabel error={props.validator.surname === 'error' ? true : undefined} success={props.validator.surname === 'success' ? true : undefined}>
						<Label>Last name</Label>
						<Input defaultValue={props.surname} onChangeText={props.onChangeSurname} maxLength={60} />
					</Item>

					<Item stackedLabel error={props.validator.email === 'error' ? true : undefined} success={props.validator.email === 'success' ? true : undefined}>
						<Label>Email</Label>
						<Input defaultValue={props.email} onChangeText={props.onChangeEmail} keyboardType={'email-address'} maxLength={60} />
					</Item>

					<Item stackedLabel error={props.validator.phone_number === 'error' ? true : undefined} success={props.validator.phone_number === 'success' ? true : undefined}>
						<Label>Phone number</Label>
						<Input defaultValue={props.phone_number} onChangeText={props.onChangePhone} keyboardType={'phone-pad'} />
					</Item>
				</Form>
			</Content>
		</CardItem>

		<CardItem last style={{ marginTop: 10 }}>
			<Content>
				<Grid>
					<Col>
						<Text>Birthday Date</Text>
					</Col>
					<Row>
						<Item
							style={{flex: 1}}
							error={props.validator.birthday_day === 'error' ? true : undefined}
							success={props.validator.birthday_day === 'success' ? true : undefined}
						>
							<Input
								placeholder={'Day'}
								defaultValue={day}
								onChangeText={(value: string) => props.onChangeBirthday('day', value)}
								keyboardType={'number-pad'}
								maxLength={2}
							/>
						</Item>
						<Item
							style={{flex: 1}}
							error={props.validator.birthday_month === 'error' ? true : undefined}
							success={props.validator.birthday_month === 'success' ? true : undefined}
						>
							<Input
								placeholder={'Month'}
								defaultValue={month}
								onChangeText={(value: string) => props.onChangeBirthday('month', value)}
								keyboardType={'number-pad'}
								maxLength={2}
							/>
						</Item>
						<Item
							style={{flex: 2}}
							error={props.validator.birthday_year === 'error' ? true : undefined}
							success={props.validator.birthday_year === 'success' ? true : undefined}
						>
							<Input
								placeholder={'Year'}
								defaultValue={year}
								onChangeText={(value: string) => props.onChangeBirthday('year', value)}
								keyboardType={'number-pad'}
								maxLength={4}
							/>
						</Item>
					</Row>
				</Grid>
			</Content>
		</CardItem>

		{ props.validator.errorMessage.length > 0 && <CardItem>
			<Body><Text style={{ color: 'red', alignSelf: 'center' }} >{ props.validator.errorMessage }</Text></Body>
		</CardItem>}

		<CardItem footer>
			<Body style={Styles.button_block}>
				<Button full rounded success onPress={props.onSubmit} disabled={props.validator.errorMessage.length > 0}><Text>{ props._id && props._id.length > 0 ? 'Save' : 'Add' }</Text></Button>
			</Body>
		</CardItem>
	</Card>
}