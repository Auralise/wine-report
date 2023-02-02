import { Producer, Region, Variety } from "../models/index.js";


const isPasswordComplex = (password) => {
    if (password.length < 8) return false;
    //additional complexity validation goes here
    // This needs to match the complexity requirements of the front end as the validation will 
    //This is flagged for future development

    return true;


}
// Email validation regex from w3Schools: https://www.w3resource.com/javascript/form/email-validation.php
// IETF compliant characters: https://www.rfc-editor.org/rfc/rfc3696#page-5
export const isValidEmail = (email) =>  email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ? true : false;



export const userValidation = (name, email, password) => {
    if (name.length < 3) {
        throw new Error("Names should be longer than 3 characters");
    } else if (name.length > 50) {
        throw new Error("Names should be shorter than 50 characters");
    } else if (!isValidEmail(email)){
        throw new Error("Invalid email");
    } else if (!isPasswordComplex(password)){
        throw new Error("Invalid password");
    } else {
        return true;
    }

}


export const wineValidation = (wineDetails) => {
    //Mandatory field validation

    if(wineDetails.name.length < 2 || wineDetails.name.length > 100){
        throw new Error("Wine names need to be between 2 and 100 characters in length");
    }

    const producer = Producer.find({_id: wineDetails.producer});
    if(!producer) {
        throw new Error("No producer with this ID");
    }

    const region = Region.find({_id: wineDetails.region});
    if (!region) {
        throw new Error("No region with this ID");
    }
    
    const categories = ["Red", "White", "Fortified", "Sparkling", "Rose", "Dessert"];

    if (!categories.includes(wineDetails.category)) {
        throw new Error("Invalid category type");
    }

    // non-mandatory field validation
    const variety = Variety.find({_id: wineDetails.variety});
    if (!variety) {
        throw new Error("No variety with this ID");
    }

    const currentDate = new Date()
    if(vintage < 1980 || vintage > currentDate.getFullYear()){
        throw new Error("Invalid vintage, needs to be between 1980 and the current date");
    }

    return true;
}