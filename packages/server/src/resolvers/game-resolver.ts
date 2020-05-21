import { Context } from '../context';
import { GameResolvers } from '../schema';

type GameResolver = GameResolvers<Context>;

const BACKGROUND_IMAGE_ID_REGEX = /(games|screenshots)\/.*\/(.*).(jpg|jpeg)$/;

const rawgCroppedUrl = (
    backgroundImageUrl: string,
    width: number,
    height: number
): string => {
    const match = BACKGROUND_IMAGE_ID_REGEX.exec(backgroundImageUrl);

    if (!match) {
        throw Error(`Unable to parse image ID from "${backgroundImageUrl}"`);
    }

    const [, imageType, imageId, fileExtension] = match;
    const imageIdPrefix = imageId.slice(0, 3);

    return `https://media.rawg.io/media/crop/${width}/${height}/${imageType}/${imageIdPrefix}/${imageId}.${fileExtension}`;
};

export const gameResolver: GameResolver = {
    croppedBackgroundImage: (parent, args) => {
        const { height, width } = args;
        const { backgroundImage } = parent;

        if (!backgroundImage) {
            return null;
        }

        return rawgCroppedUrl(backgroundImage, width, height);
    },
};
