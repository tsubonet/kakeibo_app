export default function reducer(state = [], action) {
  switch (action.type) {
    case 'GET_BUDGETSYEAR':
      return action.budgetsYear
    default:
      return state
  }
}
