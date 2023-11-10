export const Errors = {
  emptyCredentialError: {
    errorId: 1,
    errorName: "emptyCredentialError",
    errorMessage: "Please provide non-empty credentials",
  },

  duplicativeEmailError: {
    errorId: 2,
    errorName: "duplicativeEmailError",
    errorMessage:
      "The email address has been registered. Please provide a different one.",
  },

  duplicativeUsernameError: {
    errorId: 3,
    errorName: "duplicativeUsernameError",
    errorMessage:
      "The username has been registered. Please provide a different one.",
  },

  loginCredentialError: {
    errorId: 4,
    errorName: "loginCredentialError",
    errorMessage: "Wrong email or password",
  },
};
