import { observable, action } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class ReportStore {
  @observable activeTab = 'reportTable';

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

  @observable reportDetailData = [];

  @observable reportTakeOnData = {
    takeReason: '',
    banType: '',
    banTerm: '',
  }

  @observable reportCodeList = [];

  constructor(root) {
    this.root = root;
  }

  @action onActive = ((e) => {
    const { name } = e.target;

    if (this.activeTab !== name) {
      this.activeTab = name;
    }
  });

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

  ReportTakeOnValidationCheck = () => {
    if (!this.reportTakeOnData.banType) {
      toast.error('처벌을 선택해주세요.');
      return false;
    }

    if (this.reportTakeOnData.banType === 'BAN2') {
      const banTerm = this.reportTakeOnData.banTerm.split('-');
      const date = new Date();
      const year = date.getFullYear();
      let month = (date.getMonth() + 1);
      let day = date.getDate();

      if (String(day).length < 2) {
        day = `0${day}`;
      }
      if (String(month).length < 2) {
        month = `0${month}`;
      }

      const getDate = String(year) + month + day;
      const getBanTerm = banTerm[0] + banTerm[1] + banTerm[2];

      if (parseInt(getBanTerm, 10) <= parseInt(getDate, 10)) {
        toast.error('정지 기간은 현재 날짜로부터 최소 1일 이상이여야 합니다.');
        return false;
      }

      if (!this.reportTakeOnData.banTerm) {
        toast.error('기간을 선택해주세요.');
        return false;
      }
    }

    return true;
  };

  @action onChangeValue = (event) => {
    this.reportData = {
      ...this.reportData,
      [event.target.name]: event.target.value,
    };
  };

  @action onChangeDetailValue = (event) => {
    this.reportTakeOnData = {
      ...this.reportTakeOnData,
      [event.target.name]: event.target.value,
    };
  };

  @action setCodeList = (code) => {
    this.reportCodeList = code;
  }

  @action toggleReport = (targetId, type, content, writer) => {
    this.root.SystemCodeStore.getCodeComponent('REPORT_CATEGORY', this.setCodeList);
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
        const { result } = data;
        if (data.success) {
          if (data.code === 1) {
            this.reportDetailData = result;
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
    await axios.get('/api/board/Report', {
      params: {
        tab: this.activeTab,
      },
    })
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

  @action reportTakeOn = (type) => {
    const { reportId, targetUserId, reason } = this.reportDetailData;
    const { takeReason, banTerm } = this.reportTakeOnData;
    if (!this.ReportTakeOnValidationCheck()) {
      return false;
    }

    this.root.UserStore.userBan(reportId, targetUserId, type, takeReason || reason, banTerm);

    return true;
  };

  @action reportReject = async (reportId) => {
    axios.put('/api/board/Report/reject', {
      reportId,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
            this.toggleDetailReport();
            this.getReportList();
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
