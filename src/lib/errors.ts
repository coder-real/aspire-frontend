const ERROR_MESSAGES: Record<string, string> = {
  INVALID_CREDENTIALS: 'Incorrect login details. Please try again.',
  SCHOOL_NOT_FOUND: 'School not found. Please go back and select your school.',
  SCHOOL_INACTIVE: 'This school is currently inactive. Contact your administrator.',
  ACCOUNT_DISABLED: 'Your account has been disabled. Contact your school admin.',
  STUDENT_NOT_FOUND: 'Student profile not found. Contact your school admin.',
  SCHOOL_MISMATCH: 'This account does not belong to the selected school.',
  INTERNAL_ERROR: 'Something went wrong on our end. Please try again.',
};

export function getErrorMessage(code: string): string {
  return ERROR_MESSAGES[code] ?? ERROR_MESSAGES.INTERNAL_ERROR;
}
