import { observable, action } from 'mobx';
import { toast } from 'react-toastify';

class MyAccountStore {
  @observable profileYN = 0;

  @observable profile = '';

  @observable nickname = '';

  @observable gtName = '';

  @observable prevNickname = '';

  @observable birth = '';

  @observable gender = '';

  @observable isAllValidationChecked = true;

  @observable timer;

  @observable disabled = true;

  @observable uploadImage = '';

  @observable uploadImagePreview = null;

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
    if (this.profileYN) {
      this.profileYN = 0;
    } else {
      this.profileYN = 1;
    }
    this.disabled = true;
    this.timer = setTimeout(() => {
      this.checkValidation();
    }, 300);
  });

  @action onChangeProfileImage = ((e) => {
    const image = e.target.files[0];

    const imageFilter = ['image/png', 'image/jpeg'];

    if (image && !imageFilter.includes(image.type)) {
      toast.error('이미지 파일만 업로드 가능합니다.');
      return false;
    }

    const reader = new FileReader();

    const maxSize = 1024 * 1024; // 1MB

    if (image === undefined) {
      return false; // 이미지 선택 후 변경 할 때 아무것도 선택하지 않을 경우의 처리
    }

    if (image && image.size > maxSize) {
      toast.error('이미지의 용량은 1MB를 초과할 수 없습니다.');
      return false;
    }

    reader.onload = (event) => {
      this.uploadImagePreview = event.target.result;
    };

    reader.readAsDataURL(image);

    this.uploadImage = image;
    this.disabled = true;
    this.timer = setTimeout(() => {
      this.checkValidation();
      toast.success('이미지는 1:1 비율로 강제 변환됩니다.');
    }, 300);
  });

  @action onChangeValue = ((e) => {
    this[e.target.name] = e.target.value;
    this.disabled = true;

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
      this.prevNickname = userData.username;
      this.birth = userData.birth;
      this.gender = userData.gender;
      this.profile = userData.profile;
      this.gtName = userData.gtName;
      this.uploadImagePreview = null;
    }

    this.checkValidation();
  });

  @action checkValidation = (() => {
    const { userData } = this.root.UserStore;
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

    this.disabled = this.nickname === userData.username
      && this.birth === userData.birth
      && this.gender === userData.gender
      && this.profileYN === userData.profileYN
      && this.uploadImagePreview === null;

    this.isAllValidationChecked = this.nicknameValidation.status
      && this.birthValidation.status
      && this.genderValidation.status;
  });
}

export default MyAccountStore;
