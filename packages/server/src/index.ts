import { ApolloServer } from 'apollo-server-express';
import express = require('express');

import { RAWGDataSource } from './data-sources';
import { getSchema } from './get-schema';
import { gameResolver, queryResolver } from './resolvers';

const PORT = process.env['PORT'] || 4000;

const app = express();

app.set('view engine', 'pug');

const typeDefs = getSchema();

const server = new ApolloServer({
    dataSources: () => ({
        rawg: new RAWGDataSource(),
    }),
    resolvers: {
        Game: gameResolver,
        Query: queryResolver,
    },
    typeDefs,
});

server.applyMiddleware({ app });

app.get('/*', (_, res) => {
    res.render('index', {
        scriptUrl: process.env['SCRIPT_URL'] || 'http://example.com/app.js',
    });
});

app.listen(PORT, () => {
    console.log(`🚀  Server ready at http://localhost:${PORT}`);
});
