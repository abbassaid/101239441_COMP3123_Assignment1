import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8585/api/v1', // Replace with your backend URL
});

export default api;
