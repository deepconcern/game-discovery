import { RESTDataSource } from 'apollo-datasource-rest';
import { RAWGGame } from './rawg-game';
import { isRAWGGamesResponse } from './rawg-games-response';

export type RAWGGamesQuery = {
    searchQuery?: string | null,
};

export class RAWGDataSource extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.rawg.io/api';
    }

    async games({ searchQuery }: RAWGGamesQuery): Promise<RAWGGame[]> {
        const params: { [param: string]: string | number } = {};

        if (searchQuery) {
            params.search = searchQuery;
        }

        const response = (await this.get('/games', params)) as unknown;

        if (!isRAWGGamesResponse(response)) {
            throw Error('FFUUUUUU');
        }

        return response.results;
    }
}
