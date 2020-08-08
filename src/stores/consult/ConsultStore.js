import { action, observable } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class ConsultStore {
  @observable consultCategoryCodeList = [];

  @observable myConsultList = [];

  @observable consultList = [];

  @observable maxPage = 0;

  @observable adminMaxPage = 0;

  @observable currentCategory = '';

  @observable subject = '';

  @observable text = '';

  @observable isDisabled = true;

  @observable timer;

  constructor(root) {
    this.root = root;
  };

  @action setCategoryCodeList = (code) => {
    this.consultCategoryCodeList = code;
  };

  @action onChangeCategory = (e) => {
    this.currentCategory = e.target.value;

    this.isDisabled = true;

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.validation();
    }, 300);
  };

  @action onChangeValue = (e) => {
    const { target } = e;
    const { name, value } = target;
    this[name] = value;
    this.isDisabled = true;

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.validation();
    }, 300);
  };

  @action validation = () => {
    const {
      subject, text, currentCategory,
    } = this;

    this.isDisabled = subject === ''
      || text === ''
      || currentCategory === ''
      || text.length > 200;
  };

  @action getMyConsultList = async (currentPage) => {
    const { userData } = this.root.UserStore;
    const { id } = userData;

    await axios.get('/api/consult', {
      params: {
        currentPage,
        userId: id,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.myConsultList = data.result;
            if (data.result.length === 0) {
              this.maxPage = 0;
            } else {
              const { pageCount } = data.result[0];
              this.maxPage = pageCount;
            }
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });
  };

  @action getConsultList = async (currentPage) => {
    const { userData } = this.root.UserStore;
    const { adminYN } = userData;

    if (!adminYN) return;

    await axios.get('/api/consult/admin', {
      params: {
        currentPage,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.consultList = data.result;
            if (data.result.length === 0) {
              this.adminMaxPage = 0;
            } else {
              const { pageCount } = data.result[0];
              this.adminMaxPage = pageCount;
            }
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });
  };

  @action addConsult = async (currentPage) => {
    if (this.isDisabled) {
      toast.error('비활성화 상태입니다.');
      return;
    }

    const { userData } = this.root.UserStore;
    const { subject, text, currentCategory } = this;

    axios.post('/api/consult', {
      userId: userData.id,
      subject,
      text,
      currentCategory,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
            this.getConsultList(currentPage);
            this.setConsultClear();
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });
  };

  @action setConsultClear = () => {
    this.currentCategory = '';
    this.isDisabled = true;
    this.subject = '';
    this.text = '';
    clearTimeout(this.timer);
  }
}

export default ConsultStore;
