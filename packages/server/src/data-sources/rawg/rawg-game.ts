export type RAWGGame = {
    background_image: string,
    id: number,
    name: string,
    rating: number,
    ratings: object,
};

export const isRAWGGame = (x: unknown): x is RAWGGame => {
    if (typeof x !== 'object' || !x) {
        return false;
    }

    if (!('name' in x)) {
        return false;
    }

    if (!('id' in x)) {
        return false;
    }

    const propsExistingX = x as {
        background_image?: unknown,
        id: unknown,
        name: unknown,
        rating?: unknown,
        ratings?: unknown,
    };

    if (
        propsExistingX.background_image &&
        typeof propsExistingX.background_image !== 'string'
    ) {
        return false;
    }

    if (typeof propsExistingX.id !== 'number') {
        return false;
    }

    if (typeof propsExistingX.name !== 'string') {
        return false;
    }

    if (propsExistingX.rating && typeof propsExistingX.rating !== 'number') {
        return false;
    }

    if (propsExistingX.ratings && typeof propsExistingX.ratings !== 'object') {
        return false;
    }

    return true;
};
