const {buildSchema} = require('graphql');

const schema = buildSchema(`
scalar FileUpload

 type Query {
  posts: [Post!]!
  onePost(postId: String!): Post
 }
 type Mutation {
  createPost(title: String!, body: String!, image:FileUpload!): Post!
  updatePost(postId: String!, title: String, body: String): Post!
  deletePost(postId: String!):Post
  addPostLike(postId: String!): Post!
  deletePostLike(postId: String!): Post!
  }
  

    type Post {
    id: ID!
    title: String!
    imageUrl: String!
    owner: User!
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
