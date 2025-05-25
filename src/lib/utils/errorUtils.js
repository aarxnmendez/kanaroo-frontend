import { API_MESSAGES } from "@/lib/constants/apiMessages";

/**
 * @param {object} errorData
 * @param {string[]} fieldPriority
 * @returns {string}
 */
export function extractLaravelErrorMessages(errorData, fieldPriority = []) {
  if (!errorData) {
    return API_MESSAGES.GENERIC_ERROR;
  }

  if (errorData.errors) {
    for (const field of fieldPriority) {
      if (errorData.errors[field] && errorData.errors[field][0]) {
        return errorData.errors[field][0];
      }
    }
    for (const field in errorData.errors) {
      if (errorData.errors[field] && errorData.errors[field][0]) {
        return errorData.errors[field][0];
      }
    }
  }

  return errorData.message || API_MESSAGES.SERVER_VALIDATION_ERROR;
}
