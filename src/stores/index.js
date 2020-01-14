import HeaderStore from './HeaderStore';
import BoardStore from './BoardStore';
import UtilStore from './util/UtilStore';
import CategoryStore from './CategoryStore';
import RouteStore from './RouteStore';
import UserStore from './UserStore';

import UserAlertStore from './user/AlertStore';
import UserFavoriteStore from './user/FavoriteStore';
import UserIgnoreStore from './user/IgnoreStore';
import UserStore2 from './user/UserStore';

import ComponentPostLockerStore from './component/PostLockerStore';
import ComponentSettingStore from './component/SettingStore';

import UtilStore2 from './util/UtilStore';
import UtilAlertStore from './util/AlertStore';
import UtilLoadingStore from './util/LoadingStore';

import BoardPostStore from './board/PostStore';
import BoardReplyStore from './board/ReplyStore';

class RootStore {
  constructor() {
    this.HeaderStore = new HeaderStore(this);
    this.BoardStore = new BoardStore(this);
    this.UtilStore = new UtilStore(this);
    this.CategoryStore = new CategoryStore(this);
    this.RouteStore = new RouteStore(this);
    this.UserStore = new UserStore(this);
    this.UserAlertStore = new UserAlertStore(this);
    this.UserFavoriteStore = new UserFavoriteStore(this);
    this.UserIgnoreStore = new UserIgnoreStore(this);
    this.UserStore2 = new UserStore2(this);
    this.ComponentPostLockerStore = new ComponentPostLockerStore(this);
    this.ComponentSettingStore = new ComponentSettingStore(this);
    this.UtilStore2 = new UtilStore2(this);
    this.UtilAlertStore = new UtilAlertStore(this);
    this.UtilLoadingStore = new UtilLoadingStore(this);
    this.BoardPostStore = new BoardPostStore(this);
    this.BoardReplyStore = new BoardReplyStore(this);
  }
}

export default new RootStore();
