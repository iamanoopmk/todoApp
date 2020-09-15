import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import appReducer from './reducers/rootReducer'

const loggerMiddleware = createLogger()


export default function configureStore(preloadedState) {
  return createStore(
    appReducer,
    preloadedState,
    applyMiddleware(
    	thunkMiddleware,
      	loggerMiddleware
    )
  )
}