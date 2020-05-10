#!/usr/bin/env node

const { S3 } = require('aws-sdk');
const { readdirSync, readFileSync } = require('fs');
const { lookup } = require('mime-types');
const { join, resolve } = require('path');

const AWS_ACCESS_KEY_ID = process.env['AWS_ACCESS_KEY_ID'];
const AWS_SECRET_ACCESS_KEY = process.env['AWS_SECRET_ACCESS_KEY'];
const BUCKET_NAME = 'deepconcern-game-discovery';
const BUCKET_REGION = 'us-west-1';
const DIST_DIR = resolve(__dirname, '..', 'dist');

const recursiveFileMap = (relativePath = null) => {
    const currentDirectory = relativePath ? resolve(DIST_DIR, relativePath) : DIST_DIR;
    return readdirSync(currentDirectory, {
        encoding: 'utf-8',
        withFileTypes: true
    }).reduce((map, file) => {
        const filePath = relativePath ? join(relativePath, file.name) : file.name;
        if (file.isDirectory()) {
            const fileMap = recursiveFileMap(filePath);

            map = {...map, ...fileMap};
        } else {
            const fileContents = readFileSync(resolve(currentDirectory, file.name), {
                encoding: 'utf-8',
            });

            map[filePath] = fileContents;
        }

        return map;
    }, {});
};

const fileMap = recursiveFileMap();

const s3 = new S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    region: BUCKET_REGION,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

Promise.all(Object.entries(fileMap).map(([filePath, fileContents]) => {
    return s3.putObject({
        ACL: 'public-read',
        Body: Buffer.from(fileContents),
        Bucket: BUCKET_NAME,
        ContentType: lookup(filePath),
        Key: filePath
    }).promise();
}));
