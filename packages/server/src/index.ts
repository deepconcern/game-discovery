import { ApolloServer } from 'apollo-server';
import { config } from 'dotenv';

import { RAWGDataSource } from './data-sources';
import { getSchema } from './get-schema';
import { gameResolver, queryResolver } from './resolvers';

config();

const PORT = process.env['PORT'] || 4000;

const typeDefs = getSchema();

const server = new ApolloServer({
    cors: {
        origin: process.env.APP_HOSTNAME,
        optionsSuccessStatus: 200
    },
    dataSources: () => ({
        rawg: new RAWGDataSource(),
    }),
    resolvers: {
        Game: gameResolver,
        Query: queryResolver,
    },
    typeDefs,
});

server.listen(PORT).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
