import axios from 'axios';

const PORT = 3001;
const hostName = process.env.REACT_APP_HOSTNAME || 'localhost';
const backPort = process.env.REACT_APP_BACKEND_PORT || PORT;

const localURL = `http://${hostName}:${backPort}`;
const dbURL = process.env.REACT_APP_DB_URL;

const api = axios.create({ baseURL: dbURL || localURL});

export const apiGet = async (url) => api.get(url);

export const apiPostBody = async (url, body) => api.post(url, body);

export const apiPostToken = async (url, body, token) => api.post(url, body, {
  headers: {
    'content-type': 'application/json',
    authorization: token,
  },
});

export const apiPut = async (url, body) => api.put(url, body);

export const apiDelete = async (url) => api.delete(url);

export default api;
