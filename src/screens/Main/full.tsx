import React from 'react'
import {ActivityIndicator, Alert} from 'react-native'
import { connect } from 'react-redux'
//
import * as mapActions from '../../store/users/actions'

import BaseScreen from '../../components/screen.base'
import { Body } from '../../components/views.base'

import * as Views from './views'
import * as Types from './types'
//
class Screen extends BaseScreen<Types.ScreenPropsType, Types.ScreenStateType> {
  static navigationOptions = ({ navigation, route }: any) => ({
    title: `User ${route.params.fullname}`,
  })

  async componentDidMount(): Promise<void> {
    const { _id } = this.props.route.params || {}

    await this.ApiGetUser(_id)
  }

  async removeUser (user: Types.UserItemType): Promise<void> {
    await this.ApiRemoveUser(String(user._id))
    //
    Alert.alert('Success', 'User remove success!')
    //
    this.props.navigation.goBack()
  }

  render () {
    const { user } = this.props.user
    const navigation: any = this.props.navigation

    return <Body>
      { user !== null ? <Views.UserFull
        {...user}
        onPressEdit={() => { navigation.navigate('Create', { _id: user._id, fullname: `${user.name} ${user.surname}` }); }}
        onPressRemove={this.removeUser.bind(this, user)}
      /> : <ActivityIndicator size={'large'} />  }
    </Body>
  }
}
//
const mapState = (store: any) => store

export default connect(mapState, mapActions)(Screen)