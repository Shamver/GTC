import { observable, action } from 'mobx';

class MyAccountStore {
  @observable profileYN;

  @observable nickname;

  @observable birth;

  @observable gender;

  @observable isAllValidationChecked = true;

  @observable timer;

  @observable nicknameValidation = {
    status: true,
    message: '',
  };

  @observable birthValidation = {
    status: true,
    message: '',
  };

  @observable genderValidation = {
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

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.checkValidation();
    }, 300);
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
    if (this.nickname.trim() === '') {
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

    if (!this.birth) {
      this.birthValidation = {
        status: false,
        message: '올바른 생년월일을 입력해주세요.',
      };
    } else {
      this.birthValidation = {
        status: true,
        message: '',
      };
    }

    if (!this.gender) {
      this.genderValidation = {
        status: false,
        message: '성별을 선택해주세요.',
      };
    } else {
      this.genderValidation = {
        status: true,
        message: '',
      };
    }

    this.isAllValidationChecked = this.nicknameValidation.status
    && this.birthValidation.status
    && this.genderValidation.status;
  });
}

export default MyAccountStore;
