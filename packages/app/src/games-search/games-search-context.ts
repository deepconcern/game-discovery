import { Game } from '@game-discovery/schema';
import { createContext } from 'react';

export type GamesSearchData = {
    error?: Error | null,
    loading: boolean,
    games?: Game[] | null,
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
