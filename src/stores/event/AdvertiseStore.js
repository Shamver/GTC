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
        if (data.SUCCESS) {
          if (data.CODE === 0) {
            toast.success(data.MESSAGE);
            this.getAdPostList();
          } else {
            toast.info(data.MESSAGE);
          }
        } else {
          toast.error(data.MESSAGE);
        }
      })
      .catch((response) => toast.error(response.message));
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
      .catch((response) => toast.error(response.message));
  };

  @action onChangeAdvertise = (event) => {
    this.AdvertisePost = {
      ...this.AdvertisePost,
      [event.target.name]: event.target.value,
    };
  }
}

export default AdvertiseStore;
