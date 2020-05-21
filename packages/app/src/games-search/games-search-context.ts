import { createContext } from 'react';

import {
    GamesQuery_games as Game
} from '../graphql-operations/GamesQuery';

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
