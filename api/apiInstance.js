import axios from 'axios'
import store from '../store/store'
const apiInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

apiInstance.interceptors.request.use(
  function (config) {
    const state = store.getState()
    const token = state.auth.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log('request interceptor')
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

apiInstance.interceptors.response.use(
  function (response) {
    console.log('response', response)
    console.log('response interceptor')
    return response
  },
  async function (error) {
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config._retry
    ) {
      console.log('Attempting token refresh...')
      error.config._retry = true
      const state = store.getState()
      const refresh_token = state.auth.refresh_token
      const data = {
        refresh_token: refresh_token,
      }
      const jsonString = JSON.stringify(data)
      return await apiInstance
        .post('/auth/refresh-token', jsonString)
        .then((res) => {
          if (res.status === 200) {
            store.dispatch({
              type: 'auth/login',
              payload: {
                access_token: res.data.access_token,
                refresh_token: refresh_token,
              },
            })
            console.log('Access token refreshed!')
            return apiInstance.request(error.config)
          }
        })
        .catch((err) => {
          console.log('Refresh token failed!')
          store.dispatch({
            type: 'auth/logout',
          })
          return Promise.reject(error)
        })
    }
    return Promise.reject(error)
  }
)

export default apiInstance
