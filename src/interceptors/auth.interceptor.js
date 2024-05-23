import axios from 'axios';

axios.interceptors.request.use((config) => {
  if (import.meta.env.PROD) {
    config.url = config.url.replace('/api', import.meta.env.VITE_API_URL);
  }
  config.headers.Authorization = `Bearer ${
    localStorage.getItem('token') || sessionStorage.getItem('token')
  }`;
  return config;
});

export default axios;
