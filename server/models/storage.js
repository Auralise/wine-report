import { Schema, model } from "mongoose";

const storageSchema = new Schema({
    locationName: {
        type: String,
        unique: true,
        required: true,
        minlength: 2,
        maxlength: 200,
        
    },
    locationRoom: {
        type:String,
        required: true,
        minlength: 2,
        maxlength: 200,
    },
    description: {
        type: String,
        required: false,
    }
});

// A proper tiered storage solution is part of future development

const Storage = model("Storage", storageSchema);

export default Storage;