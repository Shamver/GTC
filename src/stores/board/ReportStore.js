import { observable, action } from 'mobx';
import axios from 'axios';
import {toast} from "react-toastify";

class ReportStore {
  @observable reportToggle;

  @observable reportData = {
    content: '',
    writer: '',
    reason: '',
    reasonDetail: '',
  };

  constructor(root) {
    this.root = root;
  }

  @action report = () => {
    if (!this.ReportValidationCheck()) {
      return false;
    }

    axios.post('/api/board/report', {
      id: postId,
      uId: this.root.UserStore.userData.id,
      type: isRecommend ? 'R01' : 'R02',
    })
      .then((response) => {
        if (response.data === 1) {
          toast.success('😳 해당 포스팅 투표 완료!');
        } else if (response.data === 2) {
          toast.error('😳 이미 해당 포스팅에 투표가 완료되었어요!');
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

  @action toggleReport = (bpId, content, writer) => {
    if (bpId) {
      this.reportData = {
        content,
        writer,
      };
    }

    this.reportToggle = !this.reportToggle;
  }
}

export default ReportStore;
