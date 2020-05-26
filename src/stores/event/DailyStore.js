import { observable, action } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class DailyStore {
  @observable message = '';

  @observable dailyList = [];

  @observable dailyLast = '';

  constructor(root) {
    this.root = root;
  }

  @action getDailyList = async () => {
    await axios.get('/api/event/daily')
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.dailyList = data.result;
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => {
        console.log(response);
      });
  };

  @action getDailyLast = async () => {
    const { userData } = this.root.UserStore;
    await axios.get('/api/event/daily/last', {
      params: {
        userId: userData.id,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.dailyLast = {
              ...data.result[0],
            };
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => console.log(response));

    return true;
  };

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
          if (data.success) {
            if (data.code === 1) {
              this.getDailyLast();
              this.getDailyList();
              this.message = '';
              toast.success(data.message);
            } else {
              toast.info(data.message);
            }
          } else {
            toast.error(data.message);
          }
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
