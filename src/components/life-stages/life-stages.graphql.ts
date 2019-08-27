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
    lifeStages {
      id
      title
      imageUrl
      contentTotal
      description
    }
}
`;

export const GET_LIFESTAGE_CONTENT = gql`
query lifeStageContent($id: String)
{
    lifeStageContent(id: $id) {
      id
      title
      authors {
        fullName
        qualifiedUrl
      }
      duration
      contentType
      category
      qualifiedUrl
      imageUrl
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
