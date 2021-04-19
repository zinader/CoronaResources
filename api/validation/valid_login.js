const Validator = require("validator");
const isEmpty = require ("isempty");

module.exports = function validLoginInput(data){
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email: "";
    data.password = !isEmpty(data.password) ? data.password: "";

    if (Validator.isEmpty(data.email)){
        errors.email = "Email Required";
    } else if (!Validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.password)){
        errors.password = "password Required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};