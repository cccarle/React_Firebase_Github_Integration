import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'react-redux'

// Reducer
import rootReducer from './reducers'
const middleware = [thunk]

const intialState = {}
const store = createStore(
  rootReducer,
  intialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && WINDOW.__REDUX_DEVTOOLS_EXTENSION__()
  )
)
export default store
