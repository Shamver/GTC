import { action, observable } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class BoardStore {
  @observable board = {
    id: '',
    name: '',
    path: '',
    order: '',
    useFl: 1,
    permissionLevel: '',
    desc: '',
  };

  @observable boardList = [];

  @observable permissionLevelList = [];

  @observable useFlagList = [];

  @observable isBoardAddToggle = false;

  constructor(root) {
    this.root = root;
  }

  @action addBoard = () => {
    if (!this.boardValidationCheck()) {
      return false;
    }

    axios.post('/api/system/board', this.board)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
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

  @action getBoard = () => {
    axios.get('/api/system/board')
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.boardList = data.result;
            console.log(data.result);
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

  @action boardValidationCheck = () => {
    // id
    if (!this.board.id.trim()) {
      toast.error('게시판을 입력해주세요.');
      return false;
    }

    // name
    if (!this.board.name.trim()) {
      toast.error('이름을 입력해주세요.');
      return false;
    }

    // path
    if (!this.board.path.trim()) {
      toast.error('경로를 입력해주세요.');
      return false;
    }

    // order
    if (!this.board.order.trim()) {
      toast.error('순서를 제대로 입력해주세요.');
      return false;
    }

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
