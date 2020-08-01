import { action, observable } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class BoardStore {
  @observable isAddBoard = false;

  constructor(root) {
    this.root = root;
  }

  @action setIsAddBoard = (flag) => {
    this.isAddBoard = flag;
  }
}

export default BoardStore;
