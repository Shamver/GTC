import { observable, action } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class MailStore {
  @observable mailList = [];

  @observable mailForm = {
    mailTo: '',
    mailText: '',
  };

  constructor(root) {
    this.root = root;
  }

  @action getMail = () => {

  };

  @action onChangeValue = ((e) => {
    this.mailForm[e.target.name] = e.target.value;
  });

  @action sendMail = () => {
    const { userData } = this.root.UserStore;
    const { toggleAlert } = this.root.UtilAlertStore;
    const { mailTo, mailText } = this.mailForm;

    if (!mailTo.trim() || !mailText) {
      toggleAlert('공란이 있으므로 실패하였습니다.');
      return;
    }

    axios.post('/api/user/mail', {
      fromId: userData.id,
      targetName: mailTo.trim(),
      message: mailText,
    })
      .then((response) => {
        const { data } = response;
        this.mailForm.mailText = '';
        this.mailForm.mailTo = '';
        if (data.SUCCESS) {
          toast.success(data.MESSAGE);
        } else {
          toast.error(data.MESSAGE);
        }
      })
      .catch((response) => console.log(response));
  };
}

export default MailStore;
