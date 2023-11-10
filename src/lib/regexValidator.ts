export const isEmail = (email: string): boolean => {
  if (email.match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
    return true;
  }
  return false;
};
