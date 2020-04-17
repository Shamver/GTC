import { observable, action } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class AdvertiseStore {
  @observable AdvertisePostList = [];

  @observable advertisePost = {
    message: '',
    url: '',
    hours: 1,
  };

  constructor(root) {
    this.root = root;
  }

  @action AddAdPostList = () => {
    if (!this.advertiseValidationCheck()) {
      return false;
    }

    const { userData } = this.root.UserStore;
    axios.post('/api/event/advertise', {
      ...this.advertisePost,
      userId: userData.id,
    })
      .then((response) => {
        const { data } = response;
        if (data.SUCCESS) {
          if (data.CODE === 0) {
            toast.success(data.MESSAGE);
            this.getAdPostList();
            this.advertisePost = {
              message: '',
              url: '',
              hours: 1,
            };
          } else {
            toast.info(data.MESSAGE);
          }
        } else {
          toast.error(data.MESSAGE);
        }
      })
      .catch((response) => console.log(response));

    return false;
  };

  @action getAdPostList = () => {
    axios.get('/api/event/advertise')
      .then((response) => {
        const { data } = response;
        if (data.SUCCESS) {
          if (data.CODE === 0) {
            this.AdvertisePostList = data.rows;
          } else {
            toast.info(data.MESSAGE);
          }
        } else {
          toast.error(data.MESSAGE);
        }
      })
      .catch((response) => console.log(response));
  };

  @action onChangeAdvertise = (event) => {
    this.advertisePost = {
      ...this.advertisePost,
      [event.target.name]: event.target.value,
    };
  };

  advertiseValidationCheck = () => {
    const { toggleAlert } = this.root.UtilAlertStore;

    // message
    if (!this.advertisePost.message.trim()) {
      toggleAlert('하고 싶은 말을 1자 이상 입력해주세요.');
      return false;
    }

    // url
    if (!this.advertisePost.url.trim()) {
      toggleAlert('링크를 입력해주세요.');
      return false;
    }

    // hours
    if (Number.isNaN(this.advertisePost.hours) || !this.advertisePost.hours.trim()) {
      toggleAlert('광고 시간이 숫자형태로 입력이 되지않았거나, 입력되지 않았습니다.');
      return false;
    }
    return true;
  };
}

export default AdvertiseStore;
