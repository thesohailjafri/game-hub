import axios, { AxiosRequestConfig } from "axios";
const {VITE_RAWG_API_KEY}=import.meta.env;
export interface FetchResponse<T> {
	count: number;
	next: string | null;
	previous: string | null;
	results: T[];
}

const axiosInstance = axios.create({
	baseURL: 'https://api.rawg.io/api',
	params: {
		key: VITE_RAWG_API_KEY,
	},
});

class APIClient<T>{
	endpoint: string;
	constructor(endpoint: string) {
		this.endpoint = endpoint;
	}

	getAll=async(config:AxiosRequestConfig)=>{
		return axiosInstance.get<FetchResponse<T>>(this.endpoint, config).then((response) => response.data);
	}

	getOne=async(id: string | number)=>{
		return axiosInstance.get<T>(`${this.endpoint}/${id}`).then((response) => response.data);
	}
}

export default APIClient;