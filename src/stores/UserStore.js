import { observable, action } from 'mobx';
import axios from 'axios';
import UtilStore from './UtilStore';

class UserStore {
  @observable registerData = {
    email: '',
    password: '',
    name: '',
    nickname: '',
    tel: '',
    birth: '',
    gender: '',
    gtNickname: '',
  };

  @observable loginData = {
    email: '',
    password: '',
  };

  @observable userSessionData;

  @action register = () => {
    if (!this.registerValidationCheck()) {
      return false;
    }

    axios.post('/api/register', this.registerData)
      .then((response) => {
        if (response.data) {
          if (response.data[0] && response.data[0].count === 1) {
            UtilStore.toggleAlert('동일한 명의나 카카오 계정으로 이미 계정이 생성되어있습니다.');
          } else {
            UtilStore.toggleAlert('가입이 완료되었습니다.');
            UtilStore.toggleSign();
          }
        }
      })
      .catch((response) => { console.log(response); });

    return true;
  };

  @action login = () => {
    if (!this.loginValidationCheck()) {
      return false;
    }

    axios.post('/api/login', this.loginData)
      .then((response) => {
        if (response.data) {
          if (response.data.length === 1) {
            UtilStore.toggleAlert('로그인이 완료되었습니다.');
            UtilStore.toggleSign();
            this.sessionCheck();
          } else {
            UtilStore.toggleAlert('이메일이나 비밀번호가 올바르지 않습니다.');
          }
        }
      })
      .catch((response) => { console.log(response); });

    return true;
  };

  @action logout = () => {
    axios.post('/api/logout', {})
      .then((response) => {
        if (response.data.type === 'LOGOUT') {
          UtilStore.toggleAlert('로그아웃이 완료되었습니다.');
          this.sessionCheck();
        }
      })
      .catch((response) => { console.log(response); });

    return true;
  };

  @action sessionCheck = () => {
    axios.post('/api/sessionCheck', {})
      .then((response) => {
        if (response.data) {
          if (response.data.type === 'LOGGED') {
            this.userSessionData = response.data.userInfo;
          } else {
            this.userSessionData = '';
          }

        }
      })
      .catch((response) => { console.log(response); });

    return true;
  };


  @action onRegisterChangeValue = (event) => {
    this.registerData = {
      ...this.registerData,
      [event.target.name]: event.target.value,
    };
  };

  @action onLoginChangeValue = (event) => {
    this.loginData = {
      ...this.loginData,
      [event.target.name]: event.target.value,
    };
  };

  registerValidationCheck = () => {
    // email
    if (!this.registerData.email) {
      UtilStore.toggleAlert('이메일을 입력해주세요.');
      return false;
    }

    // password
    const check = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$/;
    if (!this.registerData.password || !check.test(this.registerData.password)) {
      UtilStore.toggleAlert('8~16자 영문 대 소문자, 숫자, 특수문자(필수)를 사용하세요.');
      return false;
    }

    // name
    if (!this.registerData.name) {
      UtilStore.toggleAlert('이름을 입력해주세요.');
      return false;
    }

    // nickname
    if (!this.registerData.nickname) {
      UtilStore.toggleAlert('닉네임 입력해주세요.');
      return false;
    }

    // tel
    if (!this.registerData.tel || Number.isNaN(this.registerData.tel)) {
      UtilStore.toggleAlert('전화번호 형식을 맞추어서 입력해주세요.');
      return false;
    }

    // birth
    if (!this.registerData.birth) {
      UtilStore.toggleAlert('생년월일을 입력해주세요.');
      return false;
    }

    // gender
    if (!this.registerData.gender) {
      UtilStore.toggleAlert('성별을 입력해주세요.');
      return false;
    }

    // gtNickname
    if (!this.registerData.gtNickname) {
      UtilStore.toggleAlert('그로우토피아 닉네임을 입력해주세요.');
      return false;
    }

    return true;
  };

  loginValidationCheck() {
    // email
    if (!this.loginData.email.trim()) {
      UtilStore.toggleAlert('이메일을 입력해주세요.');
      return false;
    }

    // password
    if (!this.loginData.password.trim()) {
      UtilStore.toggleAlert('비밀번호를 입력해주세요.');
      return false;
    }
    return true;
  }
}

export default new UserStore();
