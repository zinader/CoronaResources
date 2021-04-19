const Validator = require("validator");
const isEmpty = require ("isempty");

module.exports = function validRegisterInput(data){
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name: "";
    data.email = !isEmpty(data.email) ? data.email: "";
    data.password = !isEmpty(data.password) ? data.password: "";
    data.conpass = !isEmpty(data.conpass) ? data.conpass: "";

    if (Validator.isEmpty(data.name)){
        errors.name = "Name Required";
    }

    if (Validator.isEmpty(data.email)){
        errors.email = "Email Required";
    } else if (!Validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.password)){
        errors.password = "password Required";
    }

    if (Validator.isEmpty(data.conpass)){
        errors.conpass = "confirm password Required";
    }

    if (!Validator.isLength(data.password, { min : 6, max: 30 })){
        errors.name = "Password must be atleast 6 characters";
    }

    if (!Validator.equals(data.password, data.conpass)) {
        errors.name = "Password does not match";
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };
};