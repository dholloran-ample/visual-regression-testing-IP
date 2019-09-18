import gql from 'graphql-tag';
export const GET_SITES = gql `
  {
    sites(filter: "Available_Online = 1") {
      name
      id
    }
  }
`;
export const GET_USER = gql `
  {
    user {
      site {
        id
        name
      }
    }
  }
`;
export const GET_PROMOS = gql `
  {
    promos {
      targetAudience
      title
      description
      qualifiedUrl
      imageUrl
    }
  }
`;
export const SET_SITE = gql `
  mutation setSite($siteId: ID!) {
    setSite(siteId: $siteId) {
      site {
        id
        name
      }
    }
  }
`;
export const GET_COPY = gql `
  {
    contentBlocks(filters: { category: "site happenings" }) {
      content
      slug
    }
  }
`;
