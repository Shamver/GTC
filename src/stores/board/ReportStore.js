import { observable, action } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class ReportStore {
  @observable reportToggle;

  @observable reportData = {
    targetId: '',
    type: '',
    content: '',
    writer: '',
    reason: '',
    description: '',
  };

  constructor(root) {
    this.root = root;
  }

  @action report = () => {
    if (!this.ReportValidationCheck()) {
      return false;
    }
    axios.post('/api/board/report', {
      ...this.reportData,
      writerId: this.root.UserStore.userData.id,
    })
      .then((response) => {
        const { data } = response;
        if (data.SUCCESS) {
          if (data.CODE === 1) {
            toast.success(data.MESSAGE);
            this.toggleReport();
          } else {
            toast.info(data.MESSAGE);
          }
        } else {
          toast.error(data.MESSAGE);
        }
      })
      .catch((response) => { console.log(response); });

    return true;
  };

  ReportValidationCheck = () => {
    const { toggleAlert } = this.root.UtilAlertStore;

    // board
    if (!this.reportData.reason) {
      toggleAlert('신고 사유를 선택해주세요.');
      return false;
    }
    return true;
  };


  @action onChangeValue = (event) => {
    this.reportData = {
      ...this.reportData,
      [event.target.name]: event.target.value,
    };
  };

  @action toggleReport = (targetId, type, content, writer) => {
    if (targetId) {
      this.reportData = {
        targetId,
        type,
        content,
        writer,
        description: '',
      };
    }

    this.reportToggle = !this.reportToggle;
  }
}

export default ReportStore;
