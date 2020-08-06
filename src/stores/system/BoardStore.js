import { action, observable } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class BoardStore {
  @observable board = {
    id: '',
    name: '',
    desc: '',
    path: '',
    order: '',
    useFl: 1,
    permissionLevel: '',
  };

  @observable permissionLevelList = [];

  @observable useFlagList = [];

  @observable isBoardAddToggle = false;

  constructor(root) {
    this.root = root;
  }

  @action addPost = () => {
    if (!this.postValidationCheck()) {
      return false;
    }

    axios.post('/api/board/post', this.board)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.root.UtilRouteStore.goBack();
            toast.success(data.message);
            this.setPostClear();
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

  @action setPermissionLevelList = (value) => {
    this.permissionLevelList = value;
  };

  @action toggleBoardAdd = () => {
    this.isBoardAddToggle = !this.isBoardAddToggle;
  }

  @action setUseFlagList = (value) => {
    this.useFlagList = value;
  }

  @action onChangeBoard = (event) => {
    this.board = {
      ...this.board,
      [event.target.name]: event.target.value,
    };
  };
}

export default BoardStore;
