import { observable, action } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class UserStore {
  @observable registerData = {
    email: '',
    name: '',
    nickname: '',
    tel: '',
    birth: {
      year: '',
      month: '',
      day: '',
    },
    gender: '',
    gtNickname: '',
  };

  @observable userData;

  @observable detailBanData = '';

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
    if (userData.has_birthday) {
      const { birthday } = userData;
      this.registerData.birth.month = birthday.substring(0, 1);
      this.registerData.birth.day = birthday.substring(2, 3);
    }
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
            const { suspendBanFl, banTerm } = data.result;
            if (suspendBanFl) {
              toggleAlert(`해당 계정은 <b>${data.message}</b>의 사유로 영구 정지 처리 되었습니다. 자세한 사항은 운영자에게 문의하세요.`);
            } else {
              toggleAlert(`해당 계정은 <b>${data.message}</b>의 사유로 <b>${banTerm}</b> 까지 계정 정지 처리 되었습니다. 자세한 사항은 운영자에게 문의하세요.`);
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

  @action RouterAuthCheck = (level) => {
    // 0: 비회원, 1: 회원(로그인시), 2: 운영자 이상, 3: 관리자급
    const { userData } = this;

    if (level === 0) {
      return true;
    }
    if (level === 1) {
      return userData;
    }
    if (level === 2) {
      return (userData && (userData.operatorYN === 1 || userData.adminYN === 1));
    }
    if (level === 3) {
      return (userData && userData.adminYN === 1);
    }
    return false;
  };

  @action onRegisterChangeValue = (event) => {
    if (event?.target?.name === 'year') {
      this.registerData = {
        ...this.registerData,
        birth: {
          ...this.registerData.birth,
          year: event.target.value
        },
      };
    } else {
      this.registerData = {
        ...this.registerData,
        [event.target.name]: event.target.value,
      };
    }
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
    if (!this.registerData.birth.year) {
      toast.error('생년을 입력해주세요.');
      return false;
    }

    if (this.registerData.birth.year === '') {
      toast.error('생년을 제대로 입력해주세요.');
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

  @action getIsCanChangeGtNickname = async () => {
    const { userData } = this;
    const { id } = userData;

    const { setIsCanChangeGtNickname } = this.root.ComponentMyAccountStore;

    await axios.get(`/api/user/gtnickname/${id}`)
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
  };

  @action getProfile = (writerId) => {
    if (!this.userData) {
      this.guestAuthor();
      return;
    }

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

  @action guestAuthor = (e) => {
    const { history } = this.root.UtilRouteStore;

    if (e) {
      e.preventDefault();
    } else {
      history.push('/');
    }

    toast.error('😳 로그인 후 이용해주세요.');
    return false;
  }

  @action getUserBanned = async (currentPage) => {
    await axios.get('/api/user/ban', {
      params: {
        currentPage,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.banUserList = data.result;
            if (data.result.length === 0) {
              this.root.BoardReportStore.currentReportMaxPage = 0;
            } else {
              const { pageCount } = data.result[0];
              this.root.BoardReportStore.currentReportMaxPage = pageCount;
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

  @action getBanDetail = async (userId) => {
    await axios.get('/api/user/ban/detail', {
      params: {
        userId,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.detailBanData = data.result;
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

  @action userBan = async (reportId, targetUserId, actionType, reason, term) => {
    const managerId = this.userData.id;

    await axios.post('/api/user/ban', {
      reportId, targetUserId, actionType, reason, term, managerId,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
            if (actionType === 'BAN' || actionType === 'BAN2') {
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

  @action userBanCancel = async (userId) => {
    const managerId = this.userData.id;

    await axios.put('/api/user/cancel', {
      userId, managerId,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
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
  }
}

export default UserStore;
