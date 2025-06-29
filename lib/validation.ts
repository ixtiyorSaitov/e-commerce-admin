export const emailValidation = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
export const passwordValidation = (password: string): boolean => {
  if (password.length < 5) {
    return false;
  }
  return true;
};
export const nameValidation = (name: string): boolean => {
  if (name.length < 4 || name.length > 40) {
    return false;
  }
  return true;
};
export const firstNameValidation = (firstName: string): boolean => {
  if (firstName.length < 4 || firstName.length > 20) {
    return false;
  }
  return true;
};
export const lastNameValidation = (lastName: string): boolean => {
  if (lastName.length < 4 || lastName.length > 20) {
    return false;
  }
  return true;
};
// +998 94 059 43 41
// console.log("+998 94 059 43 41".length); => 17

export const phoneNumberValidation = (number: string | undefined): boolean => {
  if (number && number.length !== 13) {
    return false;
  }
  return true;
};
