export const fetchRootProps = (url, { pushState }, callback) => {
  return {
    type: 'FETCH_ROOT_RROPS_REQUESTED',
    payload: {
      url: url,
      pushState: pushState,
      callback: callback,
    },
  }
}

export const postRecord = (date, result) => {
  return {
    type: 'POST_RECORD_REQUESTED',
    payload: {
      date: date,
      result: result,
    },
  }
}

export const patchRecord = (record, result) => {
  return {
    type: 'PATCH_RECORD_REQUESTED',
    payload: {
      record: record,
      result: result,
    },
  }
}

export const deleteRecord = record => {
  return {
    type: 'DELETE_RECORD_REQUESTED',
    payload: {
      record: record,
    },
  }
}
