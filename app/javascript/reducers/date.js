const initialState = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  date: new Date().getDate(),
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_DATE':
      return Object.assign({}, state, action.date)
    default:
      return state
  }
}
