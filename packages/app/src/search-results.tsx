import { Game } from '@game-discovery/schema';
import React, { FC } from 'react';

import { useSearchQuery } from './games-search';

const GAMES_PER_ROW = 6;

export const SearchResults: FC = () => {
    const { games, loading, error } = useSearchQuery();

    if (loading) {
        return <div>Loading</div>;
    }

    if (error) {
        console.error(error);
        return <div>Error</div>;
    }

    return (
        <div className="tile is-ancestor is-vertical">
            {(games || [])
                .reduce((rows, game, index) => {
                    if (index % GAMES_PER_ROW === 0) {
                        rows.push([]);
                    }

                    const lastRow = rows[rows.length - 1];

                    lastRow.push(game);

                    return rows;
                }, [] as Game[][])
                .map((row, index) => (
                    <div className="tile" key={`search-result-row-${index}`}>
                        {row.map(({ croppedBackgroundImage, id, title }) => (
                            <div
                                className={`tile is-parent is-${
                                    12 / GAMES_PER_ROW
                                }`}
                                key={`search-result-game-${id}`}
                            >
                                <article className="tile is-child box">
                                    {croppedBackgroundImage && (
                                        <figure className="figure is-4by3">
                                            <img src={croppedBackgroundImage} />
                                        </figure>
                                    )}
                                    <h3 className="sub-title">{title}</h3>
                                </article>
                            </div>
                        ))}
                    </div>
                ))}
        </div>
    );
};

SearchResults.displayName = 'SearchResults';
