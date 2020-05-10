import React, { FC, lazy, Suspense } from 'react';
import { render } from 'react-dom';

const FallbackApp: FC = () => {
    return null;
};

const LazyApp = lazy(() => import(/* webpackPrefetch: true, webpackChunkName: "app" */ './app').then(loaded => {
    return {
        default: loaded.App
    };
}));

const AppLoadable: FC = () => {
    return (
        <Suspense fallback={<FallbackApp/>}>
            <LazyApp/>
        </Suspense>
    );
};

render(<AppLoadable />, document.getElementById('application'));
