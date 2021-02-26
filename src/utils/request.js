import axios from 'axios'

const http = axios.create({
	baseURL: 'https://api.okzy.tv/',
	timeout: 1000 * 60,
	withCredentials: false
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
	return config
}, error => {
	return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
	response=response.data
	return response
}, error => {
	console.error(error)
	return Promise.reject(error)
})

export default http
