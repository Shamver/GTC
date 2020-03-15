import { action, observable } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class CodeStore {
  @observable codeGroupList = [];

  @observable codeList = [];

  @observable isAddCodeGroup = false;

  @observable isAddCode = false;

  @observable groupEditModeId;

  @observable codeEditModeId;


  @observable codeGroup = {
    id: '',
    name: '',
    desc: '',
  };

  constructor(root) {
    this.root = root;
  }

  @action addCodeGroup = () => {
    if (!this.codeGroupValidationCheck()) {
      return false;
    }

    axios.post('/api/system/code/group', this.codeGroup)
      .then((response) => {
        if (response.data) {
          this.codeGroup = {
            id: '',
            name: '',
            desc: '',
          };
          this.getCodeGroupList();
          this.setIsAddCodeGroup(false);
          toast.success('😳 코드 그룹 추가 완료!');
        }
      })
      .catch((response) => {
        console.log(response);
      });

    return true;
  };

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

  @action modifyCodeGroup = () => {
    axios.put('/api/system/code/group', this.codeGroup)
      .then((response) => {
        if (response.data) {
          this.codeGroup = {
            id: '',
            name: '',
            desc: '',
          };
          this.getCodeGroupList();
          this.setIsAddCodeGroup(false);
          toast.success('😳 코드 그룹 수정 완료!');
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
    this.groupEditModeId = null;
  };

  @action setIsAddCode = (value) => {
    this.isAddCode = value;
  };

  @action setGroupEditModeId = (value) => {
    this.groupEditModeId = value.id;
    this.isAddCodeGroup = false;
    this.codeGroup = value;
  };


  @action onChangeCodeGroup = (event) => {
    this.codeGroup = {
      ...this.codeGroup,
      [event.target.name]: event.target.value,
    };
  };

  @action codeGroupValidationCheck = () => {
    const { toggleAlert } = this.root.UtilAlertStore;

    if (!this.codeGroup.id) {
      toggleAlert('코드 그룹을 입력하여 주세요.');
      return false;
    }

    if (!this.codeGroup.name) {
      toggleAlert('코드 그룹명을 입력하여 주세요.');
      return false;
    }

    return true;
  }
}

export default CodeStore;
