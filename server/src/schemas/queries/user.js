import { GraphQLError } from "graphql";
import { User } from "../../models/index.js";

export const getAllUsers = async (parent, args, context) => {
    //Authorised only
    if (context.user || context.user.role === "Owner" && context.user.role === "Manager") {
        return User.find();
    }
    throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
}

export const getSpecificUser = async (parent, { email }, context) => {
    //Authorised only
    if (context.user) {
        return User.findOne({ email });
    }
    throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
}

export const getMe = async (parent, args, context) => {
    if (context.user) {
        return await User.findById(context.user._id);
    }
    throw new GraphQLError("Please login", {extensions: {code: "UNAUTHORISED"}});
}