import { observable, action } from 'mobx';
import {}

class UserStore {
  @observable registerData= {
    email: '',
    password: '',
    name: '',
    nickname: '',
    tel: '',
    birth: '',
    gender: '',
    gtNickname: '',
  };

  @action register = () => {
    if (!this.registerValidationCheck()) {
      return false;
    }
    return true;
  };

  registerValidationCheck = () => {
    // email
    if (!this.registerData.email) return false;
    // password

    // name

    // nickname

    // tel

    // birth

    // gender

    // gtNickname

    return true;
  };


}

export default new UserStore();
