import { observable, action } from 'mobx';

class UtilStore {
  @observable alertToggle = false;

  @observable signToggle = false;

  @observable signDisplay = true;

  @observable text = '';

  @action toggleAlert = (text) => {
    this.text = text;
    this.alertToggle = !this.alertToggle;
  };

  @action toggleSign = () => {
    this.signToggle = !this.signToggle;
  };

  @action changeSign = () => {
    this.signDisplay = !this.signDisplay;
  };
}

export default new UtilStore();
