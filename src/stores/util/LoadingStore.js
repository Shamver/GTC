import { observable, action } from 'mobx';

class LoadingStore {
  @observable loading;

  constructor(root) {
    this.root = root;
  }

  @action doLoading = () => {
    this.loading = 1;
    console.log('로딩 시작!');
    setTimeout(() => {
      this.loading = 0;
    }, 0);
  };

  @action startLoading = () => {
    this.loading = 1;
  }

  @action stopLoading = () => {
    this.loading = 0;
  }
}

export default LoadingStore;
