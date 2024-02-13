import { LocalStorage } from 'quasar';

/**
 * Checks if the user is authenticated.
 *
 * @returns {boolean} Returns true if the user is authenticated, false otherwise.
 */
const isAuthenticated = (): boolean => {
  const token = LocalStorage.getItem('token');
  return !!token;
};

export { isAuthenticated };
