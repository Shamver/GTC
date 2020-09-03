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
        toast.error(response.message);
      });
  };

  @action getDailyLast = async () => {
    const { userData } = this.root.UserStore;
    const userDataId = userData === null ? '' : userData.id;

    await axios.get('/api/event/daily/last', {
      params: {
        userId: userDataId,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.dailyLast = {
              ...data.result[0],
            };
          } else if (data.code === 2) {
            this.dailyLast = '';
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => toast.error(response.message));

    return true;
  };

  @action addDaily = (() => {
    const { userData, cookieCheck } = this.root.UserStore;

    if (!this.message.trim()) {
      toast.error('메세지를 입력해주세요.');
      return false;
    }

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
              this.getDailyLast().then();
              this.getDailyList().then();
              cookieCheck();
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
          toast.error(response.message);
        });
    }

    return true;
  });

  @action onChangeValue = ((e) => {
    this.message = e.target.value;
  });
}

export default DailyStore;
