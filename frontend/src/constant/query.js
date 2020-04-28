import gql from 'graphql-tag';

export const GET_NEWS = gql`
    query {
        news {
            id
            title
            body
            likes {
                id
            }
        }
    }

`
