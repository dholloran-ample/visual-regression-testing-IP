import gql from 'graphql-tag';

export const GET_GROUP_PRIVACY = gql`
  query getGroupPrivacy($ids: ID!) {
    groups(ids: [$ids]) {
      id
      availableOnline
    }
  }
`;

export const SET_GROUP_PRIVACY = gql`
  mutation setGroupPrivacy($id: ID, $isPublic: Boolean) {
    setGroupPrivacy(id: $id, availableOnline: $isPublic) {
      id
      availableOnline
    }
  }
`;
