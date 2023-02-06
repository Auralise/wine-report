// This is using apollo server v4 and not v3. v3 depends on graphql-tag NPM package
const typeDefs = `#graphql
    #user and auth definitions
    type User {
        _id: ID!
        name: String
        email: String
        role: String
        approved: Boolean
    }

    type Auth {
        token: ID!
        user: User
    }

    #Storage components
    type Storage {
        _id: ID!
        locationName: String!
        locationRoom: String!
        description: String
    }

    #Wine Details
    type Variety {
        _id: ID!
        name: String!
    }

    type Region {
        _id: ID!
        name: String!
        country: String!
    }

    type Producer {
        _id: ID!
        name: String!
        email: String
        phone: String
    }

    type Comment {
        _id: ID!
        content: String!
        author: User!
        createdAt: String!
    }

    # Structure for quantity in storage - If quantity > 0 then location can not be null - To be handled in the resolver
    # Noteably, this may require some re-work to appropriately locate wines in the storage tree
    type StorageQuantity {
        location: Storage!
        quantity: Int!
    }

    type Wine {
        _id: ID!
        name: String!
        vintage: Int
        variety: Variety!
        region: Region! 
        producer: Producer!
        comments: [Comment!]
        locationStorage: [StorageQuantity!]
        category: String!
    }

    #Queries
    type Query {
        users: [User]!
        user(email: String!): User
        me: User
        
        wine(searchTerm: String, type: String): [Wine]!
        specificWine(id: ID!): Wine

        varieties(id: ID, name: String): [Variety]!
        regions(id: ID, name: String): [Region]!
        producers(id: ID, name: String): [Producer]!
        
        storage(id: ID, locationName: String): [Storage!]!
        allWinesInLocation(locationId: ID!): [Wine]
    }

    type Mutation {
        addUser(name: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

        addWine(name: String!, vintage: Int, variety: ID, region: ID!, category: String!, producer: ID!, location: ID!, quantity: Int!): Wine
        updateWineDetails(wineId: ID!, name: String, vintage: Int, variety: ID, region: ID, category: String, producer: ID): Wine
        
        removeWine(wineId: ID!): Wine
        updateWineStorage(wineId: ID!, storageId: ID!, quantityChange: Int!): Wine

        addProducer(name: String!, email: String, phone: String): Producer
        updateProducer(producerId: ID!, name: String, email: String, phone: String): Producer
        
        addRegion(name: String!, country: String!): Region
        updateRegion(regionId: ID!, name: String, country: String): Region

        addVariety(name: String!): Variety
        updateVariety(varietyId: ID, name: String): Variety
        
        addComment(wineId: ID!, contents: String!): Wine
        removeComment(wineId: ID!, commentId: ID!): Wine

        addStorage(locationName: String!, locationRoom: String!, description: String): Storage

    }

`;

export default typeDefs;