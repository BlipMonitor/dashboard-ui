import axiosInstance from '@/lib/utils/api';
import { UserProfile } from '@/lib/types';

/**
 * Service for managing user profiles.
 */
export const userProfileAPI = {
  /**
   * Get the current user's profile.
   * @returns {Promise<UserProfile>} - The current user's profile.
   * @throws {Error} - Throws an error if the request fails.
   */
  getMe: async (): Promise<UserProfile> => {
    try {
      const response = await axiosInstance.get<UserProfile>('/users/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new Error('Failed to fetch user profile');
    }
  },

  /**
   * Update the current user's profile.
   * @param {Object} data - The data to update the user profile.
   * @param {string} data.firstName - The new first name for the user.
   * @param {string} data.lastName - The new last name for the user.
   * @param {string} data.username - The new username for the user.
   * @param {string} data.email - The new email for the user.
   * @returns {Promise<UserProfile>} - The updated user profile.
   * @throws {Error} - Throws an error if the request fails.
   */
  updateMe: async (data: { firstName: string; lastName: string; username: string; email: string }): Promise<UserProfile> => {
    try {
      const response = await axiosInstance.patch<UserProfile>('/users/me', data);
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw new Error('Failed to update user profile');
    }
  }
};