import { observable, action } from 'mobx';

class LoadingStore {
  @observable loading;

  constructor(root) {
    this.root = root;
  }

  @action doLoading = () => {
    this.loading = true;
    console.log('로딩 시작!');
    setTimeout(() => {
      this.loading = false;
      console.log('로딩 끝!');
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
