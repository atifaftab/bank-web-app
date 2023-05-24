export const localStoragePrefix = "bank_web-";
export const getDateFormate = (dob) => {
  return `${new Date(dob).getDate()}-${new Date(dob).getMonth()}-${new Date(
    dob
  ).getFullYear()}`;
};
