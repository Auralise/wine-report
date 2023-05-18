import { GraphQLError } from "graphql";
import { User } from "../../models/index.js";

import { signToken } from "../../utils/auth.js";

export const addUser = async (parent, { name, email, password }) => {
    try {
        if (userValidation(name, email, password)) {
            const user = await User.create({ name, email, password });
            if (!user) {
                throw new GraphQLError("Failed to create user", { extensions: { code: "SERVER_ERROR" } });
            }
            const token = signToken({
                name: user.name,
                email: user.email,
                _id: user._id,
            });

            return {
                token,
                user: {
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    role: user.role,
                    approved: user.approved
                }
            }

        }
    } catch (e) {
        throw new GraphQLError(e.message, { extensions: { code: "VALIDATION_ERROR" } });
    }
}


export const login = async (parent, {email, password}) => {
    if (!email || !password) {
        throw new GraphQLError("Please enter both an email and password", { extensions: { code: "BAD_REQUEST" } });
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new GraphQLError("Incorrect Credentials", { extensions: { code: "UNAUTHORISED" } });
    }

    const validPassword = await user.isCorrectPassword(password);

    if (!validPassword) {
        throw new GraphQLError("Incorrect Credentials", { extensions: { code: "UNAUTHORISED" } });
    }

    const token = signToken(user);

    // Return auth object and excluding password field - There is likely a more elegant to do this.
    return {
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            approved: user.approved,
        }
    }
}
