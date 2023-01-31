import { Schema, model } from "mongoose";

const shelfSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200,
        
    },
    description: {
        type: String,
        required: false,
    }
});

const storageUnitSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200,
        
    },
    description: {
        type: String,
        required: false,
    },
    shelves: [shelfSchema],
});

const storageRoomSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200,
        
    },
    description: {
        type: String,
        required: false,
    },
    units: [storageUnitSchema],
});

const storageFacilitySchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200,
        
    },
    description: {
        type: String,
        required: false,
    },
    rooms: [storageRoomSchema],
});


const StorageLocation = model("StorageLocation", storageFacilitySchema);

export default StorageLocation;