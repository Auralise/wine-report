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
    type StorageFacility {
        _id: ID!
        name: String!
        description: String
        rooms: [StorageRoom!]
    }

    type StorageRoom {
        _id: ID!
        name: String!
        description: String
        units: [StorageUnit!]
    }

    type StorageUnit {
        _id: ID!
        name: String!
        description: String
        shelves: [StorageShelf!]
    }

    type StorageShelf {
        _id: ID!
        name: String!
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
        location: StorageShelf
        quantity: Int!
    }

    type Wine {
        _id: ID!
        name: String!
        vintage: Int
        variety: [Variety!]
        region: Region! 
        winery: Producer!
        comments: [Comment!]
        location: [StorageQuantity!]
        category: String!
    }

    #Queries
    type Query {
        users: [User]
        user(email: String!): User
        me: User
        
        wine(variety: [String], region: String, winery: String, vintage: Int, category: String, producer: String): [Wine]!
        specificWine(id: ID!): Wine

        varieties(id: ID, name: String): [Variety]!
        regions(id: ID, name: String): [Region]!
        producers(id: ID, name: String): [Producer]!
        
        storageFacilities: [StorageFacility]
        storageRooms(facilityId: String!): [StorageRoom]
        storageUnits(roomId: String!): [StorageUnit]
        storageShelf(unitId: String!): [StorageShelf]
        allWinesInLocation(locationId: String!): [Wine]
    }

    type Mutation {
        addUser(name: String!, email: String!): Auth
        login(email: String!, password: String!): Auth

        addWine(name: String!, vintage: Int, variety: [ID], region: ID!, category: String!, producer: ID!): Wine
        editWine(wineId: ID!, name: String, vintage: Int, variety: [ID], region: ID, category: String, producer: ID): Wine
        removeWine(wineId: ID!): Wine
        changeQuantity(wineId: ID!, storageId: ID!, quantityChange: Int): Wine

        addProducer(name: String!, email: String, phone: String): Producer
        editProducer(producerId: ID!, name: String, email: String, phone: String): Producer
        
        addRegion(name: String!, country: String!): Region
        editRegion(regionId: ID!, name: String, country: String): Region

        addVariety(name: String!): Variety
        editVariety(varietyId: ID, name: String): Variety
        
        addComment(contents: String!): Wine
        editComment(commentId: ID!): Wine
        removeComment(commentId: ID!): Wine

        addStorageFacility(name: String!, description: String): StorageFacility
        addStorageRoom(facilityId: ID, name: String!, description: String): StorageRoom
        addStorageUnit(roomId: ID, name: String!, description: String): StorageUnit
        addStorageShelf(unitId: ID, name: String!, description: String): StorageShelf

    }

`;

export default typeDefs;