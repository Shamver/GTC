import { observable, action } from 'mobx';

class UtilStore {
  @observable alertToggle = false;

  @observable confirmAlertToggle = false;

  @observable signToggle = false;

  @observable signDisplay = true;

  @observable text = '';

  @observable callbackFunc = () => {};

  @action toggleAlert = (text) => {
    if (text && typeof text === 'string') this.text = text;
    this.alertToggle = !this.alertToggle;
  };

  @action toggleConfirmAlert = (text, func = undefined) => {
    this.text = text;
    this.callbackFunc = func;
    this.confirmAlertToggle = !this.confirmAlertToggle;
  }

  @action toggleSign = () => {
    this.signToggle = !this.signToggle;
  };

  @action changeSign = () => {
    this.signDisplay = !this.signDisplay;
  };
}

export default new UtilStore();
