import gql from 'graphql-tag';

export const SET_GROUP_END_DATE = gql`
  mutation setGroupEndDate($id: ID!, $endDate: Int!) {
    setGroupEndDate(id: $id, endDate: $endDate) {
      id
      endDate
      name
    }
  }
`;
