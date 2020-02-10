import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import unregister from './serviceWorker';
import stores from './stores';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render((
  <Provider
    UserStore={stores.UserStore}
    UserAlertStore={stores.UserAlertStore}
    UserFavoriteStore={stores.UserFavoriteStore}
    UserIgnoreStore={stores.UserIgnoreStore}
    UserPointStore={stores.UserPointStore}

    ComponentHeaderStore={stores.ComponentHeaderStore}
    ComponentSettingStore={stores.ComponentSettingStore}
    ComponentPostLockerStore={stores.ComponentPostLockerStore}
    ComponentMyAccountStore={stores.ComponentMyAccountStore}
    ComponentReplyStore={stores.ComponentReplyStore}
    ComponentPostStore={stores.ComponentPostStore}
    ComponentMailStore={stores.ComponentMailStore}

    UtilStore={stores.UtilStore}
    UtilRouteStore={stores.UtilRouteStore}
    UtilAlertStore={stores.UtilAlertStore}
    UtilLoadingStore={stores.UtilLoadingStore}

    BoardStore={stores.BoardStore}
    BoardPostStore={stores.BoardPostStore}
    BoardReplyStore={stores.BoardReplyStore}
    BoardReportStore={stores.BoardReportStore}

    CookieLatelyStore={stores.CookieLatelyStore}
  >
    <Router>
      <Route component={App} />
    </Router>
  </Provider>
), document.getElementById('root'));

unregister();
