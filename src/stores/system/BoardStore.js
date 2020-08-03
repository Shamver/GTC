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

  @observable useFlagList = [];

  @observable isBoardAddToggle = false;

  constructor(root) {
    this.root = root;
  }

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
