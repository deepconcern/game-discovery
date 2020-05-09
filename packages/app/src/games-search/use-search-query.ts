import { ApolloError } from 'apollo-client';
import { useContext } from 'react';
import { Game } from '@game-discovery/schema';

import { GamesSearchContext } from './games-search-context';

export type SearchQuery = {
    error?: ApolloError,
    games?: Game[],
    loading: boolean,
    searchQuery: string,
};

export const useSearchQuery = (): SearchQuery => {
    const { error, games, loading, searchQuery } = useContext(
        GamesSearchContext
    );

    return {
        error,
        games,
        loading,
        searchQuery,
    };
};
