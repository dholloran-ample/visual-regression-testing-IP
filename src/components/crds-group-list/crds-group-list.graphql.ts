import gql from "graphql-tag";

export const GET_GROUPS = gql`
  {
    user {
      firstName
      nickName
      groups {
        id
        name
        image
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
