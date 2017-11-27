
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
      type,
      callAPI,
      shouldCallAPI = () => true,
      payload = {}
    } = action

    if (!type || !(type instanceof ApiType)) {
      // Normal action: pass it on
      return next(action)
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.')
    }

    if (!shouldCallAPI(getState())) {
      return
    }

    dispatch({
      type: type.REQUEST,
      ...payload
    })

    return callAPI().then(
      response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json()
    }).then(
      json =>
        dispatch({
          type: type.SUCCESS,
          json,
          ...payload
        }),
      error =>
        dispatch({
          type: type.FAILURE,
          error,
          ...payload
        })
    )
  }
}

export default callAPIMiddleware
