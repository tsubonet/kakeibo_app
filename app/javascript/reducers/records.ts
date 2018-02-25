export default function reducer(state = [], action) {
  switch (action.type) {
    case 'GET_RECORDS':
      return action.records
    case 'POST_RECORD':
      return [...state, action.record]
    case 'DELETE_RECORDS':
      return null
    default:
      return state
  }
}
