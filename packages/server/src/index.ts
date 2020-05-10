import { ApolloServer } from 'apollo-server-express';
import { json } from 'body-parser';
import cors = require('cors');
import express = require('express');
import { resolve } from 'path';

import { RAWGDataSource } from './data-sources';
import { getSchema } from './get-schema';
import { gameResolver, queryResolver } from './resolvers';

const PORT = process.env['PORT'] || 4000;
const ROOT_DIR = resolve(__dirname, '..', '..', '..');
const TEMPLATES_DIR = resolve(ROOT_DIR, 'templates');

const app = express();

app.use(json());
app.use(cors());

app.set('views', TEMPLATES_DIR);
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

server.applyMiddleware({
    app,
    path: '/graphql',
});

app.get('/*', (_, res) => {
    res.render('index', {
        scriptUrl: process.env['SCRIPT_URL'],
    });
});

app.listen(PORT, () => {
    console.log(`🚀  Server ready at http://localhost:${PORT}`);
});
