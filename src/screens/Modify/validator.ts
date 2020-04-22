import validator from 'validator'
import moment from 'moment'
//
export interface ValidatorResult {
	result: string
	name?: string
	message?: string
}

export default function Validator (name: string, value: string): ValidatorResult {
	if (name === 'name') {
		if (value.length === 0) {
			return {
				result: 'none',
				name: 'name'
			}
		}
		else if (!validator.isAlphanumeric(value)) {
			return {
				result: 'error',
				name: 'name',
				message: 'The Firstname must consist of numbers and a set of latin characters'
			}
		}
		else if (!validator.isLength(value, { min: 4, max: 60 })) {
			return {
				result: 'error',
				name: 'name',
				message: 'Firstname must be at least 4 and not more than 60 characters'
			}
		}

		return {
			result: 'success',
			name: 'name'
		}
	}

	if (name === 'surname') {
		if (value.length === 0) {
			return {
				result: 'none',
				name: 'surname'
			}
		}
		else if (!validator.isAlphanumeric(value)) {
			return {
				result: 'error',
				name: 'surname',
				message: 'The Lastname must consist of numbers and a set of latin characters'
			}
		}
		else if (!validator.isLength(value, { min: 4, max: 60 })) {
			return {
				result: 'error',
				name: 'surname',
				message: 'Lastname must be at least 4 and not more than 60 characters'
			}
		}

		return {
			result: 'success',
			name: 'surname'
		}
	}

	if (name === 'email') {
		if (value.length === 0) {
			return {
				result: 'none',
				name: 'email'
			}
		}
		else if (!validator.isEmail(value)) {
			return {
				result: 'error',
				name: 'email',
				message: 'The email is not valid'
			}
		}

		return {
			result: 'success',
			name: 'email'
		}
	}

	if (name === 'phone_number') {
		if (value.length === 0) {
			return {
				result: 'none',
				name: 'phone_number'
			}
		}
		else if (!validator.isMobilePhone(value, 'any', { strictMode: true })) {
			return {
				result: 'error',
				name: 'phone_number',
				message: 'The phone number is not valid'
			}
		}

		return {
			result: 'success',
			name: 'phone_number'
		}
	}

	if (name === 'birthday') {
		if (value.length === 0) {
			return {
				result: 'none',
				name: 'birthday'
			}
		}
		//
		const [day, month, year]: Array<string> = value.split('.')

		const datetime = moment()

		datetime.set('day', Number(day))
		datetime.set('month', Number(month))
		datetime.set('year', Number(year))

		if (!datetime.isValid()) {
			return {
				result: 'error',
				name: 'birthday',
				message: 'The birthday day is not valid, only numbers 1-31'
			}
		}

		return {
			result: 'success',
			name: 'birthday'
		}
	}

	if (name === 'day') {
		if (value.length === 0) {
			return {
				result: 'none',
				name: 'day'
			}
		}
		else if (!validator.isInt(value)) {
			return {
				result: 'error',
				name: 'day',
				message: 'The birthday day is not valid, only numbers 1-31'
			}
		}
		else if (Number(value) < 1 && Number(value) > 31) {
			return {
				result: 'error',
				name: 'day',
				message: 'The birthday day is not valid, only numbers 1-31'
			}
		}

		return {
			result: 'success',
			name: 'day'
		}
	}

	if (name === 'month') {
		if (value.length === 0) {
			return {
				result: 'none',
				name: 'month'
			}
		}
		else if (!validator.isInt(value)) {
			return {
				result: 'error',
				name: 'month',
				message: 'The birthday month is not valid, only numbers 1-12'
			}
		}
		else if (Number(value) < 1 && Number(value) > 12) {
			return {
				result: 'error',
				name: 'month',
				message: 'The birthday month is not valid, only numbers 1-12'
			}
		}

		return {
			result: 'success',
			name: 'month'
		}
	}

	if (name === 'year') {
		if (value.length === 0) {
			return {
				result: 'none',
				name: 'year'
			}
		}
		if (!validator.isInt(value)) {
			return {
				result: 'error',
				name: 'year',
				message: 'The birthday year is not valid, only numbers 1950-' + moment().get('year')
			}
		}
		if (Number(value) < 1950 && Number(value) > Number(moment().get('year'))) {
			return {
				result: 'error',
				name: 'year',
				message: 'The birthday year is not valid, only numbers 1950-' + moment().get('year')
			}
		}

		return {
			result: 'success',
			name: 'year'
		}
	}

	return {
		result: 'success',
		name: 'other',
		message: ''
	}
}