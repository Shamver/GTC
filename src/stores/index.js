import UserStore from './user/UserStore';
import UserAlertStore from './user/AlertStore';
import UserFavoriteStore from './user/FavoriteStore';
import UserIgnoreStore from './user/IgnoreStore';
import UserPointStore from './user/PointStore';
import UserMailStore from './user/MailStore';

import ComponentHeaderStore from './component/HeaderStore';
import ComponentPostLockerStore from './component/PostLockerStore';
import ComponentSettingStore from './component/SettingStore';
import ComponentMyAccountStore from './component/MyAccountStore';
import ComponentReplyStore from './component/ReplyStore';
import ComponentPostStore from './component/PostStore';
import ComponentMailStore from './component/MailStore';

import UtilStore from './util/UtilStore';
import UtilAlertStore from './util/AlertStore';
import UtilLoadingStore from './util/LoadingStore';
import UtilRouteStore from './util/RouteStore';

import BoardStore from './board/BoardStore';
import BoardPostStore from './board/PostStore';
import BoardReplyStore from './board/ReplyStore';
import BoardReportStore from './board/ReportStore';
import BoardSearchStore from './board/SearchStore';

import CookieLatelyStore from './cookie/LatelyStore';

import EventDailyStore from './event/DailyStore';


import SystemCodeStore from './system/CodeStore';

class RootStore {
  constructor() {
    this.UserStore = new UserStore(this);
    this.UserAlertStore = new UserAlertStore(this);
    this.UserFavoriteStore = new UserFavoriteStore(this);
    this.UserIgnoreStore = new UserIgnoreStore(this);
    this.UserPointStore = new UserPointStore(this);
    this.UserMailStore = new UserMailStore(this);

    this.ComponentPostLockerStore = new ComponentPostLockerStore(this);
    this.ComponentSettingStore = new ComponentSettingStore(this);
    this.ComponentHeaderStore = new ComponentHeaderStore(this);
    this.ComponentMyAccountStore = new ComponentMyAccountStore(this);
    this.ComponentReplyStore = new ComponentReplyStore(this);
    this.ComponentPostStore = new ComponentPostStore(this);
    this.ComponentMailStore = new ComponentMailStore(this);

    this.UtilStore = new UtilStore(this);
    this.UtilAlertStore = new UtilAlertStore(this);
    this.UtilLoadingStore = new UtilLoadingStore(this);
    this.UtilRouteStore = new UtilRouteStore(this);

    this.BoardStore = new BoardStore(this);
    this.BoardPostStore = new BoardPostStore(this);
    this.BoardReplyStore = new BoardReplyStore(this);
    this.BoardReportStore = new BoardReportStore(this);
    this.BoardSearchStore = new BoardSearchStore(this);

    this.CookieLatelyStore = new CookieLatelyStore(this);

    this.EventDailyStore = new EventDailyStore(this);


    this.SystemCodeStore = new SystemCodeStore(this);
  }
}

export default new RootStore();
