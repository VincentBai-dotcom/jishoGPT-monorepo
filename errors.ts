export interface IErrorBody {
  errorId: number;
  errorName: string;
  errorMessage: string;
}

export const Errors: Record<string, IErrorBody> = {
  // Auth error
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

  // Dict error
  wordEntryDoesNotExistError: {
    errorId: 10,
    errorName: "wordDoesNotExistError",
    errorMessage: "The word entry does not exist in the database",
  },
};
