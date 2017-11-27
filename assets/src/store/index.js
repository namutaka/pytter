import { createStore, applyMiddleware } from 'redux'
import reducer from '../reducers'
import promiseMiddleware from 'redux-promise';

const defaultConfig = {
  tweets: []
}

function configureStore() {
  return createStore(
    reducer,
    defaultConfig,
    applyMiddleware(
      promiseMiddleware
    )
  )
}

export default configureStore
