import { observable, action } from 'mobx';

class SettingStore {
    @observable activeTab = 'ignore';

    @action onActive = ((e) => {
      const { name } = e.target;

      if (this.activeTab !== name) {
        this.activeTab = name;
      }
    });
}

export default new SettingStore();
