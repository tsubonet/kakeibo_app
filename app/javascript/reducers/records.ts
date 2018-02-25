export default function reducer(state = [], action) {
  switch (action.type) {
    case 'GET_RECORDS':
      return action.records
    case 'DELETE_RECORDS':
      return null
    default:
      return state
  }
}
