import { action, observable } from 'mobx';
import axios from 'axios';

class CodeStore {
  @observable codeGroupList = [];

  @observable codeList = [];

  constructor(root) {
    this.root = root;
  }

  @action getCodeGroupList = () => {
    axios.get('/api/system/code/group')
      .then((response) => {
        if (response.data) {
          this.codeGroupList = response.data;
        }
      })
      .catch((response) => {
        console.log(response);
      });
  };

  @action getCodeList = (codeGroup) => {
    axios.get('/api/system/code', {
      params: {
        codeGroup,
      },
    })
      .then((response) => {

        if (response.data) {
          console.log(response.data);
          this.codeList = response.data;
        }
      })
      .catch((response) => {
        console.log(response);
      });
  };
}

export default CodeStore;
