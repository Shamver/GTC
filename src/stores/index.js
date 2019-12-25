import HeaderStore from './HeaderStore';
import BoardStore from './BoardStore';
import UtilStore from './UtilStore';
import CategoryStore from './CategoryStore';
import RouteStore from './RouteStore';
import UserStore from './UserStore';
import SettingStore from './SettingStore';

class RootStore {
  constructor() {
    this.HeaderStore = new HeaderStore(this);
    this.BoardStore = new BoardStore(this);
    this.UtilStore = new UtilStore(this);
    this.CategoryStore = new CategoryStore(this);
    this.RouteStore = new RouteStore(this);
    this.UserStore = new UserStore(this);
    this.SettingStore = new SettingStore(this);
  }
}

export default new RootStore();
