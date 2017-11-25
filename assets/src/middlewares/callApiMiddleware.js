
export class ApiType {
  constructor(type) {
    this.REQUEST = type + '_REQUEST';
    this.SUCCESS = type + '_SUCCESS';
    this.FAILURE = type + '_FAILURE';
  }
}

function callAPIMiddleware({ dispatch, getState }) {
  return next => action => {
    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
      payload = {}
    } = action

    if (!types) {
      // Normal action: pass it on
      return next(action)
    }

    if (!types instanceof ApiType) {
      throw new Error('Expected an array of three string types.')
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.')
    }

    if (!shouldCallAPI(getState())) {
      return
    }

    const [requestType, successType, failureType] = types

    dispatch(
      Object.assign({}, payload, {
        type: requestType
      })
    )

    return callAPI().then(
      response =>
        dispatch(
          Object.assign({}, payload, {
            response,
            type: successType
          })
        ),
      error =>
        dispatch(
          Object.assign({}, payload, {
            error,
            type: failureType
          })
        )
    )
  }
}

export default callAPIMiddleware
