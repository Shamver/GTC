import { observable, action } from 'mobx';

class HomeStore {
  @observable home = {
    title: 'TITLE',
    text: 'TEXT',
  };

  @action onChangeText = (valText) => {
    const { home } = this;

    home.text = valText;

    this.home.text = home.text;
  };
}

export default new HomeStore();
