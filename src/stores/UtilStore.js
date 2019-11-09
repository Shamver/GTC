import { observable, action } from 'mobx';

class UtilStore {
  @observable alertToggle = false;

  @action ToggleAlert = () => {
    this.alertToggle = !this.alertToggle;
  }
}

export default new UtilStore();
