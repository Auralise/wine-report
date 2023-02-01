import { GraphQLError } from "graphql";

import { Wine, Comment, Producer, Region, StorageLocation, User, Variety } from "../models/index.js";

import { signToken } from "../utils/auth.js";

const resolvers = {
    Query: {
        users: async (parent, args, context) => {
            //Authorised only
            if (context.user || context.user.role === "Owner" && context.user.role === "Manager") {
                return User.find();
            }
            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        },
        user: async (parent, args, context) => {
            //Authorised only
            if (context.user) {
                return User.findOne({ email });
            }
            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findById(context.user._id)
            }
            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        },

        varieties: async (parent, { id, name }, context) => {
            if (context.user) {
                // if passed an ID, attempt to find by id
                if (id) {
                    return [Variety.findById(id)];
                }

                return Variety.find({ name });
            }
            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

        },
        regions: async (parent, { id, name }, context) => {
            if (context.user) {
                return id ? [Region.findById(id)] : Region.find({ name });
            }
            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        },

        producers: async (parent, {id, name}, context) => {
            if (context.user) {
                return id ? [Producer.findById(id)]: Producer.find({name});
            }
            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        }
    },

    Mutation: {

    }
}


export default resolvers;