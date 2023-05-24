export function UserBuilder(
  userId,
  emailId,
  mobile,
  username,
  firstName,
  middleName,
  lastName,
  dob,
  gender
) {
  this.id = userId;
  this.email = emailId;
  this.mobile = mobile;
  this.username = username;
  this.first = firstName;
  this.middle = middleName;
  this.last = lastName;
  this.dob = dob;
  this.gender = gender;
}
