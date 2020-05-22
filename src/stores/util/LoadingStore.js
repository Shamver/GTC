import { observable, action } from 'mobx';

class LoadingStore {
  @observable loading;

  constructor(root) {
    this.root = root;
  }

  @action loadingProcess = async (ActionArr) => {
    this.loading = 1;
    console.log('로딩 시작');
    const promiseArr = [];
    for (let i = 0; i < ActionArr.length; i += 1) {
      promiseArr.push(ActionArr[i]());
    }
    await Promise.all(promiseArr);

    setTimeout(() => {
      this.loading = 0;
      console.log('로딩 긑');
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
