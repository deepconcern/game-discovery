import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { FC, useCallback, useEffect, useState } from 'react';

import { debounce } from '../debounce';
import {
    GamesQuery,
    GamesQueryVariables,
} from '../graphql-operations/GamesQuery';

import { GamesSearchContext } from './games-search-context';

const BACKGROUND_IMAGE_HEIGHT = 400;
const BACKGROUND_IMAGE_WIDTH = 600;
const MIN_SEARCH_QUERY_LENGTH = 3;
const REFETCH_GAMES_DEBOUNCE = 500;

const gamesQuery = gql`
    query GamesQuery(
        $searchQuery: String!
        $backgroundImageWidth: Int!
        $backgroundImageHeight: Int!
    ) {
        games(searchQuery: $searchQuery) {
            croppedBackgroundImage(
                width: $backgroundImageWidth
                height: $backgroundImageHeight
            )
            id
            rating
            ratings
            title
        }
    }
`;

export const GamesSearchProvider: FC = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<GamesQuery | null>(null);
    const apolloClient = useApolloClient();
    const debouncedFireGamesQuery = useCallback(
        debounce((searchQuery: string) => {
            apolloClient.query<GamesQuery, GamesQueryVariables>({
                query: gamesQuery,
                variables: {
                    backgroundImageHeight: BACKGROUND_IMAGE_HEIGHT,
                    backgroundImageWidth: BACKGROUND_IMAGE_WIDTH,
                    searchQuery,
                },
            }).then(({ data }) => {
                setLoading(false);
                setData(data);
            }).catch(error => {
                setError(error instanceof Error ? error : Error(error));
            });
            setLoading(true);
        }, REFETCH_GAMES_DEBOUNCE),
        [apolloClient, setData, setError, setLoading]
    );
    const updateSearchQuery = useCallback((newSearchQuery: string) => {
        setSearchQuery(newSearchQuery);

        if (newSearchQuery.length < MIN_SEARCH_QUERY_LENGTH) {
            return;
        }
        debouncedFireGamesQuery(newSearchQuery);
    }, [debouncedFireGamesQuery, setSearchQuery]);

    useEffect(() => {
        debouncedFireGamesQuery('');
    }, [debouncedFireGamesQuery]);

    const providerValue = {
        games: data?.games,
        error,
        loading,
        searchQuery,
        updateSearchQuery,
    };

    return (
        <GamesSearchContext.Provider value={providerValue}>
            {children}
        </GamesSearchContext.Provider>
    );
};
