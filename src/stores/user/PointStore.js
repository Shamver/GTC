import { observable, action } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class PointStore {
  @observable pointList = [];

  @observable totalPoint = 0;

  @observable currentPointMaxPage = 0;

  constructor(root) {
    this.root = root;
  }

  @action getPoint = ((currentPage) => {
    const { userData } = this.root.UserStore;

    if (userData) {
      axios.get('/api/user/point', {
        params: {
          userId: userData.id,
          currentPage,
        },
      })
        .then((response) => {
          const { data } = response;
          if (data.success) {
            if (data.code === 1) {
              this.pointList = data.result;
              if (data.result.length === 0) {
                this.currentPointMaxPage = 0;
              } else {
                const { pageCount } = data.result[0];
                this.currentPointMaxPage = pageCount;
              }
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
    } else {
      this.pointList = [];
    }
  });

  @action getTotalPointData = (() => {
    const { userData } = this.root.UserStore;

    if (userData) {
      axios.get('/api/user/point/sum', {
        params: {
          userId: userData.id,
        },
      })
        .then((response) => {
          const { data } = response;
          if (data.success) {
            if (data.code === 1) {
              this.totalPoint = data.result;
            } else {
              toast.info(data.message);
            }
          } else {
            this.totalPoint = 0;
            toast.error(data.message);
          }
        })
        .catch((response) => {
          console.log(response);
        });
    } else {
      this.totalPoint = 0;
    }
  });
}

export default PointStore;
