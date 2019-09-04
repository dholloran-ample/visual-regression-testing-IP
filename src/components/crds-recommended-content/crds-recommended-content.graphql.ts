import gql from "graphql-tag";

export const GET_USER = gql`
{
    user {
        lifeStage {
            id
            title
        }
    }
}
`;

export const GET_LIFESTAGES = gql`
{
  lifeStages{
    title
    description
    id
    imageUrl
    contentType
    contentTotal
    content {
        id
        title
        authors {
            fullName
            qualifiedUrl
        }
        duration
        contentType
        category
        slug
        qualifiedUrl
        imageUrl
    }
  }
}
`;

export const SET_LIFESTAGE = gql`
mutation setLifeStage($lifeStage: LifeStageInput)
 {
  setLifeStage(lifeStage: $lifeStage) {
    lifeStage {
      title
      id
    }
  }
}`
