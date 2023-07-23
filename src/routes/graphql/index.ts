import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql } from 'graphql';
import { schemaGraphql } from './schema.js';


const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      try {
        const { query, variables } = req.body;

        const { prisma } = fastify;
        const root = {
          memberTypes: () => prisma.memberType.findMany(),
          posts: () => prisma.post.findMany(),
          users: () => prisma.user.findMany(),
          profiles: () => prisma.profile.findMany(),
        }

        const result = await graphql({ schema: schemaGraphql, rootValue: root, source: query, variableValues: variables, contextValue: { fastify } });

        console.log(result);
        return result;
      } catch (error) {
        console.error(error)
      }
    },
  });
};

export default plugin;
