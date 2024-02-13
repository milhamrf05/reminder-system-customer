import { Notify } from 'quasar';

/**
 * Creates a notification using the Quasar Notify module.
 *
 * @param {string} message - The message to display in the notification.
 * @param {string} color - The color of the notification.
 * @returns {void}
 */
const useNotify = (message: string, color: string): void => {
  Notify.create({
    message,
    color,
  });
};

export { useNotify };
