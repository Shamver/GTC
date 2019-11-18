import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import stores from './stores';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render((
  <Provider
    HeaderStore={stores.HeaderStore}
    ContentStore={stores.ContentStore}
    UtilStore={stores.UtilStore}
    CategoryStore={stores.CategoryStore}
    RouteStore={stores.RouteStore}
  >
    <Router>
      <Route component={App} />
    </Router>
  </Provider>
), document.getElementById('root'));

serviceWorker.unregister();
