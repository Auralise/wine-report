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

        producers: async (parent, { id, name }, context) => {
            if (context.user) {
                return id ? [Producer.findById(id)] : Producer.find({ name });
            }
            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        },


        // Wine search - Type determines any fixed category 
        // Further development required to expand the search to handle multiple specific types
        wine: async (parent, { searchTerm, type }, context) => {
            if (context.user) {
                const query = new RegExp(searchTerm, i)
                switch (type) {
                    case "Region":
                        return Wine.find({
                            region: { $regex: query },
                        })
                    case "Producer":
                        return Wine.find({
                            producer: { $regex: query },
                        })
                    case "Vintage":
                        return Wine.find({
                            vintage: { $regex: query },
                        })
                    case "Category":
                        return Wine.find({
                            category: { $regex: query },
                        })
                    case "Variety":
                        return Wine.find({
                            variety: { $regex: query },
                        })
                    case "Location":
                        return Wine.find({
                            location: { $regex: query },
                        })
                    default:
                        return Wine.find({
                            $or: [
                                { name: { $regex: query } },
                                { vintage: { $regex: query } },
                                { variety: { $regex: query } },
                                { region: { $regex: query } },
                                { producer: { $regex: query } },
                                { location: { $regex: query } },
                                { category: { $regex: query } }
                            ]
                        });
                }
            }

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

        },

        specificWine: async (parent, { id }, context) => {
            if (context.user) {
                return Wine.findById(id);
            }

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        },

        storageFacilities: async (parent, args, context) => {
            if (context.user) {
                return Wine.findById(id);
            }

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        },

        storageRooms: async (parent, { facilityId }, context) => {
            if (context.user) {
                return Wine.findById(id);
            }

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        },

        storageUnits: async (parent, { roomId }, context) => {
            if (context.user) {
                return Wine.findById(id);
            }

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        },

        storageShelf: async (parent, { unitId }, context) => {
            if (context.user) {
                return Wine.findById(id);
            }

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        },

        allWinesInLocation: async (parent, { locationId }, context) => {
            if (context.user) {
                return Wine.findById(id);
            }

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        }


    },

    Mutation: {
        //Non authenticated endpoints
        // Further development decision on allowing administrators to add users 
        addUser: async (parent, { name, email }) => {

        },

        login: async (parent, { email, password }) => {

        },

        // Authenticated mutations
        //Wine 
        addWine: async (parent, { name, vintage, variety, region, category, producer }, context) => {

        },

        updateWine: async (parent, { wineId, name, vintage, variety, region, category, producer }, context) => {

        },

        removeWine: async (parent, { wineId }, context) => {

        },

        changeQuantity: async (parent, { wineId, storageId, quantityChange: Int }, context) => {

        },

        // Producer
        addProducer: async (parent, { name, email, phone }, context) => {

        },

        updateProducer: async (parent, { producerId, name, email, phone }, context) => {

        },

        //Region
        addRegion: async (parent, { name, country }, context) => {

        },

        updateRegion: async (parent, { regionId, name, country }, context) => {

        },

        addVariety: async (parent, { name }, context) => {

        },

        updateVariety: async (parent, { varietyId, name }, context) => {

        },

        //Comments
        addComment: async (parent, { wineId, contents }, context) => {

        },

        editComment: async (parent, { commentId }, context) => {

        },

        removeComment: async (parent, { commentId }, context) => {

        },

        addStorageFacility: async (parent, { name, description }, context) => {

        },
        addStorageRoom: async (parent, { facilityId, name, description }, context) => {

        },
        addStorageUnit: async (parent, { roomId, name, description }, context) => {

        },
        addStorageShelf: async (parent, { unitId, name, description }, context) => {

        },


    }
}


export default resolvers;