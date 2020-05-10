import React, { FC, lazy, Suspense } from 'react';

const FallbackApp: FC = () => {
    return null;
};

const AppLoader = lazy(() => import(/* webpackChunkName: "app" */ './app').then(loaded => {
    return {
        default: loaded.App
    };
}));

export const LazyApp: FC = () => {
    return (
        <Suspense fallback={<FallbackApp/>}>
            <AppLoader/>
        </Suspense>
    )
};
