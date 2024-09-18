import { PaginatedResponse } from "./types";

/**
 * Represents a user profile in the system.
 */
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  email: string;
  profileImageUrl: string;
}

/**
 * Represents the response from the userProfileAPI.getMe() function.
 */
export interface UserProfileResponse extends PaginatedResponse {
  data: UserProfile;
}