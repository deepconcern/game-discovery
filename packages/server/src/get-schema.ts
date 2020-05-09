import { readFileSync } from 'fs';
import { resolve } from 'path';

/** The name of the GraphQL schema file */
const SCHEMA_FILENAME = 'schema.graphql';
/** The path to the GraphQL schema file */
const SCHEMA_PATH = resolve(__dirname, SCHEMA_FILENAME);

/**
 * Reads the GraphQL schema from the schema file, and returns the content.
 *
 * @returns The GraphQL schema file's contents
 */
export const getSchema = (): string => {
    return readFileSync(SCHEMA_PATH, { encoding: 'utf-8' });
};
