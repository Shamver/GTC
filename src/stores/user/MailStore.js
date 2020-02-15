import { observable, action } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class MailStore {
  @observable getMailList = [];

  @observable sentMailList = [];

  @observable mailForm = {
    mailTo: '',
    mailText: '',
  };

  @observable viewMail = {};

  constructor(root) {
    this.root = root;
  }

  @action getSentMail = () => {
    const { userData } = this.root.UserStore;
    axios.get('/api/user/mail/sent', {
      params: {
        userId: userData.id,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data) {
          this.sentMailList = data;
        }
      })
      .catch((response) => console.log(response));
  };

  @action getMail = () => {
    const { userData } = this.root.UserStore;
    axios.get('/api/user/mail/get', {
      params: {
        userId: userData.id,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data) {
          this.getMailList = data;
        }
      })
      .catch((response) => console.log(response));
  };

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

  @action deleteMail = ((id) => {
    const { userData } = this.root.UserStore;
    axios.delete('/api/user/mail', {
      data: {
        mailId: id,
        userId: userData.id,
      },
    })
      .then(() => {
        this.viewMail = {};
        this.getMail();
        this.getSentMail();
        toast.info('🚮 쪽지가 삭제되었습니다.');
      })
      .catch((response) => { console.log(response); });
  });

  @action onView = ((data) => {
    const { setTab } = this.root.ComponentMailStore;
    const { readDate, id, targetName } = data;
    const { userData } = this.root.UserStore;

    if (!readDate && targetName === undefined) {
      axios.put('/api/user/mail', {
        mailId: id,
        userId: userData.id,
      })
        .catch((response) => console.log(response));
    }

    this.viewMail = data;
    setTab('view');
  });

  @action onChangeValue = ((e) => {
    this.mailForm[e.target.name] = e.target.value;
  });
}

export default MailStore;
