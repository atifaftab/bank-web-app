export const localStoragePrefix = "bank_web-";
export const getDateFormate = (dob) => {
  return `${new Date(dob).getFullYear()}-${(
    "0" +
    (new Date(dob).getMonth() + 1)
  ).slice(-2)}-${("0" + new Date(dob).getDate()).slice(-2)}`;
};
