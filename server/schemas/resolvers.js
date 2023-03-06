import { GraphQLError } from "graphql";

import { Wine, Producer, Region, Storage, User, Variety } from "../models/index.js";

import { userValidation, wineValidation, isValidEmail } from "../utils/validation.js";

//imports of query methods
import { 
    getAllUsers,
    getSpecificUser,
    getMe,
    getVarieties, 
    getRegions,
    getProducers,
    searchWine,
    getSpecificWine, 
    getStorage,
} from "./queries/index.js";

import { signToken } from "../utils/auth.js";

const resolvers = {
    Query: {
        users: getAllUsers,
        user: getSpecificUser,
        me: getMe,

        varieties: getVarieties,
        regions: getRegions,
        producers: getProducers,

        wine: searchWine,
        specificWine: getSpecificWine,

        storage: getStorage,

        //TODO: Implement logic to find all wines in a storage location and the quantity
        allWinesInLocation: async (parent, { locationId }, context) => {
            if (context.user) {
                throw new GraphQLError("Not yet implemented", { extensions: { code: "NOT_IMPLEMENTED" } });
            }

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        }


    },

    Mutation: {
        //Non authenticated endpoints
        // Further development decision on allowing administrators to add users 
        addUser: async (parent, { name, email, password }) => {
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

        },

        login: async (parent, { email, password }) => {
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

        },

        // Authenticated mutations
        //Wine 

        addWine: async (parent, args, context) => {
            if (context.user) {
                try {
                    if (wineValidation(args)) {
                        const wine = await Wine.create({
                            name: args.name,
                            vintage: args.vintage || null,
                            variety: args.variety || null,
                            region: args.region,
                            producer: args.producer,
                            locationStorage: {
                                location: args.location,
                                quantity: args.quantity,
                            },
                            category: args.category,
                            comments: []
                        });

                        return await wine.populate("variety region producer locationStorage.location comments.author");
                    }

                } catch (e) {
                    throw new GraphQLError(e.message, { extensions: { code: "VALIDATION_ERROR" } })
                }
            }

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

        },

        updateWineDetails: async (parent, { wineId, name, vintage, variety, region, category, producer }, context) => {
            if (context.user) {
                throw new GraphQLError("Not yet implemented", { extensions: { code: "NOT_IMPLEMENTED" } });
            }

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

        },

        removeWine: async (parent, { wineId }, context) => {
            if (context.user) {
                try {
                    const wine = await Wine.findById(wineId);

                    if (!wine) throw new Error("No wine with this ID found");

                    return await wine.remove();


                } catch (e) {
                    throw new GraphQLError(e.message, { extensions: { code: "NO_TARGET" } })
                }

            }
            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

        },

        updateWineStorage: async (parent, { wineId, storageId, quantityChange }, context) => {
            if (context.user) {
                try {
                    //Find the wine
                    const wine = await Wine.findById(wineId).populate("variety region producer locationStorage.location comments.author");

                    if (!wine) {
                        throw new Error("Failed to find wine with that ID");
                    }

                    //find the location that it is stored
                    const locationStorage = wine.locationStorage.filter(location => {
                        return location.location.id === storageId;
                    })[0];

                    if (!locationStorage) {
                        throw new Error("Unable to remove wine from a place where there is none");
                    }

                    if ((locationStorage.quantity + quantityChange) < 0) {
                        throw new Error("You can't remove any more");
                    }

                    locationStorage.quantity += quantityChange;

                    wine.save();

                    return locationStorage;

                } catch (e) {
                    throw new GraphQLError(e.message, { extensions: { code: e.name } });

                }


            }


            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

        },

        // Producer
        addProducer: async (parent, { name, email, phone }, context) => {
            if (context.user) {
                try {
                    if (name.length < 3 || name.length > 50) {
                        throw new Error("Please provide a name for the producer between 3 and 50 characters in length");
                    }

                    if (email && !isValidEmail(email)) {
                        throw new Error("Please provide a valid email");
                    }

                    if (phone && !phone.match(/^\+?[0-9]{6,12}/)) {
                        throw new Error("Please provide a valid phone number");
                    }

                    const producer = await Producer.create({
                        name,
                        email: email || null,
                        phone: phone || null
                    });

                    return producer;

                } catch (e) {
                    throw new GraphQLError(e.message, { extensions: { code: "VALIDATION_ERROR" } });
                }
            }

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        },

        updateProducer: async (parent, { producerId, name, email, phone }, context) => {
            throw new GraphQLError("Not yet implemented", { extensions: { code: "NOT_IMPLEMENTED" } });
        },

        //Region
        addRegion: async (parent, { name, country }, context) => {
            if (context.user) {
                try {
                    if (!name || name.length < 3 || name.length > 50) {
                        throw new Error("Please provide a name for the region between 3 and 50 characters in length");
                    }

                    if (!country || country.length < 3 || country.length > 50) {
                        throw new Error("Please provide a country name or country code between 2 and 50 characters long");
                    }

                    const region = await Region.create({
                        name: name,
                        country: country,
                    });

                    return region;


                } catch (e) {
                    throw new GraphQLError(e.message, { extensions: { code: "VALIDATION_ERROR" } });
                }
            }

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        },

        updateRegion: async (parent, { regionId, name, country }, context) => {
            throw new GraphQLError("Not yet implemented", { extensions: { code: "NOT_IMPLEMENTED" } });
        },

        addVariety: async (parent, { name }, context) => {
            if (context.user) {
                try {
                    if (name.length < 2 || name.length > 50) {
                        throw new Error("Please provide a name for the Variety between 2 and 50 characters in length");
                    }

                    const variety = await Variety.create({
                        name
                    });

                    return variety;

                } catch (e) {
                    throw new GraphQLError(e.message, { extensions: { code: "VALIDATION_ERROR" } });
                }
            }

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        },

        updateVariety: async (parent, { varietyId, name }, context) => {
            throw new GraphQLError("Not yet implemented", { extensions: { code: "NOT_IMPLEMENTED" } });

        },

        //Comments
        addComment: async (parent, { wineId, contents }, context) => {
            if (context.user) {
                const wine = Wine.findById(wineId);
                if (wine) {
                    if (contents.length < 1 || contents.length > 500) {
                        throw new GraphQLError("Please provide a comment between 1 and 500 characters in length");
                    }
                    const comment = {
                        content: contents,
                        author: context.user._id
                    }
                    const newWine = await Wine.findByIdAndUpdate(wineId, { $push: { comments: comment } }, { new: true }).populate("variety region producer locationStorage.location comments.author");

                    return newWine;

                } else {
                    throw new GraphQLError("No Wine by this ID found", { extensions: { code: "" } })
                }
            }

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

        },


        removeComment: async (parent, { wineId, commentId }, context) => {
            if (context.user) {
                const wine = Wine.findById(wineId);
                if (!wine) {
                    throw new GraphQLError("No wine by this ID");
                }

                wine.comment.pull(commentId);
                wine.save();

                return wine;

            }
            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

        },

        addStorage: async (parent, { locationName, locationRoom, description }, context) => {
            if (context.user) {
                if (!locationName || locationName.length < 2 || locationName.length > 50) {
                    throw new GraphQLError("Please provide a location name longer than 2 characters but less than 50", { extensions: { code: "VALIDATION_ERROR" } });
                }

                if (!locationRoom || locationRoom.length < 2 || locationName.length > 50) {
                    throw new GraphQLError("Please provide a room name longer thant 2 charcaters and less than 50", { extensions: { code: "VALIDATION_ERROR" } });
                }

                if (description && description.length > 500) {
                    throw new GraphQLError("Please provide a description shorter than 500 chracters", { extensions: { code: "VALIDATION_ERROR" } });
                }

                const newStorage = await Storage.create({
                    locationName,
                    locationRoom,
                    description
                })

                return newStorage;

            }

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

        }


    }
}


export default resolvers;