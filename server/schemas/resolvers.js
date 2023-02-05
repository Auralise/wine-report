import { GraphQLError } from "graphql";

import { Wine, Producer, Region, Storage, User, Variety } from "../models/index.js";

import { userValidation, wineValidation, isValidEmail } from "../utils/validation.js";

import { signToken } from "../utils/auth.js";

import { getIds } from "../utils/searchHelpers.js";

const resolvers = {
    Query: {
        users: async (parent, args, context) => {
            //Authorised only
            if (context.user || context.user.role === "Owner" && context.user.role === "Manager") {
                return User.find();
            }
            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        },
        user: async (parent, { email }, context) => {
            //Authorised only
            if (context.user) {
                return User.findOne({ email });
            }
            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findById(context.user._id)
            }
            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        },

        varieties: async (parent, { id, name }, context) => {
            if (context.user) {
                // if passed an ID, attempt to find by id
                let varieties = [];
                if (id && name) {
                    throw new GraphQLError("Please provide either an ID or a Name when searching varieties", { extensions: { code: "BAD_REQUEST" } });
                } else if (id) {
                    varieties.push(await Variety.findById(id));
                } else if (name) {
                    varieties.push(await Variety.find({ name }));
                } else {
                    varieties = await Variety.find({});
                }

                return varieties;
            }
            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

        },
        regions: async (parent, { id, name }, context) => {
            if (context.user) {
                let regions = [];
                if (id && name) {
                    throw new GraphQLError("Please provide either an ID or a Name when searching regions", { extensions: { code: "BAD_REQUEST" } });
                } else if (id) {
                    regions.push(await Region.findById(id));
                } else if (name) {
                    regions.push(await Region.find({ name }));
                } else {
                    regions = Region.find({});
                }

                return regions;
            }
            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        },

        producers: async (parent, { id, name }, context) => {
            if (context.user) {
                let producers = [];
                if (id && name) {
                    throw new GraphQLError("Please provide either an ID or a Name when searching producers", { extensions: { code: "BAD_REQUEST" } });
                } else if (id) {
                    producers.push(await Producer.findById(id));
                } else if (name) {
                    producers.push(await Producer.find({ name }));
                } else {
                    producers = Producer.find({});
                }

                return producers;
            }
            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        },


        // Wine search - Type determines any fixed category 
        // Further development required to expand the search to handle multiple specific types
        wine: async (parent, { searchTerm, type }, context) => {
            if (context.user) {
                let results;
                let query;

                if(searchTerm && !type || !searchTerm && type){
                    throw new GraphQLError("Please provide a search term and a type or neither to get all wines", {extensions: {code: "BAD_REQUEST"}});
                }

                if (searchTerm) {
                    query = new RegExp(searchTerm, "i");
                } 

                if(type){
                    if(
                        !type === "Region" &&
                        !type === "Producer" &&
                        !type === "Vintage" &&
                        !type === "Category" &&
                        !type === "Variety" &&
                        !type === "Location" 
                    ) {
                        throw new GraphQLError("Invalid search type", {extensions: {code: "BAD_REQUEST"}});
                    }
                }
                
                switch (type) {
                    case "Region":
                        const regionIds = getIds(await Region.find({name: query}));

                        results = await Wine.find({
                            region: { $in: regionIds },
                        }).populate("variety region producer locationStorage.location comments.author");
                        break;

                    case "Producer":
                        const producerIds = getIds(await Region.find({name: query}));

                        results = await Wine.find({
                            producer: { $in: producerIds },
                        }).populate("variety region producer locationStorage.location comments.author");
                        break;

                    case "Vintage":
                        results = await Wine.find({
                            vintage: { $regex: query },
                        }).populate("variety region producer locationStorage.location comments.author");
                        break;

                    case "Category":
                        results = Wine.find({
                            category: { $regex: query },
                        }).populate("variety region producer locationStorage.location comments.author");
                        break;

                    case "Variety":
                        const varietyIds = getIds(await Variety.find({name: {$regex: query}}));
                        results = Wine.find({
                            variety: { $in: varietyIds },
                        }).populate("variety region producer locationStorage.location comments.author");
                        break;

                    case "Location":
                        const location = await Location.find({locationName: {$regex: query}});

                        results = Wine.find({
                            locationStorage: {location: location._id},
                        }).populate("variety region producer locationStorage.location comments.author");
                        break;

                    default:
                        //Find all wine
                        results = Wine.find({}).populate("variety region producer locationStorage.location comments.author");
                }

                return results;
            }

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

        },

        specificWine: async (parent, { id }, context) => {
            if (context.user) {
                const wine = Wine.findById(id);
                console.log(context.user);
                if (!wine) {
                    throw new GraphQLError("No wine found by this ID", { extensions: { code: "NOT_FOUND" } });
                }

                return await wine.populate("variety region producer locationStorage.location comments.author");
            }

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        },

        storage: async (parent, { id, locationName }, context) => {
            if (context.user) {
                let storage;
                if (id) {
                    storage = [Storage.findById(id)];
                } else if (locationName) {
                    storage = [Storage.findOne({
                        locationName
                    })]
                } else {
                    storage = Storage.find({});
                }

                if (!storage) {
                    throw new GraphQLError("No Storage found.", { extensions: { code: "NOT_FOUND" } });
                }

                return storage;
            }

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

        },

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
            if(!email || !password){
                throw new GraphQLError("Please enter both an email and password", {extensions: {code: "BAD_REQUEST"}});
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

        updateWineStorage: async (parent, { wineId, storageId, quantityChange: Int }, context) => {
            throw new GraphQLError("Not yet implemented", { extensions: { code: "NOT_IMPLEMENTED" } });
        },

        // Producer
        addProducer: async (parent, { name, email, phone }, context) => {
            if (context.user) {
                try {
                    if (name.length < 3 || name.length > 50) {
                        throw new Error("Please provide a name for the producer between 3 and 50 characters in length");
                    }

                    if (!isValidEmail(email)) {
                        throw new Error("Please provide a valid email");
                    }

                    if (!phone.match(/^\+?[0-9]{6,12}/)) {
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
                    const newWine = await Wine.findByIdAndUpdate(wineId, { $push: {comments: comment}}, {new: true}).populate("variety region producer locationStorage.location comments.author");
                    
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