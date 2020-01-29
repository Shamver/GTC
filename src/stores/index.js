import UserStore from './user/UserStore';
import UserAlertStore from './user/AlertStore';
import UserFavoriteStore from './user/FavoriteStore';
import UserIgnoreStore from './user/IgnoreStore';

import ComponentHeaderStore from './component/HeaderStore';
import ComponentPostLockerStore from './component/PostLockerStore';
import ComponentSettingStore from './component/SettingStore';
import ComponentMyAccountStore from './component/MyAccountStore';

import UtilStore from './util/UtilStore';
import UtilAlertStore from './util/AlertStore';
import UtilLoadingStore from './util/LoadingStore';
import UtilRouteStore from './util/RouteStore';

import BoardStore from './board/BoardStore';
import BoardPostStore from './board/PostStore';
import BoardReplyStore from './board/ReplyStore';
import BoardReportStore from './board/ReportStore';

class RootStore {
  constructor() {
    this.UserStore = new UserStore(this);
    this.UserAlertStore = new UserAlertStore(this);
    this.UserFavoriteStore = new UserFavoriteStore(this);
    this.UserIgnoreStore = new UserIgnoreStore(this);

    this.ComponentPostLockerStore = new ComponentPostLockerStore(this);
    this.ComponentSettingStore = new ComponentSettingStore(this);
    this.ComponentHeaderStore = new ComponentHeaderStore(this);
    this.ComponentMyAccountStore = new ComponentMyAccountStore(this);

    this.UtilStore = new UtilStore(this);
    this.UtilAlertStore = new UtilAlertStore(this);
    this.UtilLoadingStore = new UtilLoadingStore(this);
    this.UtilRouteStore = new UtilRouteStore(this);

    this.BoardStore = new BoardStore(this);
    this.BoardPostStore = new BoardPostStore(this);
    this.BoardReplyStore = new BoardReplyStore(this);
    this.BoardReportStore = new BoardReportStore(this);
  }
}

export default new RootStore();
