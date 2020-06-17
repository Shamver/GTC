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

  @observable code = {
    id: '',
    group: '',
    name: '',
    order: '',
    desc: '',
    useYN: 1,
  };

  @observable setCodeList = [];

  constructor(root) {
    this.root = root;
  }

  @action addCodeGroup = () => {
    if (!this.codeGroupValidationCheck()) {
      return false;
    }

    axios.post('/api/system/code/group', this.codeGroup)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.codeGroup = {
            id: '',
            name: '',
            desc: '',
          };
          this.getCodeGroupList().then();
          this.setIsAddCodeGroup(false);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => {
        toast.error(response.message);
      });

    return true;
  };

  @action getCodeGroupList = async () => {
    await axios.get('/api/system/code/group')
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.codeGroupList = data.result;
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => {
        toast.error(response.message);
      });
  };

  @action modifyCodeGroup = () => {
    if (!this.codeGroupValidationCheck()) {
      return false;
    }
    axios.put('/api/system/code/group', this.codeGroup)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.codeGroup = {
            id: '',
            name: '',
            desc: '',
          };
          this.getCodeGroupList().then();
          this.setIsAddCodeGroup(false);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => {
        toast.error(response.message);
      });

    return true;
  };

  @action deleteCodeGroup = (group) => {
    axios.delete('/api/system/code/group', {
      params: {
        group,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.codeGroup = {
            id: '',
            name: '',
            desc: '',
          };
          this.getCodeGroupList().then();
          this.getCodeList('');
          this.setIsAddCodeGroup(false);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => {
        toast.error(response.message);
      });

    return true;
  };

  // Code Start ------------------------------------------------------

  @action addCode = () => {
    if (!this.codeValidationCheck()) {
      return false;
    }

    axios.post('/api/system/code/', this.code)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.code = {
            ...this.code,
            id: '',
            name: '',
            order: '',
            desc: '',
            useYN: 1,
          };
          this.getCodeGroupList().then();
          this.getCodeList(this.code.group);
          this.setIsAddCodeGroup(false);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => {
        toast.error(response.message);
      });

    return true;
  };

  @action getCodeList = (codeGroup) => {
    axios.get('/api/system/code', {
      params: {
        codeGroup,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.codeList = data.result;
          this.code.group = codeGroup;
          this.setIsAddCode(false);
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => {
        toast.error(response.message);
      });
  };

  @action modifyCode = () => {
    if (!this.codeValidationCheck()) {
      return false;
    }

    axios.put('/api/system/code', this.code)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.getCodeGroupList().then();
          this.getCodeList(this.code.group);
          this.setIsAddCode(false);
          toast.success(data.message);
          this.code = {
            ...this.code,
            id: '',
            name: '',
            order: '',
            desc: '',
            useYN: 1,
          };
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => {
        toast.error(response.message);
      });

    return true;
  };

  @action deleteCode = (group, code) => {
    axios.delete('/api/system/code', {
      params: {
        group,
        code,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.code = {
            ...this.code,
            id: '',
            name: '',
            order: '',
            desc: '',
            useYN: 1,
          };
          this.getCodeGroupList().then();
          this.getCodeList(this.code.group);
          this.setIsAddCodeGroup(false);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => {
        toast.error(response.message);
      });

    return true;
  };

  // Other Start ------------------------------------------------------

  @action setIsAddCodeGroup = (value) => {
    this.isAddCodeGroup = value;
    this.groupEditModeId = null;
  };

  @action setIsAddCode = (value) => {
    if (value && !this.code.group) {
      toast.warn('😳 코드그룹을 선택한 뒤에 코드 추가를 해보실 수 있어요!');
      return false;
    }
    this.isAddCode = value;
    this.codeEditModeId = null;

    return true;
  };

  @action setGroupEditModeId = (value) => {
    this.groupEditModeId = value.id;
    this.isAddCodeGroup = false;
    this.codeGroup = value;
  };

  @action setCodeEditModeId = (value) => {
    this.codeEditModeId = value.id;
    this.isAddCode = false;
    this.code = value;
  };

  @action onChangeCodeGroup = (event) => {
    this.codeGroup = {
      ...this.codeGroup,
      [event.target.name]: event.target.value,
    };
  };

  @action onChangeCode = (event) => {
    this.code = {
      ...this.code,
      [event.target.name]: event.target.value,
    };
  };

  @action codeGroupValidationCheck = () => {
    if (!this.codeGroup.id.trim()) {
      toast.error('코드 그룹을 입력하여 주세요.');
      return false;
    }

    if (!this.codeGroup.name.trim()) {
      toast.error('코드 그룹명을 입력하여 주세요.');
      return false;
    }

    return true;
  };


  @action codeValidationCheck = () => {
    if (!this.code.id.trim()) {
      toast.error('코드를 입력하여 주세요.');
      return false;
    }

    if (!this.code.name.trim()) {
      toast.error('코드명을 입력하여 주세요.');
      return false;
    }

    if (!this.code.order.trim() || Number.isNaN(Number(this.code.order.trim()))) {
      toast.error('순서를 입력하지 않았거나 숫자형태가 아닙니다.');
      return false;
    }

    return true;
  }

  @action getCodeComponent = (getCodeGroup, temp) => {
    axios.get('/api/system/code/temp', {
      params: {
        getCodeGroup, temp,
      },
    })
      .then((response) => {
        if (response.data) {
          this.setCodeList = response.data;
          const zero = {
            CODE: '',
            CODEGROUP_ID: '',
            CRT_DTTM: '',
            DESC: '',
            NAME: '선택',
            ORDER: 0,
            USE_FL: 1,
          };

          const tempa = response.data;
          tempa.slice(0, 1, zero);
          console.log(tempa);
        }
      })
      .catch((response) => {
        toast.error(response.message);
      });
  };
}

export default CodeStore;
