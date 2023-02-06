import { gql } from "@apollo/client";

//For user management in further development
export const GET_ALL_USERS = gql`
    query getAllUsers {
      User {
        _id
        name
        email
        role
        approved
      }
    }
`;

export const GET_SPECIFIC_USER = gql`
    query getSpecificUser ($email: String) {
      User {
        _id
        name
        email
        role
        approved
      }
    }
`;

// export const GET_CURRENT_USER = gql`
//     query get
// `;

export const GET_ALL_PRODUCERS = gql`
    query getAllProducers {
      producers {
        _id
        name
        email
        phone
      }
    }
`;

// Pass either parameter to find specific producer
export const GET_SPECIFIC_PRODUCER = gql`
    query getSpecificProducer ($id: ID, $name: String) {
      producers {
        _id
        name
        email
        phone
      }
    }
`;


export const GET_ALL_REGIONS = gql`
    query getAllRegions {
      regions {
        _id
        name
        country
      }
    }
`;

export const GET_SPECIFIC_REGION = gql`
    query getSpecificRegion ($id: ID, $name: String) {
      regions {
        _id
        name
        country
      }
    }
`;

export const GET_ALL_STORAGE_LOCATIONS = gql`
    query getAllStorageLocations {
      storage {
        _id
        locationName
        locationRoom
        description
      }
    }
`;

export const GET_SPECIFIC_STORAGE_LOCATION = gql`
    query getSpecificStorageLocations ($id: ID, $locationName: String) {
      storage {
        _id
        locationName
        locationRoom
        description
      }
    }
`;

export const GET_ALL_VARIETIES = gql`
    query getAllVarieties {
      varieties {
        _id
        name
      }
    }
`;

export const GET_SPECIFIC_VARIETIES = gql`
    query getSpecificVarieties ($id: ID, $name: String) {
      varieties {
        _id
        name
      }
    }
`;

export const GET_ALL_WINE = gql`
    query getAllWine {
      wine {
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
        locationStorage {
          location {
            _id
            locationName
            locationRoom
            description
          }
          quantity
        }
        category
      }
    }
`;

export const SEARCH_WINE = gql`
query Wine($searchTerm: String, $type: String) {
  wine(searchTerm: $searchTerm, type: $type) {
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
        email
        role
        approved
      }
      createdAt
    }
    locationStorage {
      _id
      location {
        _id
        locationName
        locationRoom
        description
      }
      quantity
    }
    category
  }
}
`;
  
  
export const GET_SINGLE_WINE = gql`
    query getSingleWine($id: ID!){
      specificWine(id: $id) {
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
            email
            role
            approved
          }
          createdAt
        }
        locationStorage {
          location {
            _id
            locationName
            locationRoom
            description
          }
          quantity
        }
        category
      }
    }
`;