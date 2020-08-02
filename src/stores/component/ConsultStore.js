import { action } from 'mobx';

class ConsultStore {
  constructor(root) {
    this.root = root;
  }

  @action onClick = ((e) => {
    const { name } = e.target;
    const { history } = this.root.UtilRouteStore;

    history.push(`/consult/${name}/page/1`);
  });

  @action setTab = ((v, to = null) => {
    if (to) {
      this.root.UserMailStore.mailForm = {
        ...this.root.UserMailStore.mailForm,
        mailTo: to,
      };
    }
    this.activeTab = v;
  });
}

export default ConsultStore;
