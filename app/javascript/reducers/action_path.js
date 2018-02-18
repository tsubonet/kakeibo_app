export default function reducer(state = '', action) {
  switch (action.type) {
    case 'GET_ACTION_PATH':
      return action.actionPath
    default:
      return state
  }
}
