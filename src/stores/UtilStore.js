import { observable, action } from 'mobx';
import UserStore from "./UserStore";

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
  };

  @action toggleSign = (result) => {
    if (result.profile) {
      UserStore.setRegisterData(result);
    }

    this.signToggle = !this.signToggle;
  };

  @action changeSign = () => {
    this.signDisplay = !this.signDisplay;
  };
}

export default new UtilStore();
