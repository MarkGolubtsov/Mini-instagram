import gql from 'graphql-tag';

export const LIKE = gql`
   mutation AddNewsLike($id: String!) {
     addNewsLike(newsId: $id) {
     id
      likes {
      id
      }
    }
  }
`;
export const DIS_LIKE = gql`
   mutation DeleteNewsLike($id: String!) {
     deleteNewsLike(newsId: $id) {
     id
      likes {
      id
      }
    }
  }
`;
