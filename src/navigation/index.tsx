import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// 
import MainScreen from '../screens/Main/main'
import GetScreen from '../screens/Main/full'
import CreateScreen from '../screens/Modify/create'
import EditScreen from '../screens/Modify/edit'
//
const Stack = createStackNavigator()
// 
function Navigation() {
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainScreen} options={MainScreen.navigationOptions} />
      <Stack.Screen name="Get" component={GetScreen} options={GetScreen.navigationOptions} />
      <Stack.Screen name="Create" component={CreateScreen} options={CreateScreen.navigationOptions} />
    </Stack.Navigator>
  </NavigationContainer>
}
//
export default Navigation