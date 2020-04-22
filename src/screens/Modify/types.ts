import {StackNavigationProp} from "@react-navigation/stack"
import { UserItemType, UsersState } from "../../store/users/types"

// Structures
export type { UserItemType }

export interface ValidatorStructure {
  submitDisable: boolean
  errorMessage: string
  //
  name: string
  surname: string
  email: string
  phone_number: string

  birthday_day: string
  birthday_month: string
  birthday_year: string
}

// Screen component types
export type ScreenPropsType = {
  navigation: any
  route: any

  loading: boolean
  user: UsersState
}

export type ScreenStateType = UserItemType