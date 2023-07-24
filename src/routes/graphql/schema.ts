import { buildSchema } from "graphql";

export const schemaGraphql = buildSchema(`
  scalar UUID

  enum MemberTypeId {
    basic
    business
  }

  type User {
    id: UUID!
    name: String!
    balance: Float!
    posts: [Post!]
    profile: Profile
  }

  type Post {
    id: UUID!
    title: String!
    content: String!
    author: User!
  }

  type Profile {
    id: UUID!
    isMale: Boolean!
    yearOfBirth: Int!
    user: User!
    memberType: MemberType!
  }

  type MemberType {
    id: UUID!
    discount: Float!
    postsLimitPerMonth: Int!
  }

  type Query {
    memberTypes: [MemberType!]!
    posts: [Post!]!
    users: [User!]!
    profiles: [Profile!]!
    memberType(id: MemberTypeId!): MemberType
    post(id: UUID!): Post
    user(id: UUID!): User
    profile(id: UUID!): Profile
  }
`);