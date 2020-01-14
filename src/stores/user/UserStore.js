import { observable, action } from 'mobx';
import axios from 'axios';

class UserStore {
  @observable withdrawalIsChecked = false;

  constructor(root) {
    this.root = root;
  }

  @action withdrawal = (() => {
    const { userData, logout } = this.root.UserStore;
    const { history } = this.root.RouteStore;

    if (userData !== undefined) {
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
  });

  @action onClickWithdrawal = (() => {
    this.withdrawalIsChecked = !this.withdrawalIsChecked;
  })

  @action isCheckedWithdrawal = ((next) => {
    if (this.withdrawalIsChecked) {
      next();
    } else {
      this.root.UtilStore.toggleAlert('내용 확인란에 체크를 해주셔야 합니다.');
    }
  });
}

export default UserStore;
