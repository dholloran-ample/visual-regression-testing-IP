import gql from 'graphql-tag';

export const SET_GROUP_END_DATE = gql`
  mutation setGroupsEndDate($ids: [ID!], $endDate: Int!) {
    setGroupsEndDate(ids: $ids, endDate: $endDate) {
      id
      endDate
      name
    }
  }
`;

export const GET_USER_GROUPS = gql `
  {
    user {
      groups (types: ["Small Group"], expired: false, roleTypes: [1]) {
        id
      }
    }
  }`
