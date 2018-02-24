export default function reducer(state = null, action) {
  switch (action.type) {
    case 'GET_BUDGET':
      return action.budget
    case 'DELETE_BUDGET':
      return null
    default:
      return state
  }
}
