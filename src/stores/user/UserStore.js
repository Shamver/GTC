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

  @observable sessionAfterComponent;

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
      `이름(실명): <b>${this.registerData.name}</b><br />
      전화번호: <b>${this.registerData.tel}</b><br />
      그로우토피아 닉네임: <b>${this.registerData.gtNickname}</b><br /><br />
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
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toggleAlert(data.message);
            toggleSign();
          } else {
            toggleAlert(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { console.log(response); });

    return true;
  };

  @action login = (email) => {
    axios.post('/api/auth/login', { email })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
            this.cookieCheck();
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { console.log(response); });
  };

  @action logout = (e, text = '😊 로그아웃 완료!') => {
    const { history } = this.root.UtilRouteStore;
    axios.post('/api/auth/logout', {})
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success(text);
            this.cookieCheck();
            if (history.location.pathname !== '/') {
              history.push('/');
            }
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { console.log(response); });

    return true;
  };

  @action cookieCheck = async () => {
    console.log('로그인 체크 통신 시작!');
    await axios.get('/api/auth/check')
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.userData = data.result;
            console.log('로그인 체크 통신 끝');
          } else {
            toast.info(data.message);
          }
        } else {
          this.userData = null;
        }
      })
      .catch((err) => { console.log(err); });
  };

  @action sessionCheck = async () => {
    console.log('session check start!');
    await this.cookieCheck();
    console.log('session check stop!');
    return false;
  };

  @action checkPermission = (level) => {
    // level 0: 사용자, level 1: 운영자, level2: 관리자
    if (level === 0) {
      return this.userData;
    }
    if (level === 1) {
      return (this.userData && this.userData.operatorYN === 1);
    }
    if (level === 2) {
      return (this.userData && this.userData.adminYN === 1);
    }
    return false;
  };

  @action onRegisterChangeValue = (event) => {
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
          const { data } = response;
          if (data.success) {
            if (data.code === 1) {
              logout({}, '성공적으로 탈퇴되었습니다.\n30일 이후에 재가입이 가능합니다.\n감사합니다.');
              history.push('/');
            } else {
              toast.info(data.message);
            }
          } else {
            toast.error(data.message);
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
      nickname: nickname.trim(),
      birth,
      gender,
      profileYN,
      userId: userData.id,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toggleAlert('성공적으로 변경되었습니다.\n다시 로그인해주세요.');
            history.push('/');
            this.logout();
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => console.log(response));
  }
}

export default UserStore;
