import axios from "axios";

export const mainApi = axios.create({
	baseURL: "http://localhost:5114/api/",
});

mainApi.interceptors.request.use((config) => {
	const token = localStorage.getItem("jwt_token");

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

mainApi.interceptors.response.use(
	(response) => response,
	(error) => {
		if (axios.isAxiosError(error) && error.response?.status === 401) {
			localStorage.removeItem("jwt_token");
			window.location.href = "/login";
		}
		return Promise.reject(error);
	},
);