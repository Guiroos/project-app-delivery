import axios from 'axios';

const PORT = 3001;
const hostName = process.env.REACT_APP_HOSTNAME || 'localhost';
const backPort = process.env.REACT_APP_BACKEND_PORT || PORT;

const appURL = `http://${hostName}:${backPort}`;

const api = axios.create({ baseURL: appURL });

export const apiGet = async (url) => api.get(url);

export const apiPostBody = async (url, body) => api.post(url, body);

export const apiPostOrder = async (url, body, token) => api.post(url, body, {
  headers: {
    'content-type': 'application/json',
    authorization: token,
  },
});

export const apiPut = async (url, body) => api.put(url, body);

export default api;
