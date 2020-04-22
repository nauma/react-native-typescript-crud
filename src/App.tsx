import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar } from 'react-native'
//
import Store from './store'
import Navigation from './navigation'
//
export default function App (): React.ReactElement  {
  return <Store>
      <StatusBar barStyle="light-content" />
      <Navigation />
    </Store>
}
