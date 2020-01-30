import { observable, action } from 'mobx';

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

  @action onChangeValue = (event) => {
    this.reportData = {
      ...this.reportData,
      [event.target.name]: event.target.value,
    };
  };

  @action toggleReport = () => {
    this.reportToggle = !this.reportToggle;
  }
}

export default ReportStore;
