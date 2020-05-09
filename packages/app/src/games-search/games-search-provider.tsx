import { useLazyQuery } from '@apollo/react-hooks';
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
    const [fireGamesQuery, { data, loading, error }] = useLazyQuery<
        GamesQuery,
        GamesQueryVariables
    >(gamesQuery, {
        variables: {
            backgroundImageHeight: BACKGROUND_IMAGE_HEIGHT,
            backgroundImageWidth: BACKGROUND_IMAGE_WIDTH,
            searchQuery,
        },
    });
    const debouncedFireGamesQuery = useCallback(
        debounce(fireGamesQuery, REFETCH_GAMES_DEBOUNCE),
        []
    );
    const updateSearchQuery = useCallback((newSearchQuery: string) => {
        if (newSearchQuery === searchQuery) {
            return;
        }

        setSearchQuery(newSearchQuery);

        if (newSearchQuery.length < MIN_SEARCH_QUERY_LENGTH) {
            return;
        }
        debouncedFireGamesQuery();
    }, []);

    useEffect(() => {
        fireGamesQuery();
    }, []);

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
