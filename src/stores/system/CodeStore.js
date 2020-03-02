import { action, observable } from 'mobx';
import axios from 'axios';

class CodeStore {
  @observable codeGroupList = [];

  constructor(root) {
    this.root = root;
  }

  @action getGroupCodeList = () => {
    axios.get('/api/system/code')
      .then((response) => {
        if (response.data) {
          this.codeGroupList = response.data;
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
}

export default CodeStore;
