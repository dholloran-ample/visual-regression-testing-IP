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
