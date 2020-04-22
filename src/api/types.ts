export type ApiConfigType = {
	baseURL: string
	token: string
}

export type ApiRouteType = {
	method: string
	link: string | any
	body?: boolean
}

export type ApiRoutesType = Record<string, ApiRouteType>
