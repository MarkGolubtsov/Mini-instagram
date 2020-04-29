import gql from 'graphql-tag';

export const GET_NEWS = gql`
    query {
        news {
            id
            title
            body
            owner {
            id
            }
            likes {
                id
            }
        }
    }

`
export const GET_ONE_NEWS = gql`
query updateNews($id:String! ) {
    oneNews(newsId:$id) {
        id
        title
        body
    }
}


`
