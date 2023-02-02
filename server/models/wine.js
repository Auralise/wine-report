import { Schema, model, } from "mongoose";

const locationQuantitySchema = new Schema({
    location: {
        type: Schema.Types.ObjectId,
        ref: "Storage",
        required: true
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0,
        required: true,
    }

});

const commentSchema = new Schema({
    content: {
        type: String,
        minLength: 1,
        maxLength: 500,
        trim: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => getDateObject(timestamp),
    }
});

const wineSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        trim: true,
    },
    vintage: {
        type: Number,
        min: [1980, "Do you really have a wine from before 1980?"],
        max: [2050, "Can I please have a ride in your time machine?"],
        required: false,

    },
    variety: {
             type: Schema.Types.ObjectId,
             ref: "Variety",
             required: false,
    },
    region: {
        type: Schema.Types.ObjectId,
        ref: "Region",
        required: true,
    },
    producer: {
            type: Schema.Types.ObjectId,
            ref: "Producer",
            required: true
    },
    locationStorage: [locationQuantitySchema],
    category: {
        type: String,
        enum: ["Red", "White", "Fortified", "Sparkling", "Rose", "Dessert"],
        required: true,
    },
    comments: [commentSchema]
    
});

const Wine = model("Wine", wineSchema);

export default Wine;