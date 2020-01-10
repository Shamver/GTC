import HeaderStore from './HeaderStore';
import BoardStore from './BoardStore';
import UtilStore from './UtilStore';
import RouteStore from './RouteStore';
import UserStore from './UserStore';
import SettingStore from './SettingStore';
import PostLockerStore from './PostLockerStore';
import NewAlertStore from './NewAlertStore';
import ReplyStore from './ReplyStore';

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
  }
}

export default new RootStore();
