import axios from 'axios';
import { LocalStorage } from 'quasar';

/**
 * Creates an instance of axios with authorization headers.
 *
 * @returns {AxiosInstance} The axios instance with authorization headers.
 */
const useApiWithAuthorization = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    Authorization: `Bearer ${LocalStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
});

export { useApiWithAuthorization };
