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
    console.log('로딩 시작');
    this.loading = true;
  }

  @action stopLoading = () => {
    setTimeout(() => {
      console.log('로딩 끝!');
      this.loading = false;
    }, 1);
  }
}

export default LoadingStore;
