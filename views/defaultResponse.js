const defaultResponse = {
  renderDatas: (datas) => {
    return {
      status: 'success',
      data: datas,
    }
  },

  renderData: (data) => {
    if (data) {
      return {
        status: 'success',
        data: data,
      }
    } else {
      return {
        status: 'error',
        message: 'Data not found',
      }
    }
  },

  renderCreatedData: (data) => {
    return {
      status: 'success',
      data: data,
      message: 'Data created successfully',
    }
  },

  renderUpdatedData: (data) => {
    return {
      status: 'success',
      data: data,
      message: 'Data updated successfully',
    }
  },

  renderDeletedData: () => {
    return {
      status: 'success',
      message: 'Data deleted successfully',
    }
  },

  renderError: (error) => {
    return {
      status: 'error',
      message: error.message,
    }
  },
}

export default defaultResponse
