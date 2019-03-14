import { ADD_WEBHOOK, DELETE_WEBHOOK } from '../actions/types'

const initialState = {
  active: false,
  url: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_WEBHOOK:
      console.log(action.payload)
      return { ...state, active: true, url: 'someurl' }

    case DELETE_WEBHOOK:
      console.log(action.payload)
      return { ...state, active: false, url: 'someurl' }
    default:
      return state
  }
}
