import gql from 'graphql-tag';

export const GET_COPY = gql`
query contentBlocks($componentName: String) {
  contentBlocks(filters: { category: $componentName }) {
    content
    slug
  }
}
`;
