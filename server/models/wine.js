import { Schema, model } from "mongoose";


const storageQuantity = new Schema({
    location: {
        type: Schema.Types.ObjectId,
        ref: "StorageShelf",
        required: true
    },
    quantity: {
        type: Number,
        min: 0,
    }

});


const wineSchema = new Schema({
    name: {
        type: String,
        required: false,
        minlength: 1,
        maxlength: 200,
        trim: true,
    },
    vintage: {
        type: Number,
        min: [1980, "Do you really have a wine from before 1980?"],
        max: [2050, "Can I please have a ride in your time machine?"],

    },
    variety: [
        {
             type: Schema.Types.ObjectId,
             ref: "Variety",
             required: false,
        }
    ],
    region: {

    },
    producer: {

    },
    storage: {

    }
    


})