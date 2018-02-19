export default function reducer(state: string = '', action): string {
  switch (action.type) {
    case 'GET_ACTION_PATH':
      return action.actionPath
    default:
      return state
  }
}
