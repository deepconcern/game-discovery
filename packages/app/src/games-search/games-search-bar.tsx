import React, { ChangeEvent, FC, useContext } from 'react';

import { GamesSearchContext } from './games-search-context';

export const GamesSearchBar: FC = () => {
    const { searchQuery, updateSearchQuery } = useContext(GamesSearchContext);

    const handleUserInput = (ev: ChangeEvent<HTMLInputElement>): void => {
        updateSearchQuery(ev.target.value);
    };

    return (
        <input
            className="input is-large"
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={handleUserInput}
        />
    );
};
