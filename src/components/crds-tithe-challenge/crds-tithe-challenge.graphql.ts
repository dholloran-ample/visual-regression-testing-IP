import gql from 'graphql-tag';

export const GET_USER_GROUPS = gql`
  {
    user {
      nickName
      imageUrl
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
      donations(
        filters: {
          startDate: $startDate
          statuses: [1, 2, 4]
          programs: [3, 146]
          includeCogiver: true
          includeSoftDonations: true
        }
      ) {
        id
        amount
        date
      }
      recurringGifts(programs: [3, 146], active: true, includeCogiver: true) {
        id
        amount
        active
      }
    }
  }
`;

export const GET_FEELING_RESPONSES = gql`
  {
    feelingResponses {
      id
      value
    }
  }
`;

export const LOG_USER_RESPONSE = gql`
  mutation logUserResponse($response: FeelingResponseInput) {
    logFeelingResponse(response: $response)
  }
`;
