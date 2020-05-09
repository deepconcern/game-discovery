import { RAWGGame, isRAWGGame } from './rawg-game';

export type RAWGGamesResponse = {
    count: number,
    next?: string,
    prev?: string,
    results: RAWGGame[],
};

export const isRAWGGamesResponse = (x: unknown): x is RAWGGamesResponse => {
    if (typeof x !== 'object' || !x) {
        return false;
    }

    if (!('count' in x)) {
        return false;
    }

    if (!('results' in x)) {
        return false;
    }

    const propertiesExistingX = x as {
        count: unknown,
        next?: unknown,
        prev?: unknown,
        results: unknown,
    };

    if (typeof propertiesExistingX.count !== 'number') {
        return false;
    }

    if (
        propertiesExistingX.next &&
        typeof propertiesExistingX.next !== 'string'
    ) {
        return false;
    }

    if (
        propertiesExistingX.prev &&
        typeof propertiesExistingX.prev !== 'string'
    ) {
        return false;
    }

    if (!Array.isArray(propertiesExistingX.results)) {
        return false;
    }

    if (
        propertiesExistingX.results
            .map(isRAWGGame)
            .filter((isValid) => !isValid).length !== 0
    ) {
        return false;
    }

    return true;
};
