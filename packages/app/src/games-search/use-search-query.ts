import { useContext } from 'react';

import {
    GamesQuery_games as Game
} from '../graphql-operations/GamesQuery';

import { GamesSearchContext } from './games-search-context';

export type SearchQuery = {
    error?: Error | null,
    games?: Game[] | null,
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
