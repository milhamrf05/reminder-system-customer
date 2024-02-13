import { LocalStorage } from 'quasar';

/**
 * Sets the 'token' cookie with the provided token value.
 *
 * @param {string} token - The token value to be set as a cookie.
 * @returns {boolean} - Returns true if the cookie is successfully set, otherwise false.
 */
const useSignInSetLocalStorage = (token: string): boolean => {
  // Validate token parameter
  if (token && token.trim() !== '') {
    try {
      // Set token as cookie
      LocalStorage.set('token', token);
      return true; // Return success status
    } catch (error) {
      console.error('Failed to set Local Storage:', error);
      return false; // Return failure status
    }
  } else {
    return false; // Return failure status if token is empty or null
  }
};

export { useSignInSetLocalStorage };
