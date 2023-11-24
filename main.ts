import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import { Query } from "./resolvers/Querys/querys.ts";
import { Mutation } from "./resolvers/Mutations/mutations.ts";

const gqlSchema = `#graphql
type Pet {
  id: ID!
  name: String!
  breed: String!
}
type Query {
  hello: String!
  pets: [Pet!]!
  pet(id: ID!): Pet!
}
type Mutation {
  addPet(name: String!, breed: String!): Pet!
  deletePet(id: ID!): Pet!
  updatePet(id: ID!, name: String!, breed: String!): Pet!
}
`;

// Mongo Cluster Connection
const MONGO_URL = Deno.env.get("MONGO_URL");
if(!MONGO_URL){
  console.log("MONGO_URL not defined.");
  Deno.exit(1);
}
try {
  await mongoose.connect(MONGO_URL);
  console.info("Connected with Mongo.")
} catch (error) {
  console.log(error);
}

// Apollo Server Connection
const server = new ApolloServer({
  typeDefs: gqlSchema,
  resolvers: {
    Query,
    Mutation,
  },
});

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 3000,
  },
});

console.info(`Server is listening ${url}`);
