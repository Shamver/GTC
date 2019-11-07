import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { Router } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import stores from './stores';
import history from './history';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render((
  <Provider
    HeaderStore={stores.HeaderStore}
  >
    <Router history={history}>
      <App/>
    </Router>
  </Provider>
), document.getElementById('root'));

serviceWorker.unregister();
