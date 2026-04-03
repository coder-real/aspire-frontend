const ERROR_MESSAGES: Record<string, string> = {
  INVALID_CREDENTIALS: 'Incorrect details. Please try again.',
  SCHOOL_NOT_FOUND: 'School not found. Please check the school code.',
  ACCOUNT_DISABLED: 'Your account has been disabled. Contact your school admin.',
  STUDENT_NOT_FOUND: 'Student profile not found. Contact your school admin.',
  MISSING_TOKEN: 'Session expired. Please log in again.',
  INVALID_TOKEN: 'Session expired. Please log in again.',
  INTERNAL_ERROR: 'Something went wrong. Please try again.',
};

export function getErrorMessage(code: string): string {
  return ERROR_MESSAGES[code] ?? ERROR_MESSAGES.INTERNAL_ERROR;
}
