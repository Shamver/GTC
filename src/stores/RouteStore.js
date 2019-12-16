import { observable, action } from 'mobx';

class RouteStore {
  @observable history = {};

  @action setRoute = (history) => {
    this.history = history;
  }
}

export default new RouteStore();
