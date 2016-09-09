import React from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import store from '../../client/store';
import App from '../../client/App';

export default function serverSideRender() {
  return new Promise((fulfill) => {
    const rendered = ReactDOM.renderToString(
      <App store={store} />
    );
    const head = Helmet.rewind();
    const state = store.getState();

    fulfill({ rendered, head, state });
  });
}