import { observable, action } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class ReplyStore {
  @observable reply = {
    text: '',
    bpId: '',
    secretYN: 'N',
  };

  @observable replyEditId = 0;

  @observable modifyModeId = 0;

  @observable postReplyList = [];

  @observable replyMineList = [];

  @observable CurrentReplyOption = {
    replyAllow: '',
    secretReplyAllow: '',
  };

  constructor(root) {
    this.root = root;
  }

  @action getDataReplyMine = (() => {
    const { userData } = this.root.UserStore;

    if (userData) {
      axios.get('/api/board/reply/mine', {
        params: {
          userId: userData.id,
        },
      })
        .then((response) => {
          const { data } = response;
          if (data.SUCCESS) {
            if (data.CODE === 1) {
              this.replyMineList = data.DATA;
            } else {
              toast.info(data.MESSAGE);
            }
          } else {
            toast.error(data.MESSAGE);
          }
        })
        .catch((response) => {
          console.log(response);
        });
    } else {
      this.replyMineList = [];
    }
  });

  @action setReplyEditId = (id) => {
    this.replyEditId = id;
    this.modifyModeId = 0;
  };

  @action modifyMode = (id) => {
    this.modifyModeId = id;
    this.replyEditId = 0;
  };

  @action setReplyOption = (replyAllow, secretReplyAllow) => {
    this.CurrentReplyOption = {
      replyAllow,
      secretReplyAllow,
    };
  };

  @action addReply = () => {
    if (!this.replyValidationCheck()) {
      return false;
    }
    axios.post('/api/board/reply', {
      text: this.reply.text,
      writer: this.root.UserStore.userData.id,
      bpId: this.reply.bpId,
      replyId: this.replyEditId === 0 ? null : this.replyEditId,
      depth: this.replyEditId === 0 ? 1 : 2,
      secretYN: this.reply.secretYN,
    })
      .then((response) => {
        const { data } = response;
        if (data.SUCCESS) {
          if (data.CODE === 1) {
            toast.success(data.MESSAGE);
            this.reply = {
              text: '',
              bpId: this.reply.bpId,
              secretYN: 'N',
            };
            this.getReply(this.reply.bpId);
            this.setReplyEditId(0);
          } else {
            toast.info(data.MESSAGE);
          }
        } else {
          toast.error(data.MESSAGE);
        }
      })
      .catch((response) => { console.log(response); });

    return true;
  };

  @action getReply = (id) => {
    const { userData } = this.root.UserStore;
    const userId = userData ? userData.id : null;

    axios.get('/api/board/reply/', {
      params: {
        bpId: id,
        userId,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.SUCCESS) {
          if (data.CODE === 1) {
            this.postReplyList = data.DATA;
          } else {
            toast.info(data.MESSAGE);
          }
        } else {
          toast.error(data.MESSAGE);
        }
      })
      .catch((response) => { console.log(response); });
  };

  @action modifyReply = () => {
    if (!this.replyValidationCheck()) return false;

    axios.put('/api/board/reply', {
      id: this.modifyModeId,
      content: this.reply.text,
    }).then((response) => {
      const { data } = response;
      if (data.SUCCESS) {
        if (data.CODE === 1) {
          toast.success(data.MESSAGE);
          this.reply.text = '';
          this.getReply(this.reply.bpId);
          this.setReplyEditId(0);
          this.modifyModeId = 0;
        } else {
          toast.info(data.MESSAGE);
        }
      } else {
        toast.error(data.MESSAGE);
      }
    })
      .catch((response) => { console.log(response); });

    return true;
  };

  @action deleteReply = (id) => {
    axios.delete('/api/board/reply', {
      params: {
        id,
        writer: this.root.UserStore.userData.id,
        bpId: this.reply.bpId,
        replyId: id,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.SUCCESS) {
          if (data.CODE === 1) {
            toast.success(data.MESSAGE);
            this.reply.text = '';
            this.getReply(this.reply.bpId);
            this.setReplyEditId(0);
            this.modifyModeId = 0;
          } else {
            toast.info(data.MESSAGE);
          }
          this.getReply(this.reply.bpId);
          this.setReplyEditId(0);
          this.modifyModeId = 0;
        } else {
          toast.error(data.MESSAGE);
        }
      })
      .catch((response) => { console.log(response); });

    return true;
  };

  @action likeReply = (replyId) => {
    axios.post('/api/board/reply/like', {
      id: replyId,
      uId: this.root.UserStore.userData.id,
    })
      .then((response) => {
        const { data } = response;
        if (data.SUCCESS) {
          if (data.CODE === 1) {
            toast.success(data.MESSAGE);
          } else {
            toast.info(data.MESSAGE);
          }
        } else {
          toast.error(data.MESSAGE);
        }
      })
      .catch((response) => { console.log(response); });
  };

  @action onChangeValue = (event) => {
    if (typeof event === 'string') {
      this.reply = {
        ...this.reply,
        text: event,
      };
    } else if (this.reply[event.target.name] === 'Y') {
      this.reply = {
        ...this.reply,
        [event.target.name]: 'N',
      };
    } else {
      this.reply = {
        ...this.reply,
        [event.target.name]: event.target.value,
      };
    }
  };

  replyValidationCheck = () => {
    const { toggleAlert } = this.root.UtilAlertStore;

    if (!this.reply.text.trim()) {
      toggleAlert('댓글 내용을 입력해주세요.');
      return false;
    }
    return true;
  };

  @action setReplyBpId = (bpId) => {
    this.reply.bpId = bpId;
  };
}

export default ReplyStore;
