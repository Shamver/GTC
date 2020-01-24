import { observable, action } from 'mobx';

class MyAccountStore {
  @observable profileYN;

  @observable nickname;

  @observable birth;

  @observable gender;

  @observable nicknameValidation = {
    status: true,
    message: '',
  };

  constructor(root) {
    this.root = root;
  }

  @action onChangeProfile = (() => {
    if (this.profileYN === 'Y') {
      this.profileYN = 'N';
    } else {
      this.profileYN = 'Y';
    }
  });

  @action onChangeValue = ((e) => {
    this[e.target.name] = e.target.value;
    this.checkValidation();
  });

  @action setDefaultValue = (() => {
    const { UserStore } = this.root;
    const { userData } = UserStore;

    if (userData) {
      this.profileYN = userData.profileYN;
      this.nickname = userData.username;
      this.birth = userData.birth;
      this.gender = userData.gender;
    }
  });

  @action checkValidation = (() => {
    if (this.nickname === '') {
      this.nicknameValidation = {
        status: false,
        message: '공백 닉네임은 불가능합니다.',
      };
    } else {
      this.nicknameValidation = {
        status: true,
        message: '',
      };
    }
  });
}

export default MyAccountStore;
