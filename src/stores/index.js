import HeaderStore from './util/HeaderStore';
import BoardStore from './board/BoardStore';
import PostStore from './board/PostStore';
import UtilStore from './util/UtilStore';
import RouteStore from './util/RouteStore';
import UserStore from './user/UserStore';
import SettingStore from './SettingStore';
import PostLockerStore from './PostLockerStore';
import NewAlertStore from './NewAlertStore';
import ReplyStore from './board/ReplyStore';

class RootStore {
  constructor() {
    this.HeaderStore = new HeaderStore(this);
    this.BoardStore = new BoardStore(this);
    this.UtilStore = new UtilStore(this);
    this.RouteStore = new RouteStore(this);
    this.UserStore = new UserStore(this);
    this.SettingStore = new SettingStore(this);
    this.PostLockerStore = new PostLockerStore(this);
    this.NewAlertStore = new NewAlertStore(this);
    this.ReplyStore = new ReplyStore(this);
    this.PostStore = new PostStore(this);
  }
}

export default new RootStore();
