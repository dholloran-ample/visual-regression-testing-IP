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
      donations(startDate: $startDate, statuses: [1,2,4], programs: [3, 146], includeCogiver: true) {
        id
        amount
        date
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
