import { useUserTokenStore } from '@/store/profile.store'
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

/**
 * Create an Axios instance with predefined configuration.
 * @returns {AxiosInstance} - Configured Axios instance.
 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Request interceptor to add token or other custom headers
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      let userToken = useUserTokenStore.getState().userToken
      if (!userToken) {
        // If no token, try to refresh it
        userToken = await useUserTokenStore.getState().refreshToken()
      }
      if (userToken) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${userToken}`
      }
      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )

  // Response interceptor to handle errors globally
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig | undefined

      if (error.response?.status === 401 && originalRequest) {
        try {
          const newToken = await useUserTokenStore.getState().refreshToken()
          if (newToken) {
            // Set the Authorization header for the retried request
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`
            return instance(originalRequest) // Retry the original request
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError)
          // Optionally, handle token refresh failure here (e.g., redirect to login)
        }
      }
      return Promise.reject(error)
    }
  )

  return instance
}

const axiosInstance = createAxiosInstance()

export default axiosInstance
