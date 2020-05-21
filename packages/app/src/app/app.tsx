import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import React, { FC } from 'react';

import { GamesSearchBar, GamesSearchProvider } from '../games-search';
import { SearchResults } from '../search-results';

console.log('process', process);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: `${process.env['SERVER_URL']}` }),
});

export const App: FC = () => {
    return (
        <ApolloProvider client={client}>
            <GamesSearchProvider>
                <header className="section">
                    <div className="container">
                        <h1 className="title">Game Discovery</h1>
                        <section>
                            <GamesSearchBar />
                        </section>
                    </div>
                </header>
                <main>
                    <section className="section">
                        <div className="container">
                            <SearchResults />
                        </div>
                    </section>
                </main>
            </GamesSearchProvider>
        </ApolloProvider>
    );
};
