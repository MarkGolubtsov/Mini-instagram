import gql from 'graphql-tag';

export const LIKE = gql`
   mutation AddPostLike($id: String!) {
     addPostLike(postId: $id) {
           id
       title
       body
         imageUrl
        owner {
            id
            }
       likes{
           id
       }
    }
  }
`;
export const DIS_LIKE = gql`
   mutation DeletePostLike($id: String!) {
     deletePostLike(postId: $id) {
       id
       title
       body
       imageUrl
        owner {
            id
            }
       likes{
           id
       }
    }
  }
`;
export const DELETE_POST = gql`
    mutation DeletePost($id: String!) {
      deletePost (postId:$id) {
       id
       title
       body
         imageUrl
        owner {
            id
            }
       likes{
           id
       }
       
    }
    }
    `;
export const CREATE_POST = gql`
mutation CreatePost($title: String!,$body: String!, $image:FileUpload!) {
       createPost(title:$title,body:$body,image:$image) {
            id
            title
            body
              owner {
                id
             }
            imageUrl
            likes {
                id
            }
       
       }
      
}
`;

export const UPDATE_POST = gql`
   mutation UpdatePost($id: String!, $title: String, $body: String) {
    updatePost(postId:$id,title:$title,body:$body) {
       id
       title
       body
       imageUrl
       likes {
        id
       }
    }    
   
   }
   
    
    `;
