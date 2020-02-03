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
        if (typeof data === typeof this.latelyList) {
          this.latelyList = data;
        } else {
          this.latelyList = [];
        }
      })
      .catch((response) => console.log(response));
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
        this.getLately();

        toast.success(data.MESSAGE);
      })
      .catch((response) => console.log(response));
  };
}

export default LatelyStore;
