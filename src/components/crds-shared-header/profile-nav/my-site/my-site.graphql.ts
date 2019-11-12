import gql from 'graphql-tag';

export const GET_USER = gql`
  {
    user {
      site {
        id
        name
        address
        mapImageUrl
        openHours
        serviceTimes
        mapUrl
        imageUrl
        qualifiedUrl
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
        qualifiedUrl
      }
    }
  }
`;

export const GET_CLOSEST_SITE = gql`
  query closestSite($lat: Float!, $lng: Float!) {
    closestSite(lat: $lat, lng: $lng, maxTravelTime: 1800) {
      id
      name
    }
  }
`;

export const SET_CLOSEST_SITE = gql`
  mutation SET_CLOSEST_SITE($closestSiteID: Int!) {
    setClosestSite(closestSiteID: $closestSiteID) {
      closestSite {
        id
        name
      }
    }
  }
`;

export const SET_SITE = gql`
  mutation setSite($siteId: ID!) {
    setSite(siteId: $siteId) {
      site {
        id
        name
        address
        mapImageUrl
        openHours
        serviceTimes
        mapUrl
        imageUrl
        qualifiedUrl
      }
    }
  }
`;

export const GET_SITES = gql`
  {
    sites(availableOnline: true) {
      name
      id
    }
  }
`;

export const GET_SITE_CONTENT = gql`
  query site($id: Int) {
    site(id: $id) {
      id
      name
      address
      mapImageUrl
      openHours
      serviceTimes
      mapUrl
      imageUrl
      qualifiedUrl
    }
  }
`;





