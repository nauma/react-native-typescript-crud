import React from 'react'
import { Alert } from 'react-native'

import { connect } from 'react-redux'
//
import * as mapActions from "../../store/users/actions"

import BaseScreen from '../../components/screen.base'
import { Body } from '../../components/views.base'
import * as Views from './views'
import * as Types from './types'
import FormValidator, { ValidatorResult } from './validator'
import {Text} from "native-base";
//
class Screen extends BaseScreen<Types.ScreenPropsType, Types.ScreenStateType> {
  static navigationOptions = ({ route }: any) => ({
    title: route.params && route.params._id ? 'Edit user' : 'Add user'
  })

  state: Types.ScreenStateType = {
    _id: '',
    name: '',
    surname: '',
    email: '',
    phone_number: '',
    birthday_date: '1.1.1990',
    created: String(+ new Date()),
    updated: String(+ new Date()),
  }

  private get validator () {
    let result: Record<string, string | boolean> = {
      errorMessage: '',
      name: 'none',
      surname: 'none',
      email: 'none',
      phone_number: 'none',
      birthday_day: 'none',
      birthday_month: 'none',
      birthday_year: 'none'
    }
    //
    const state: any = this.state

    for (let key in this.state) {
      if (key === 'created' || key === 'updated') continue

      const value: any = state[key]

      if (value.length === 0) continue

      if (key === 'birthday_date') {
        const [day, month, year]: Array<string> = state[key].split('.')
        const datetime: any = { day, month, year }
        const keys: Array<string> = Object.keys(datetime)

        for (let i in keys) {
          const bkey: string = keys[i]
          const bvalue: string = datetime[bkey]

          const cheker: ValidatorResult = FormValidator(bkey, bvalue)

          if (cheker.result === 'error') {
            result.errorMessage = cheker.message || ''
          }

          result['birthday_' + bkey] = cheker.result
        }

        const cheker: ValidatorResult = FormValidator('birthday', value)

        if (cheker.result === 'error') {
          result.errorMessage = cheker.message || ''
        }

      } else {
        const cheker: ValidatorResult = FormValidator(key, value)

        if (cheker.result === 'error') {
          result.errorMessage = cheker.message || ''
        }
        result[key] = cheker.result

      }
    }
    //
    return result
  }

  private get id (): string {
    return (this.props.route.params && this.props.route.params._id) || ''
  }

  async componentDidMount(): Promise<void> {
    if (this.id.length > 0) {
      await this.ApiGetUser(this.id)
      //
      const user: Types.UserItemType = this.props.user && this.props.user.user

      await this.setState({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone_number: user.phone_number,
        birthday_date: user.birthday_date,
        created: user.created,
      })
    }
  }

  private async onChangeForm (key: string, value: string | number): Promise<void> {
    if (key === 'day' || key === 'month' || key === 'year') {
      const [day, month, year]: Array<string> = this.state.birthday_date.split('.')

      if (key === 'day') {
        this.setState({ birthday_date: `${value}.${month || 1}.${year || 1990}` })
      }
      else if (key === 'month') {
        this.setState({ birthday_date: `${day || 1}.${value}.${year || 1990}` })
      }
      else if (key === 'year') {
        this.setState({ birthday_date: `${day || 1}.${month || 1}.${value}` })
      }
      return
    }
    //
    const state: any = { [key]: value }
    this.setState(state)
  }

  private async onSubmitForm (): Promise<void> {
    const { _id, name, surname, email, phone_number, birthday_date, created } = this.state

    if (this.id.length > 0) {

    } else {

    }
    await this[this.id.length > 0 ? 'ApiEditUser' : 'ApiAddUser']({
      _id,
      name,
      surname,
      email,
      phone_number,
      birthday_date,
      created: _id && _id.length > 0 ? created : String(+(new Date())),
      updated: String(+(new Date()))
    })

    await this.setState({
      _id: '',
      name: '',
      surname: '',
      email: '',
      phone_number: '',
      birthday_date: '',
      created: String(+ new Date()),
      updated: String(+ new Date()),
    })

    if (this.id.length > 0) {
      this.props.navigation.replace('Main')
    } else {
      this.props.navigation.goBack()

    }

    Alert.alert('Success!', 'Adding user is successful!')
  }

  render () {
    return <Body>
      { Boolean(this.id.length > 0 ? this.id === this.state._id : true) && <Views.UserModify
        _id={this.state._id}
        name={this.state.name}
        surname={this.state.surname}
        phone_number={this.state.phone_number}
        email={this.state.email}
        birthday_date={this.state.birthday_date}

        validator={this.validator}

        onChangeName={this.onChangeForm.bind(this, 'name')}
        onChangeSurname={this.onChangeForm.bind(this, 'surname')}
        onChangeEmail={this.onChangeForm.bind(this, 'email')}
        onChangePhone={this.onChangeForm.bind(this, 'phone_number')}
        onChangeBirthday={this.onChangeForm.bind(this)}

        onSubmit={this.onSubmitForm.bind(this)}
      />}
      { Boolean(this.props.user.loading ) && <Text>Загрузка...</Text> }
    </Body>
  }
}
//
const mapState = (store: any) => store

export default connect(mapState, mapActions)(Screen)