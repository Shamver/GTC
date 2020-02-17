import { observable, action } from 'mobx';

class LoadingStore {
  @observable loading = 1;

  constructor(root) {
    this.root = root;
  }

  @action doLoading = () => {
    this.loading = 1;
    setTimeout(() => {
      this.loading = 0;
    }, 500);
  };
}

export default LoadingStore;
