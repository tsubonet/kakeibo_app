export default function reducer(state = [], action) {
  switch (action.type) {
    case 'GET_RECORDSYEAR':
      return action.recordsYear
    default:
      return state
  }
}
