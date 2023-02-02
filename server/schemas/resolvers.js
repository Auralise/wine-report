import { GraphQLError } from "graphql";

import { Wine, Producer, Region, Storage, User, Variety } from "../models/index.js";

import { userValidation } from "../utils/validation.js";

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
        addUser: async (parent, { fullName, email, password }) => {
            try {
                if (userValidation(fullName, email, password)){
                    const user = User.create({name: fullName, email, password});


                }
            } catch (e) {
                throw new GraphQLError(e.message, { extensions: { code: "VALIDATION_ERROR" } });
            }

        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({email});
            if(!user){
                throw new GraphQLError("Incorrect Credentials", {extensions: {code: "UNAUTHORISED"}});
            }

            const validPassword = await user.isCorrectPassword(password);

            if (!validPassword){
                throw new GraphQLError("Incorrect Credentials", {extensions: {code: "UNAUTHORISED"}});
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

        },

        // Authenticated mutations
        //Wine 
        // { name, vintage, variety, region, category, producer }
        addWine: async (parent, args, context) => {
            // if(context.user) {
            //     try {

            //     } catch (e) {
            //         throw new GraphQLError(e.message, {extensions: {code: "VALIDATION_ERROR"}})
            //     }
            // }

            //  throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

        },

        updateWine: async (parent, { wineId, name, vintage, variety, region, category, producer }, context) => {

        },

        removeWine: async (parent, { wineId }, context) => {
            if (context.user){
                try {
                    const wine = await Wine.findById(wineId);

                    if (!wine) throw new Error("No wine with this ID found");

                    return await wine.remove();


                } catch (e) {
                    throw new GraphQLError(e.message, {extensions: {code: "NO_TARGET"}})
                }
                
            }
            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

        },

        changeQuantity: async (parent, { wineId, storageId, quantityChange: Int }, context) => {

        },

        // Producer
        addProducer: async (parent, { name, email, phone }, context) => {
            if(context.user){
                try {


                } catch (e) {

                }
            } 

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
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

        addStorage: async (parent, { locationName, locationRoom, description}, context) => {
            
        }


    }
}


export default resolvers;