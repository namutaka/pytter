import { createStore, applyMiddleware } from 'redux'
import reducer from '../reducers'
import callApiMiddleware from '../middlewares/callApiMiddleware'

const defaultConfig = {
}

function configureStore() {
  return createStore(
    reducer,
    defaultConfig,
    applyMiddleware(
      callApiMiddleware
    )
  )
}

export default configureStore
