import { observable, action } from 'mobx';

class UtilStore {
  @observable alertToggle = false;

  @observable text = '';

  @action toggleAlert = (text) => {
    this.text = text;
    this.alertToggle = !this.alertToggle;
  }
}

export default new UtilStore();
