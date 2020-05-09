import gql from 'graphql-tag';

export const GET_POSTS = gql`
    query {
        posts {
            id
            title
            body
            imageUrl
            owner {
            id
            }
            likes {
                id
            }
        }
    }

`
export const GET_ONE_POST = gql`
query getPost($id:String! ) {
    onePost(postId:$id) {
        id
        title
        body
    }
}


`
