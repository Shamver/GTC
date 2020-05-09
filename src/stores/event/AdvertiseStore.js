import { observable, action } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class AdvertiseStore {
  @observable AdvertisePostList = [];

  @observable AdvertisePost = {
    message: '',
    url: '',
    hours: 1,
  };

  constructor(root) {
    this.root = root;
  }

  @action AddAdPostList = () => {
    const { userData } = this.root.UserStore;

    axios.post('/api/event/advertise', {
      ...this.AdvertisePost,
      userId: userData.id,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 0) {
            toast.success(data.message);
            this.getAdPostList();
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => console.log(response));
  };

  @action getAdPostList = () => {
    axios.get('/api/event/advertise')
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 0) {
            this.AdvertisePostList = data.result;
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => console.log(response));
  };

  @action onChangeAdvertise = (event) => {
    this.AdvertisePost = {
      ...this.AdvertisePost,
      [event.target.name]: event.target.value,
    };
  }
}

export default AdvertiseStore;
