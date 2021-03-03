export default function ({ $http, error }, inject) {
  inject('api', {
    getHomes,
    getHomeById,
    getReviewsByHomeId,
  })

  function getHomes() {
    return get('homes')
  }

  function getHomeById(homeId) {
    return get(`homes/${homeId}`)
  }

  async function getReviewsByHomeId(homeId) {
    const result = await post('reviews/query', {
      filters: `homeId:${homeId}`,
      hitsPerPage: 6,
      attributesToHighlight: [],
    })

    return {
      ...result,
      data: result.data.hits ?? {},
    }
  }

  function get(url) {
    return wrap($http.$get(url))
  }

  function post(url, body) {
    return wrap($http.$post(url, body))
  }

  async function wrap(promise) {
    try {
      const data = await promise
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
