import { observable, action } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class LatelyStore {
  @observable latelyList = [];

  constructor(root) {
    this.root = root;
  }

  @action getLately = () => {
    axios.get('/api/cookie/lately')
      .then((response) => {
        const { data } = response;
        if (data.SUCCESS) {
          this.latelyList = data.DATA;
        } else {
          this.latelyList = [];
          toast.error(data.MESSAGE);
        }
      })
      .catch((response) => toast.error(response.message));
  };

  @action deleteLately = (e, id) => {
    e.preventDefault();
    axios.delete('/api/cookie/lately', {
      data: {
        id,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.SUCCESS) {
          if (data.CODE === 1) {
            this.getLately();
            toast.success(data.MESSAGE);
          } else {
            toast.info(data.MESSAGE);
          }
        }
      })
      .catch((response) => toast.error(response.message));
  };
}

export default LatelyStore;
