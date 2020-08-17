import { action, observable } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class CategoryStore {
  @observable boardList = [];

  constructor(root) {
    this.root = root;
  }

  @action getBoardList = async () => {
    await axios.get('/api/system/board/all')
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.boardList = data.result;
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });

    return true;
  };
}

export default CategoryStore;
