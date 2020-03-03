import { action, observable } from 'mobx';
import axios from 'axios';

class CodeStore {
  @observable codeGroupList = [];

  constructor(root) {
    this.root = root;
  }

  @action getCodeGroupList = () => {
    axios.get('/api/system/code/group')
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          this.codeGroupList = response.data;
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
}

export default CodeStore;
