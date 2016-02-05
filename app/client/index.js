import React from 'react';
import { render } from 'react-dom';
import App from '../common/containers/App';

require('es6-promise').polyfill();
require('../common/stylesheets/main.scss');

const rootElement = document.getElementById('root');

render(
    <App/>,
    rootElement
);
