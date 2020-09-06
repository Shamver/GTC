import { observable, action } from 'mobx';

class MailStore {
  @observable activeTab = 'get';

  constructor(root) {
    this.root = root;
  }

  @action onActive = ((e) => {
    const { name } = e.target;

    if (!name) return;

    if (this.activeTab !== name) {
      this.activeTab = name;
    }
  });

  @action setTab = ((v, to = null) => {
    if (to) {
      this.root.UserMailStore.mailForm = {
        ...this.root.UserMailStore.mailForm,
        mailTo: to,
      };
    }
    this.activeTab = v;
  });
}

export default MailStore;
