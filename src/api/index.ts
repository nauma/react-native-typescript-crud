import axios, {AxiosRequestConfig} from 'axios'
//
import * as Types from './types'
//
export default class API {
	protected config: Types.ApiConfigType = {
		baseURL: 'https://crudcrud.com/api/',
		token: '1b2f050b78784ed0bdadc7e05bcb09fb'
	}

	public routes: Types.ApiRoutesType = {
		'users.list': {
			method: 'get',
			link: '/users'
		},

		'users.get': {
			method: 'get',
			link ({ id }: any) { return `/users/${id}` }
		},

		'users.add': {
			method: 'post',
			link: '/users',
			body: true
		},

		'users.edit': {
			method: 'put',
			link ({ id }: any) { return `/users/${id}` },
			body: true
		},

		'users.remove': {
			method: 'delete',
			link ({ id }: any) { return `/users/${id}` }
		},
	}

	public client: any

	constructor() {
		const config: AxiosRequestConfig = {
			baseURL: this.config.baseURL + this.config.token,
			timeout: 30 * 1000
		}
		this.client = axios.create(config)
	}

	public async execute (name: string, params?: Record<string, string>, body?: Record<string, string>): Promise<void> {
		if (!this.routes.hasOwnProperty(name)) {
			throw new Error(`Route '${name}' is not defined`)
		}
		//
		const route: Types.ApiRouteType = this.routes[name]

		let query: any = {
			method: route.method,
			responseType: 'json'
		}

		if (typeof route.link === 'string') {
			query.url = route.link
		} else {
			query.url = route.link(params)
		}

		if (route.hasOwnProperty('body') && route.body === true) {
			query.data = body
		}
		//
		return this.client(query)
			.then((response: any) => {
				console.log('response', response.data)

				return Promise.resolve(response.data)
			})
			.catch((e: any) => {
				console.log(e)

				return Promise.reject(e)
			})
	}
}