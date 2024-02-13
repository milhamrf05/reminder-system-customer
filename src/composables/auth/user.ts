import { AxiosResponse } from 'axios';
import { LocalStorage } from 'quasar';
import { api } from 'src/boot/axios';

/**
 * Retrieves user data from the API using the provided token.
 *
 * @param {null | string} token - The authentication token for the user.
 * @returns {Promise<AxiosResponse>} - A promise that resolves to the response from the API.
 * @throws {Error} - If an error occurs during the API request.
 */
const useUser = async (token: null | string): Promise<AxiosResponse> => {
  try {
    const response = await api.get('user', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    LocalStorage.remove('token');
    throw new Error('An error occurred.');
  }
};

export { useUser };
