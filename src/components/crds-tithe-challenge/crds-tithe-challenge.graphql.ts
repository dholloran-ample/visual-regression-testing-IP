import gql from 'graphql-tag';

export const GET_USER_GROUPS = gql`
  {
    user {
      nickName
      groups(id: 198153) {
        endDate
        id
        name
        userStartDate
        userEndDate
      }
    }
  }
`;

export const GET_DONATIONS = gql`
  query donations($startDate: Int!) {
    user {
      donations(startDate: $startDate) {
        id
        amount
        date
      }
    }
  }
`;
