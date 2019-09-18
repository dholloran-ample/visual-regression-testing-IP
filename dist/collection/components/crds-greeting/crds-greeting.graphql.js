import gql from "graphql-tag";
export const GET_NAMES = gql `
  {
    user {
      contact {
        firstName
        nickName
      }
    }
  }
`;
