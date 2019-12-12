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

export const GET_USER_GROUPS = gql`
  {
    user {
      groups(types: ["Small Group"], expired: false, roleTypes: [1]) {
        id
      }
    }
  }
`;

export const GET_RECENTLY_EXPIRED_GROUPS = gql`
  query getRecentlyExpiredGroups($endDate: Int!)
  {
    user {
      groups (types: ["Small Group"], expired: true, roleTypes: [1], endDate: $endDate) {
        id
      }
    }
  }`;
