import { observable, action } from 'mobx';

class LoadingStore {
  @observable loading;

  constructor(root) {
    this.root = root;
  }

  @action loadingProcess = async (ActionArr) => {
    this.loading = 1;
    console.log('로딩 시작');
    for (let i = 0; i < ActionArr.length; i += 1) {
      await ActionArr[i]();
    }
    console.log('로딩 끝');
    this.loading = 0;
  };

  @action startLoading = () => {
    this.loading = 1;
  }

  @action stopLoading = () => {
    this.loading = 0;
  }
}

export default LoadingStore;
