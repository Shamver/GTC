import { observable, action } from 'mobx';
import axios from 'axios';

class DailyStore {
  @observable message = '';

  @observable dailyList = [];

  constructor(root) {
    this.root = root;
  }

  @action getDailyList = (() => {
    axios.get('/api/event/daily')
      .then((response) => {
        if (response.data) {
          this.dailyList = response.data;
        }
      })
      .catch((response) => {
        console.log(response);
      });
  });

  @action addDaily = (() => {
    const { userData } = this.root.UserStore;

    if (userData) {
      axios.post('/api/event/daily', {
        params: {
          userId: userData.id,
          message: this.message,
        },
      })
        .then((response) => {
          const { data } = response;
          console.log(data);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  });

  @action onChangeValue = ((e) => {
    this.message = e.target.value;
  });
}

export default DailyStore;
