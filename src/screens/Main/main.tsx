import React from 'react'
import { Button, Text } from "native-base"

import { connect } from 'react-redux'
//
import * as mapActions from "../../store/users/actions"

import BaseScreen from '../../components/screen.base'
import { Body } from '../../components/views.base'

import * as Views from './views'
import * as Types from './types'
//
class Screen extends BaseScreen<Types.ScreenPropsType, Types.ScreenStateType> {
  static navigationOptions = ({ navigation, route }: any) => ({
    title: 'Users',
    headerRight: () => <Button transparent onPress={() => { navigation.navigate('Create'); return; }}><Text style={{fontSize: 25}}>+</Text></Button>
  })

  async componentDidMount(): Promise<void> {
    await this.ApiGetUsers()
  }

  private getFullUser (user: Types.UserItemType) {
    this.props.SetUserItem(null)
    this.props.navigation.navigate('Get', { _id: user._id, fullname: `${user.name} ${user.surname}` })
  }

  render () {
    const { users, loading }: any = this.props.user

    return <Body>
      { users && users.map((user: any) =>
        <Views.UserBlock
          key={user._id}
          {...user}
          onPress={this.getFullUser.bind(this, user)}
        />
      ) }

      { Boolean(users.length === 0 && loading === false ) && <Text>Ничего нет.</Text> }
      { Boolean(loading ) && <Text>Загрузка...</Text> }
    </Body>
  }
}
//
const mapState = (store: any) => store

export default connect(mapState, mapActions)(Screen)