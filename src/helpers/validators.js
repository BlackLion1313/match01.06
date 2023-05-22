export const validateLogin = (login) => {
  if(!login) {
    return false;
  }
  return true;
}

export const validatePassword = (password) => {
  if(!password) {
    return false;
  }
  return true;
}
