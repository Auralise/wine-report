import { graphql, GraphQLError } from "graphql";

import { Wine, Producer, Region, Storage, User, Variety } from "../models/index.js";

import { userValidation, wineValidation, isValidEmail } from "../utils/validation.js";

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
                const wine = Wine.findById(id);
                
                if(!wine){
                    throw new GraphQLError("No wine found by this ID", {extensions: {code: "NOT_FOUND"}});
                }
                
                return wine;
            }

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        },

        storage: async (parent, {id, locationName}, context) => {
            if (context.user) {
                let storage;
                if(id){
                    storage = Storage.findById(id);
                } else if (locationName){
                    storage = Storage.findOne({
                        locationName
                    })
                } else {
                    throw new GraphQLError("Please provide either an ID or a locationName");
                }

                if (!storage){
                    throw new GraphQLError("No Storage found.", { extensions: {code: "NOT_FOUND"}});
                } 
                
                return storage;
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
        
        addWine: async (parent, args, context) => {
            if(context.user) {
                try {
                    if(wineValidation(args)){
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
                            category: args.quantity,
                            comments: []
                        });

                        return wine;
                    }

                } catch (e) {
                    throw new GraphQLError(e.message, {extensions: {code: "VALIDATION_ERROR"}})
                }
            }

             throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

        },

        updateWineDetails: async (parent, { wineId, name, vintage, variety, region, category, producer }, context) => {
            if (context.user) {

            }

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

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

        updateWineStorage: async (parent, { wineId, storageId, quantityChange: Int }, context) => {

        },

        // Producer
        addProducer: async (parent, { name, email, phone }, context) => {
            if(context.user){
                try {
                    if (name.length < 3 || name.length > 50){
                        throw new Error("Please provide a name for the producer between 3 and 50 characters in length");
                    }

                    if (!isValidEmail(email)){
                        throw new Error("Please provide a valid email");
                    }

                    if (!phone.test(/^\+?[0-9]{6,12}]/)){
                        throw new Error("Please provide a valid phone number");
                    }

                    await Producer.create({
                        name,
                        email: email || null,
                        phone: phone || null
                    })

                } catch (e) {
                    throw new GraphQLError(e.message, {extensions: {code: "VALIDATION_ERROR"}});
                }
            } 

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        },

        updateProducer: async (parent, { producerId, name, email, phone }, context) => {

        },

        //Region
        addRegion: async (parent, { name, country }, context) => {
            if(context.user){
                try {
                    if (!name || name.length < 3 || name.length > 50){
                        throw new Error("Please provide a name for the region between 3 and 50 characters in length");
                    }

                    if (!country || country.length < 3 || country.length > 50){
                        throw new Error("Please provide a country name or country code between 2 and 50 characters long");
                    }

                    await Region.create({
                        name,
                        countryName: country,
                    })

                } catch (e) {
                    throw new GraphQLError(e.message, {extensions: {code: "VALIDATION_ERROR"}});
                }
            } 

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        },

        updateRegion: async (parent, { regionId, name, country }, context) => {

        },

        addVariety: async (parent, { name }, context) => {
            if(context.user){
                try {
                    if (name.length < 2 || name.length > 50){
                        throw new Error("Please provide a name for the Variety between 2 and 50 characters in length");
                    }

                    await Variety.create({
                        name
                    })

                } catch (e) {
                    throw new GraphQLError(e.message, {extensions: {code: "VALIDATION_ERROR"}});
                }
            } 

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        },

        updateVariety: async (parent, { varietyId, name }, context) => {

        },

        //Comments
        addComment: async (parent, { wineId, contents }, context) => {
            if (context.user){
                const wine = Wine.findById(wineId);
                if(wine){
                    if(contents.length < 1 || contents.length > 500){
                        throw new GraphQLError("Please provide a comment between 1 and 500 characters in length");
                    }
                    const comment = { 
                        content: contents,
                        author: context.user.name
                    }
                    wine.comment.push(comment);
                    await wine.save();
                    return wine;

                } else {
                    throw new GraphQLError("No Wine by this ID found", {extensions: {code: ""}})
                }
            }

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

        },


        removeComment: async (parent, { wineId, commentId }, context) => {
            if (!context.user){
                const wine = Wine.findById(wineId);
                if(!wine){
                    throw new GraphQLError("No wine by this ID");
                }

                wine.comment.pull(commentId).
                wine.save();

                return wine;

            }
            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

        },

        addStorage: async (parent, { locationName, locationRoom, description}, context) => {
            if(!context.user) {
                if(!locationName || locationName.length < 2 || locationName.length > 50 ){
                    throw new GraphQLError("Please provide a location name longer than 2 characters but less than 50", {extensions: {code: "VALIDATION_ERROR"}});
                }

                if(!locationRoom || locationRoom.length < 2 || locationName.length > 50) {
                    throw new GraphQLError("Please provide a room name longer thant 2 charcaters and less than 50", {extensions: {code: "VALIDATION_ERROR"}});
                }

                if(description.length > 500){
                    throw new GraphQLError("Please provide a description shorter than 500 chracters", {extensions: {code: "VALIDATION_ERROR"}});
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