import { action, observable } from 'mobx';
import history from '../history';

class CategoryStore {
  @observable category = {
    active: history.location,
  };

  @action onActive = (target) => {
    this.category = {
      ...this.category,
      active: target,
    };
    history.push(target);
  };
}

export default new CategoryStore();
