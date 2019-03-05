import { TOGGEL_ON, TOGGEL_OFF } from './types'

export const toggelOn = () => {
  return dispatch => {
    dispatch({ type: TOGGEL_ON, payload: true })
  }
}

export const toggelOff = () => {
  return dispatch => {
    dispatch({ type: TOGGEL_OFF, payload: false })
  }
}
