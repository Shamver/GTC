import { observable, action } from 'mobx';

class MailStore {
  @observable activeTab = 'get';

  constructor(root) {
    this.root = root;
  }

  @action onActive = ((e) => {
    const { name } = e.target;

    if (this.activeTab !== name) {
      this.activeTab = name;
    }
  });

  @action setTab = ((v) => {
    this.activeTab = v;
  });
}

export default MailStore;
