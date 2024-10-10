const defaultResponse = {
  /**
   * Renders a successful JSON response with a list of data.
   * @param {Array} datas - The list of data to be rendered.
   * @returns {Object} The JSON response object with status and data.
   */
  renderDatas: (datas) => {
    return {
      status: 'success',
      data: datas,
    }
  },

  /**
   * Renders a successful JSON response with a single data.
   * If no data is provided, renders an error response with a message.
   * @param {Object} data - The data to be rendered.
   * @returns {Object} The JSON response object with status and data.
   */
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

  /**
   * Renders a successful JSON response with a single data and a message
   * indicating that the data has been created successfully.
   * @param {Object} data - The data to be rendered.
   * @returns {Object} The JSON response object with status, data, and message.
   */
  renderCreatedData: (data) => {
    return {
      status: 'success',
      data: data,
      message: 'Data created successfully',
    }
  },

  /**
   * Renders a successful JSON response with a single data and a message
   * indicating that the data has been updated successfully.
   * @param {Object} data - The data to be rendered.
   * @returns {Object} The JSON response object with status, data, and message.
   */
  renderUpdatedData: (data) => {
    return {
      status: 'success',
      data: data,
      message: 'Data updated successfully',
    }
  },

  /**
   * Renders a successful JSON response with a message indicating that the data
   * has been deleted successfully.
   * @returns {Object} The JSON response object with status and message.
   */
  renderDeletedData: () => {
    return {
      status: 'success',
      message: 'Data deleted successfully',
    }
  },

  /**
   * Renders an error JSON response with a message indicating the error.
   * @param {Error} error - The error object with a message.
   * @returns {Object} The JSON response object with status and message.
   */
  renderError: (error) => {
    return {
      status: 'error',
      message: error.message,
    }
  },
}

export default defaultResponse
