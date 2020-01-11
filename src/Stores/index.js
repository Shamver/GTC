import HeaderStore from './HeaderStore';
import BoardStore from './BoardStore';
import UtilStore from './util/UtilStore';
import CategoryStore from './CategoryStore';
import RouteStore from './RouteStore';
import UserStore from './UserStore';

import UserAlertStore from './user/AlertStore';
import UserFavoritePostStore from './user/FavoritePostStore';
import UserIgnoreStore from './user/IgnoreStore';
import UserStore2 from './user/UserStore';

import PostLockerStore from './component/PostLockerStore';
import SettingStore from './component/SettingStore';

import UtilStore2 from './util/UtilStore';
import UtilAlertStore from './util/AlertStore';
import UtilLoadingStore from './util/LoadingStore';

class RootStore {
  constructor() {
    this.HeaderStore = new HeaderStore(this);
    this.BoardStore = new BoardStore(this);
    this.UtilStore = new UtilStore(this);
    this.CategoryStore = new CategoryStore(this);
    this.RouteStore = new RouteStore(this);
    this.UserStore = new UserStore(this);
    this.UserAlertStore = new UserAlertStore(this);
    this.UserFavoritePostStore = new UserFavoritePostStore(this);
    this.UserIgnoreStore = new UserIgnoreStore(this);
    this.UserStore2 = new UserStore2(this);
    this.PostLockerStore = new PostLockerStore(this);
    this.SettingStore = new SettingStore(this);
    this.UtilStore2 = new UtilStore2(this);
    this.UtilAlertStore = new UtilAlertStore(this);
    this.UtilLoadingStore = new UtilLoadingStore(this);
  }
}

export default new RootStore();
