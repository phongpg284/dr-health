import { REACT_APP_SERVER_URL } from 'config/config';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: REACT_APP_SERVER_URL,
  timeout: 30000
});

export default axiosInstance;
