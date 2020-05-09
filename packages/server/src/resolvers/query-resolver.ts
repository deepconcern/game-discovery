import { Game, QueryResolvers } from '@game-discovery/schema';

import { Context } from '../context';

type QueryResolver = Required<QueryResolvers<Context>>;

type GameResolver = QueryResolver['games'];

const gamesResolver: GameResolver = (_, args, context): Promise<Game[]> => {
    const { searchQuery } = args;
    const {
        dataSources: { rawg },
    } = context;
    return rawg
        .games({
            searchQuery,
        })
        .then((rawgGames) => {
            return rawgGames.map((rawgGame) => {
                return {
                    backgroundImage: rawgGame.background_image,
                    id: rawgGame.id.toString(),
                    rating: rawgGame.rating,
                    ratings: JSON.stringify(rawgGame.ratings),
                    title: rawgGame.name,
                };
            });
        });
};

export const queryResolver: QueryResolver = {
    games: gamesResolver,
};
