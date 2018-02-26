export default function reducer(state = [], action) {
  switch (action.type) {
    case 'GET_RECORDS':
      return action.records
    case 'POST_RECORD':
      return [...state, action.record]
    case 'PATCH_RECORD':
      return [...state].map(record => {
        if (record.id === action.record.id) {
          return action.record
        } else {
          return record
        }
      })
    case 'DELETE_RECORD':
      return [...state].filter(record => record.id !== action.record.id)
    default:
      return state
  }
}
