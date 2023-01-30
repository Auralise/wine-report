import { Schema, model } from "mongoose";
import * as bcrypt from "bcrypt";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Must match an email address"],
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    role: {
        type: String,
        enum: ["Owner", "Manager", "User", "Guest"],
        required: true,

    }
});


userSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")){
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

const User = model("User", userSchema);

export default User;