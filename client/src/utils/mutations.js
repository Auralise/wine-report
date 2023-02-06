import { gql } from "@apollo/client";


export const ADD_USER = gql`
    mutation AddUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
        email
        role
        approved
      }
    }
  }
`;

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            _id
            name
            email
            role
            approved
            }
        }
    }
`;

export const ADD_STORAGE = gql`
    mutation AddStorage($locationName: String!, $locationRoom: String!, $description: String) {
        addStorage(locationName: $locationName, locationRoom: $locationRoom, description: $description) {
            _id
            locationName
            locationRoom
            description
        }
    }
`;
  
  
  
export const ADD_REGION = gql`
    mutation AddRegion($name: String!, $country: String!) {
        addRegion(name: $name, country: $country) {
            _id
            name
            country
        }
    }
`;  
  
export const ADD_VARIETY = gql`
    mutation AddVariety($name: String!) {
        addVariety(name: $name) {
            _id
            name
        }
    }
`;
  
export const ADD_PRODUCER = gql`
    mutation AddProducer($name: String!, $email: String, $phone: String) {
        addProducer(name: $name, email: $email, phone: $phone) {
            _id
            name
            email
            phone
        }
    }
`;  
  
  
export const ADD_WINE= gql`
    mutation AddWine($name: String!, $region: ID!, $category: String!, $producer: ID!, $location: ID!, $quantity: Int!, $vintage: Int, $variety: ID) {
        addWine(name: $name, region: $region, category: $category, producer: $producer, location: $location, quantity: $quantity, vintage: $vintage, variety: $variety) {
            _id
            name
            vintage
        variety {
                _id
                name
            }
        region {
                _id
                name
                country
            }
        producer {
                _id
                name
                email
                phone
            }
        comments {
                _id
                content
            author {
                    _id
                    name
                }
                createdAt
            }
            category
        locationStorage {
            location {
                    _id
                    locationName
                    locationRoom
                    description
                }
                quantity
            }
        }
    }
`;

export const REMOVE_WINE = gql`
    mutation RemoveWine($id: ID) {
        removeWine(wineId: $id) {
            _id
            name
            vintage
        variety {
                _id
                name
            }
        region {
                _id
                name
                country
            }
        producer {
                _id
                name
                email
                phone
            }
        comments {
                _id
                content
            author {
                    _id
                    name
                }
                createdAt
            }
            category
        locationStorage {
            location {
                    _id
                    locationName
                    locationRoom
                    description
                }
                quantity
            }
        }
    }
`;

export const UPDATE_STORAGE_QUANTITY = gql`
    mutation UpdateStorageQuantity ($wineId: ID!, $storageId: ID!, $quantityChange: Int!){
        updateWineStorage(wineId: $wineId, storageId: $storageId, quantityChange: $quantityChange){
        _id
        quantity
        location {
            _id
            locationName
            locationRoom
            description
        }
    }
}
`;

export const ADD_COMMENT = gql`
    mutation AddComment ($wineId: ID!, $contents: String!) {
        addComment(wineId: $wineId, contents: $contents) {
            _id
            name
            vintage
        variety {
                _id
                name
            }
        region {
                _id
                name
                country
            }
        producer {
                _id
                name
                email
                phone
            }
        comments {
                _id
                content
            author {
                    _id
                    name
                }
                createdAt
            }
            category
        locationStorage {
            location {
                    _id
                    locationName
                    locationRoom
                    description
                }
                quantity
            }
        }
    }
`;

export const DELETE_COMMENT = gql`
    mutation DeleteComment ($wineId: ID, $contents: String) {
        removeComment(wineId: $wineId, contents: $contents) {
            _id
            name
            vintage
        variety {
                _id
                name
            }
        region {
                _id
                name
                country
            }
        producer {
                _id
                name
                email
                phone
            }
        comments {
                _id
                content
            author {
                    _id
                    name
                }
                createdAt
            }
            category
        locationStorage {
            location {
                    _id
                    locationName
                    locationRoom
                    description
                }
                quantity
            }
        }
    }
`;

// not exported as this is not yet implemented on the server side.
// eslint-disable-next-line no-unused-vars
const UPDATE_WINE = gql`
    mutation UpdateWine ($wineId: ID!, $name: String, $vintage: Int, $variety: ID, $region: ID, $category: String, $producer: ID){
        updateWineDetails (wineId: $wineId, name: $name, vintage: $vintage, variety: $variety, region: $region, category: $category, producer: $producer) {
            _id
            name
            vintage
        variety {
                _id
                name
            }
        region {
                _id
                name
                country
            }
        producer {
                _id
                name
                email
                phone
            }
        comments {
                _id
                content
            author {
                    _id
                    name
                }
                createdAt
            }
            category
        locationStorage {
            location {
                    _id
                    locationName
                    locationRoom
                    description
                }
                quantity
            }
        }
    }
`;

