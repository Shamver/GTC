import { action, observable } from 'mobx';
import axios from 'axios';

class CodeStore {
  @observable codeGroupList = [];

  @observable codeList = [];

  @observable isAddCodeGroup = false;

  @observable isAddCode = false;

  constructor(root) {
    this.root = root;
  }

  @action addCodeGroup = () => {
    axios.post('/api/system/code/group')
      .then((response) => {
        if (response.data) {
          this.codeGroupList = response.data;
        }
      })
      .catch((response) => {
        console.log(response);
      });
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
          this.codeList = response.data;
        }
      })
      .catch((response) => {
        console.log(response);
      });
  };

  @action setIsAddCodeGroup = (value) => {
    this.isAddCodeGroup = value;
  };

  @action setIsAddCode = (value) => {
    this.isAddCode = value;
  };
}

export default CodeStore;
