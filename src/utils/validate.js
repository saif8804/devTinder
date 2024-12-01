const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Plaese enter name ");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
};

const validateEditData = (req) => {
  const allowedEditData = [
    "firstName",
    "lastName",
    "emailId",
    "age",
    "gender",
    "about",
  ];
   
  const isAllowedEdit =  Object.keys(req.body).every((field) => allowedEditData.includes(field));
  return isAllowedEdit;

};



module.exports = {
  validateSignupData,
  validateEditData,
};
