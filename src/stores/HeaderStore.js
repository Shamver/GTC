import { observable } from 'mobx';

class HeaderStore {
  @observable title = '';
  @observable text = '';
}

export default new HeaderStore();
