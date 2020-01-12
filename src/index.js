import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import stores from './Stores';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render((
  <Provider
    HeaderStore={stores.HeaderStore}
    BoardStore={stores.BoardStore}
    UtilStore={stores.UtilStore}
    CategoryStore={stores.CategoryStore}
    RouteStore={stores.RouteStore}
    UserStore={stores.UserStore}
    ComponentSettingStore={stores.ComponentSettingStore}
    PostLockerStore={stores.PostLockerStore}
    UserAlertStore={stores.UserAlertStore}
    UserFavoritePostStore={stores.UserFavoritePostStore}
    UserIgnoreStore={stores.UserIgnoreStore}
    UserStore2={stores.UserStore2}
    UtilStore2={stores.UtilStore2}
    UtilAlertStore={stores.UtilAlertStore}
    UtilLoadingStore={stores.UtilLoadingStore}
  >
    <Router>
      <Route component={App} />
    </Router>
  </Provider>
), document.getElementById('root'));

serviceWorker.unregister();
