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
export const DELETE_NEWS = gql`
    mutation DeleteNews($id: String!) {
      deleteNews (newsId:$id) {
       id
       title
       body
       likes{
           id
       }
       
    }
    }
    `;
export const CREATE_NEWS = gql`
mutation CreateNews($title: String!,$body: String!) {
       createNews(title:$title,body:$body) {
            id
            title
            body
            likes{
                id
            }
       
       }
      
}
`;
