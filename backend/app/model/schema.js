const {buildSchema} = require('graphql');

const schema = buildSchema(`
 type Query {
  news: [News!]!
 }
 type Mutation {
  addNews(title: String!, body: String!): News!
  updateNews(newsId: ID!, title: String, body: String): News!
  deleteNews(newsId: ID!):News
  addNewsLike(newsId: String!): News!
  deleteNewsLike(newsId: ID!): News!
  }

    type News {
    id: ID!
    title: String!
    body: String!
    likes: [User!]!
  }
  

type User {
    id: ID!
    name: String
    email: String
  }
`);

module.exports = schema;
