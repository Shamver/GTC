import { observable, action } from 'mobx';

class ReportStore {
  @observable reportToggle;

  constructor(root) {
    this.root = root;
  }

  @action toggleReport = () => {
    this.reportToggle = !this.reportToggle;
  }
}

export default ReportStore;