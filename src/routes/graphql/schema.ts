import { buildSchema } from "graphql";

export const schemaGraphql = buildSchema(`
  enum MemberTypeId {
    basic
    business
  }

  type User {
    id: ID!
    name: String!
    balance: Float!
    posts: [Post]!
    profiles: [Profile]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Profile {
    id: ID!
    isMale: Boolean!
    yearOfBirth: Int!
    user: User!
    memberType: MemberType!
  }

  type MemberType {
    id: ID!
    discount: Float!
    postsLimitPerMonth: Int!
  }

  type Query {
    memberTypes: [MemberType!]!
    posts: [Post!]!
    users: [User!]!
    profiles: [Profile!]!
    memberType(id: MemberTypeId!): MemberType
    post(id: ID!): Post
    user(id: ID!): User
    profile(id: ID!): Profile
  }
`);

