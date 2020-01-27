import { observable, action } from 'mobx';

class AlertStore {
  @observable confirmAlertToggle = false;

  @observable alertToggle = false;

  @observable text = '';

  @observable callbackFunc = () => {};

  constructor(root) {
    this.root = root;
  }

  @action toggleConfirmAlert = (text, func = () => {}) => {
    if (text && typeof text === 'string') this.text = text;
    this.callbackFunc = func;
    this.confirmAlertToggle = !this.confirmAlertToggle;
  };

  @action toggleAlert = (text) => {
    if (text && typeof text === 'string') this.text = text;
    this.alertToggle = !this.alertToggle;
  };
}

export default AlertStore;
