import { Game } from '@game-discovery/schema';
import { ApolloError } from 'apollo-client';
import { createContext } from 'react';

export type GamesSearchData = {
    error?: ApolloError,
    loading: boolean,
    games?: Game[],
    searchQuery: string,
    updateSearchQuery: (newSearchQuery: string) => void,
};

export const GamesSearchContext = createContext<GamesSearchData>({
    loading: false,
    searchQuery: '',
    updateSearchQuery: (_: string) => {
        // No-op. Will be implemented by provider
    },
});
