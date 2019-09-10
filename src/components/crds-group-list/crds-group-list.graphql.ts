import gql from "graphql-tag";

export const GET_GROUPS = gql`
  {
    user {
      contact {
        firstName
        nickName
      }
      groups {
        id
        name
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
