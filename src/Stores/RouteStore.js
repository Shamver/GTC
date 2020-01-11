import { observable, action } from 'mobx';

class RouteStore {
  @observable history = {};

  constructor(root) {
    this.root = root;
  }

  @action setRoute = (history) => {
    this.history = history;
  }
}

export default RouteStore;
