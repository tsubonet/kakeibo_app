export default function reducer(state = null, action) {
  switch (action.type) {
    case 'GET_RECORD':
      return action.record
    case 'DELETE_RECORD':
      return null
    default:
      return state
  }
}
