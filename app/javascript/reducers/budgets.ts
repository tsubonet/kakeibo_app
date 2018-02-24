export default function reducer(state = [], action) {
  switch (action.type) {
    case 'GET_BUDGETS':
      return action.budgets
    default:
      return state
  }
}
