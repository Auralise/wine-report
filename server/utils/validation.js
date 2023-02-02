
const isPasswordComplex = (password) => {
    if (password.length < 8) return false;
    //additional complexity validation goes here
    // This needs to match the complexity requirements of the front end as the validation will 
    //This is flagged for future development

    return true;


}
// Email validation regex from w3Schools: https://www.w3resource.com/javascript/form/email-validation.php
// IETF compliant characters: https://www.rfc-editor.org/rfc/rfc3696#page-5
const isValidEmail = (email) =>  email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ? true : false;



export const userValidation = (name, email, password) => {
    if (name.length < 3) {
        throw new Error("Names should be longer than 3 characters");
    } else if (name.length > 50) {
        throw new Error("Names should be shorter than 50 characters");
    } else if (!isPasswordComplex(password)){
        throw new Error("Invalid password");
    } else if (!isValidEmail(email)){
        throw new Error("Invalid email");
    } else {
        return true;
    }

}