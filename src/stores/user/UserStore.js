import { observable, action } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class UserStore {
  @observable registerData = {
    email: '',
    name: '',
    nickname: '',
    tel: '',
    birth: '',
    gender: '',
    gtNickname: '',
  };

  @observable userData;

  constructor(root) {
    this.root = root;
  }

  @action setRegisterData = (data) => {
    const userData = data.profile.kakao_account;
    this.registerData.nickname = userData.profile.nickname;
    if (userData.has_email) { this.registerData.email = userData.email; }
    if (userData.has_birthday) { this.registerData.birth = `1000-${userData.birthday.substring(0, 2)}-${userData.birthday.substring(2)}`; }
    if (userData.has_gender) { this.registerData.gender = userData.gender; }
    if (userData.has_email) { this.registerData.email = userData.email; }
  };

  @action registerCheck = () => {
    const { toggleConfirmAlert } = this.root.UtilAlertStore;

    if (!this.registerValidationCheck()) {
      return false;
    }

    toggleConfirmAlert(
      `이름(실명): ${this.registerData.name}
      전화번호: ${this.registerData.tel}
      그로우토피아 닉네임: ${this.registerData.gtNickname} \n
      위 정보가 정확하지 않을 시 거래에 문제가 생기거나 
      밴을 당할 우려가 있습니다.
      회원가입 입력란 하단 설명을 참고하시어 제대로 입력해주십시오.
      해당 정보가 확실히 맞습니까?`, this.register,
    );

    return true;
  };

  @action register = () => {
    const { toggleAlert } = this.root.UtilAlertStore;
    const { toggleSign } = this.root.UtilStore;

    axios.post('/api/auth/register', this.registerData)
      .then((response) => {
        if (response.data) {
          if (response.data[0] && response.data[0].count === 1) {
            toggleAlert('동일한 명의나 카카오 계정으로 이미 계정이 생성되어있습니다.');
          } else {
            toggleAlert('가입이 완료되었습니다.');
            toggleSign();
          }
        }
      })
      .catch((response) => { console.log(response); });

    return true;
  };

  @action login = (email) => {
    axios.post('/api/auth/login', { email })
      .then((response) => {
        if (response.data) {
          toast.success(response.data.MESSAGE);
          if (response.data.LOGIN_SUCCESS) {
            this.userData = response.data.token;
            this.cookieCheck();
          }
        }
      })
      .catch((response) => { console.log(response); });

    return true;
  };

  @action logout = (e, text = '😊 로그아웃 완료!') => {
    const { history } = this.root.UtilRouteStore;
    axios.post('/api/auth/logout', {})
      .then((response) => {
        if (response.data.type === 'LOGOUT') {
          toast.success(text);
          this.cookieCheck();
          if (history.location.pathname !== '/') {
            history.push('/');
          }
        }
      })
      .catch((response) => { console.log(response); });

    return true;
  };

  @action cookieCheck = () => {
    axios.get('/api/auth/check', {})
      .then((response) => {
        if (response.data.success) {
          this.userData = response.data.info;
        } else {
          this.userData = null;
        }
      })
      .catch((err) => { console.log(err); });

    return true;
  };


  @action onRegisterChangeValue = (event) => {
    console.log(event.target.name);
    this.registerData = {
      ...this.registerData,
      [event.target.name]: event.target.value,
    };
  };

  registerValidationCheck = () => {
    const { toggleAlert } = this.root.UtilAlertStore;

    // name
    if (!this.registerData.name) {
      toggleAlert('이름을 입력해주세요.');
      return false;
    }

    // nickname
    if (!this.registerData.nickname) {
      toggleAlert('닉네임을 입력해주세요.');
      return false;
    }

    // tel
    if (!this.registerData.tel || Number.isNaN(this.registerData.tel)) {
      toggleAlert('전화번호 형식을 맞추어서 입력해주세요.');
      return false;
    }

    // birth
    if (!this.registerData.birth) {
      toggleAlert('생년월일을 입력해주세요.');
      return false;
    }

    if (this.registerData.birth.substring(0, 4) === '1000') {
      toggleAlert('생년월일을 제대로 입력해주세요.');
      return false;
    }

    // gender
    if (!this.registerData.gender) {
      toggleAlert('성별을 입력해주세요.');
      return false;
    }

    // gtNickname
    if (!this.registerData.gtNickname) {
      toggleAlert('그로우토피아 닉네임을 입력해주세요.');
      return false;
    }

    return true;
  };

  @action withdrawal = () => {
    const { userData, logout } = this;
    const { history } = this.root.UtilRouteStore;

    if (userData) {
      axios.delete('/api/user/withdrawal', {
        data: {
          userId: userData.id,
        },
      })
        .then((response) => {
          if (response.data) {
            logout({}, '성공적으로 탈퇴되었습니다.\n30일 이후에 재가입이 가능합니다.\n감사합니다.');
            history.push('/');
          }
        })
        .catch((response) => { console.log(response); });
    }
  };

  @action updateInfo = () => {
    const {
      nickname, birth, gender, profileYN,
    } = this.root.ComponentMyAccountStore;
    const { userData } = this;
    const { toggleAlert } = this.root.UtilAlertStore;
    const { history } = this.root.UtilRouteStore;

    axios.put('/api/user/info', {
      nickname,
      birth,
      gender,
      profileYN,
      userId: userData.id,
    })
      .then((response) => {
        if (response) {
          toggleAlert('성공적으로 변경되었습니다.\n다시 로그인해주세요.');
          history.push('/');
          this.logout();
        }
      })
      .catch((response) => console.log(response));
  }

  @action getLately = () => {
    axios.get('/api/user/lately')
      .then((response) => {
        const { data } = response;
        this.root.ComponentHeaderStore.latelyList = data;
      })
      .catch((response) => console.log(response));
  }
}

export default UserStore;
