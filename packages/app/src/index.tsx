import React from 'react';
import { render } from 'react-dom';
import Loadable from 'react-loadable';

const AppLoadable = Loadable({
    loader: () => import(/* webpackPrefetch: true, webpackChunkName: "app" */ './app'),
    loading: () => null,
    render: ({ App }) => (
        <App/>
    )
})

render(<AppLoadable />, document.getElementById('application'));
