import gql from 'graphql-tag';

export const SET_SITE = gql`
  mutation setSite($siteId: ID!) {
    setSite(siteId: $siteId) {
      site {
        id
        name
      }
    }
  }
`;

export const GET_USER = gql`
  {
    user {
      site {
        id
        name
      }
      closestSite {
        id
        name
        address
        mapImageUrl
        openHours
        serviceTimes
        mapUrl
        imageUrl
      }
    }
  }
`;
