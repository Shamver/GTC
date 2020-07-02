import { observable, action } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class ReportStore {
  @observable reportToggle;

  @observable reportDetailToggle;

  @observable reportData = {
    targetId: '',
    type: '',
    content: '',
    writer: '',
    reason: '',
    description: '',
  };

  @observable reportDataList = [];

  @observable reportDetailData = '';

  constructor(root) {
    this.root = root;
  }

  @action report = () => {
    if (!this.ReportValidationCheck()) {
      return false;
    }
    axios.post('/api/board/Report', {
      ...this.reportData,
      writerId: this.root.UserStore.userData.id,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
            this.toggleReport();
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });

    return true;
  };

  ReportValidationCheck = () => {
    // board
    if (!this.reportData.reason) {
      toast.error('신고 사유를 선택해주세요.');
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

  @action toggleDetailReport = () => {
    this.reportDetailToggle = !this.reportDetailToggle;
  }

  @action getDetailReport = async (reportId) => {
    await axios.get('/api/board/Report/detail', {
      params: {
        reportId,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.reportDetailData = data.result;
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .then(() => { this.toggleDetailReport(); })
      .catch((response) => { toast.error(response.message); });

    return true;
  }

  @action getReportList = async () => {
    await axios.get('/api/board/Report')
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.reportDataList = data.result;
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });

    return true;
  };
}

export default ReportStore;
