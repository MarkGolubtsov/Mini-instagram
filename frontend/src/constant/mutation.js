import gql from 'graphql-tag';

export const LIKE = gql`
   mutation AddNewLike($id: String!) {
     addNewsLike(newsId: $id) {
     id
      likes {
      id
      }
    }
  }
`;
