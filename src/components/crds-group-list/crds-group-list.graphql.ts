import gql from "graphql-tag";

export const GET_GROUPS = gql`
  {
    user {
      firstName
      nickName
      groups (types: ["Small Group"], expired: false) {
        id
        name
        image
        url
        endDate
        meeting {
          day
          time
          frequency
        }
        role {
          name
          id
        }
        type {
          name
          id
        }
      }
    }
  }
`;
