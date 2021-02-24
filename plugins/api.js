export default function ({ $http, error }, inject) {
  inject('api', {
    getHomes,
    getHomeById,
  })

  function getHomes() {
    return get('homes')
  }

  function getHomeById(homeId) {
    return get(`homes/${homeId}`)
  }

  async function get(url) {
    try {
      const data = await $http.$get(url)
      return {
        success: true,
        data,
      }
    } catch ({ response }) {
      const errorData = {
        statusCode: response.data.statusCode,
        message: response.data.message,
      }
      error(errorData)
      return getErrorResponse(response)
    }
  }

  function getErrorResponse({ data }) {
    return {
      success: false,
      statusCode: data.status,
      message: data.message,
      data: {},
    }
  }
}
