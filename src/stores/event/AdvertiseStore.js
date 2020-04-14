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

  @action getAdPostList = () => {
    axios.get('/api/event/advertise')
      .then((response) => {
        const { data } = response;
        if (data.SUCCESS) {
          if (data.CODE === 0) {
            this.AdvertisePostList = data.rows;
            console.log(data.rows);
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
    this.AdvertisePost = {
      ...this.AdvertisePost,
      [event.target.name]: event.target.value,
    };
  }
}

export default AdvertiseStore;
