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

  @observable banUserList = [];

  @observable cookieChecked = false;

  @observable profileData = {
    profileInfo: {},
    profilePostData: [],
    profileCommentData: [],
    profileNicknameHistory: [],
  };

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
    const { toggleSign } = this.root.UtilStore;

    axios.post('/api/auth/register', this.registerData)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
            toggleSign();
          } else {
            toast.error(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });

    return true;
  };

  @action login = (email) => {
    const { toggleAlert } = this.root.UtilAlertStore;

    axios.post('/api/auth/login', { email })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
            this.cookieCheck();
          } else if (data.code === 2) {
            toggleAlert(`해당 계정은 ${data.message}의 사유로 영구 정지 처리 되었습니다. 자세한 사항은 운영자에게 문의하세요.`);
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });

    return true;
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
      .catch((response) => { toast.error(response.message); });

    return true;
  };

  // 예외로 async, await이 필요 없음
  @action cookieCheck = () => {
    axios.get('/api/auth/check')
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.userData = data.result;
          } else {
            this.userData = null;
          }
          this.cookieChecked = true;
        } else {
          // 통신실패시
          this.userData = null;
        }
      })
      .catch((response) => {
        toast.error(response.message);
      });
    return true;
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
    // name
    if (!this.registerData.name) {
      toast.error('이름을 입력해주세요.');
      return false;
    }

    // nickname
    if (!this.registerData.nickname) {
      toast.error('닉네임을 입력해주세요.');
      return false;
    }

    // tel
    if (!this.registerData.tel || Number.isNaN(this.registerData.tel)) {
      toast.error('전화번호 형식을 맞추어서 입력해주세요.');
      return false;
    }

    // birth
    if (!this.registerData.birth) {
      toast.error('생년월일을 입력해주세요.');
      return false;
    }

    if (this.registerData.birth.substring(0, 4) === '1000') {
      toast.error('생년월일을 제대로 입력해주세요.');
      return false;
    }

    // gender
    if (!this.registerData.gender) {
      toast.error('성별을 입력해주세요.');
      return false;
    }

    // gtNickname
    if (!this.registerData.gtNickname) {
      toast.error('그로우토피아 닉네임을 입력해주세요.');
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
        .catch((response) => { toast.error(response.message); });
    }
  };

  @action updateInfo = () => {
    const {
      nickname, birth, gender, profileYN, uploadImage, gtName, prevGtNickname,
    } = this.root.ComponentMyAccountStore;
    const { userData } = this;
    const { history } = this.root.UtilRouteStore;

    const formData = new FormData();

    formData.append('nickname', nickname.trim());
    formData.append('prevGtNickname', prevGtNickname.trim());
    formData.append('birth', birth);
    formData.append('gender', gender);
    formData.append('profileYN', profileYN);
    formData.append('userId', userData.id);
    formData.append('gtNickname', gtName);

    if (uploadImage !== '') formData.append('images', uploadImage);

    axios.put('/api/user/info', formData)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success('성공적으로 변경되었습니다.\n다시 로그인해주세요.');
            history.push('/');
            this.logout();
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => toast.error(response.message));
  };

  @action getIsCanChangeGtNickname = () => {
    const { userData } = this;
    const { id } = userData;

    const { setIsCanChangeGtNickname } = this.root.ComponentMyAccountStore;

    axios.get(`/api/user/gtnickname/${id}`)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            setIsCanChangeGtNickname(data.result.isCanChange);
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => toast.error(response.message));
  }

  @action getProfile = (writerId) => {
    const that = this;
    const { pageIndex } = this.root.UtilStore;
    const { postIndex, commentIndex, nickNameIndex } = pageIndex;

    axios.get(`/api/user/profile/${writerId}`, { params: { writerId } })
      .then((response) => {
        const { data } = response;

        if (data.success) {
          if (data.code === 1) {
            this.profileData = {
              ...this.profileData,
              profileInfo: data.result,
            };
          } else {
            toast.error(data.message);
          }
        } else {
          toast.error(data.message);
        }
      }).then(() => {
        const postPromise = this.getPostList(postIndex);
        const commentPromise = this.getCommentList(commentIndex);
        const nickNamePromise = this.getNickNameList(nickNameIndex);

        Promise.all([postPromise, commentPromise, nickNamePromise]).then(() => {
          that.root.UtilStore.profileToggle = !that.root.UtilStore.profileToggle;
        });
      })
      .catch((response) => { toast.error(response.message); });
  }

  @action getPostList = async (index) => {
    const writerId = this.profileData.profileInfo.userId;
    this.root.UtilStore.pageIndex = {
      ...this.root.UtilStore.pageIndex,
      postIndex: index,
    };

    await axios.get(`/api/user/profile/${writerId}/post/${index}`, { params: { writerId, index } })
      .then((response) => {
        const { data } = response;

        if (data.success) {
          if (data.code === 1) {
            this.profileData = {
              ...this.profileData,
              profilePostData: data.result,
            };

            if (data.result[0]) {
              const { rowCount } = data.result[0];
              this.root.UtilStore.rows = {
                ...this.root.UtilStore.rows,
                postRows: rowCount,
              };
            } else {
              this.root.UtilStore.rows = {
                ...this.root.UtilStore.rows,
                postRows: 0,
              };
            }
          } else {
            toast.error(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });
  }

  @action getCommentList = async (index) => {
    const writerId = this.profileData.profileInfo.userId;
    this.root.UtilStore.pageIndex = {
      ...this.root.UtilStore.pageIndex,
      commentIndex: index,
    };

    await axios.get(`/api/user/profile/${writerId}/comment/${index}`, { params: { writerId, index } })
      .then((response) => {
        const { data } = response;

        if (data.success) {
          if (data.code === 1) {
            this.profileData = {
              ...this.profileData,
              profileCommentData: data.result,
            };

            if (data.result[0]) {
              const { rowCount } = data.result[0];
              this.root.UtilStore.rows = {
                ...this.root.UtilStore.rows,
                commentRows: rowCount,
              };
            } else {
              this.root.UtilStore.rows = {
                ...this.root.UtilStore.rows,
                commentRows: 0,
              };
            }
          } else {
            toast.error(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });
  }

  @action getNickNameList = async (index) => {
    const writerId = this.profileData.profileInfo.userId;
    this.root.UtilStore.pageIndex = {
      ...this.root.UtilStore.pageIndex,
      nickNameIndex: index,
    };

    await axios.get(`/api/user/profile/${writerId}/gtnickname/${index}`, { params: { writerId, index } })
      .then((response) => {
        const { data } = response;

        if (data.success) {
          if (data.code === 1) {
            this.profileData = {
              ...this.profileData,
              profileNicknameHistory: data.result,
            };

            if (data.result[0]) {
              const { rowCount } = data.result[0];
              this.root.UtilStore.rows = {
                ...this.root.UtilStore.rows,
                nickNameRows: rowCount,
              };
            } else {
              this.root.UtilStore.rows = {
                ...this.root.UtilStore.rows,
                nickNameRows: 0,
              };
            }
          } else {
            toast.error(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });
  }

  @action getUserBanned = async () => {
    axios.get('/api/user/banned')
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.banUserList = data.result;
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });

    return true;
  };

  @action userBanned = async (reportId, targetUserId, actionFlag, reason) => {
    console.log(actionFlag)
    axios.put('/api/user/banned', {
      reportId, targetUserId, actionFlag, reason,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
            if (actionFlag === 'BAN') {
              this.root.BoardReportStore.toggleDetailReport();
            }
            this.root.BoardReportStore.getReportList();
            this.getUserBanned();
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });

    return true;
  };
}

export default UserStore;
