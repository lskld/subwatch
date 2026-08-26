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