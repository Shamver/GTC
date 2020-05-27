import { observable, action } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class ReplyStore {
  @observable reply = {
    text: '',
    bpId: '',
    secretFl: 0,
  };

  @observable replyEditId = 0;

  @observable modifyModeId = 0;

  @observable postReplyList = [];

  @observable replyMineList = [];

  @observable CurrentReplyOption = {
    commentAllowFl: '',
    secretCommentAllowFl: '',
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
          if (data.success) {
            if (data.code === 1) {
              this.replyMineList = data.result;
            } else {
              toast.info(data.message);
            }
          } else {
            toast.error(data.message);
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

  @action setReplyOption = (commentAllowFl, secretCommentAllowFl) => {
    this.CurrentReplyOption = {
      commentAllowFl,
      secretCommentAllowFl,
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
      secretYN: this.reply.secretFl,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
            this.reply = {
              text: '',
              bpId: this.reply.bpId,
              secretFl: 0,
            };
            this.getReply(this.reply.bpId);
            this.setReplyEditId(0);
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
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
        if (data.success) {
          if (data.code === 1) {
            this.postReplyList = data.result;
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
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
      if (data.success) {
        if (data.code === 1) {
          toast.success(data.message);
          this.reply.text = '';
          this.getReply(this.reply.bpId);
          this.setReplyEditId(0);
          this.modifyModeId = 0;
        } else {
          toast.info(data.message);
        }
      } else {
        toast.error(data.message);
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
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
            this.reply.text = '';
            this.getReply(this.reply.bpId);
            this.setReplyEditId(0);
            this.modifyModeId = 0;
          } else {
            toast.info(data.message);
          }
          this.getReply(this.reply.bpId);
          this.setReplyEditId(0);
          this.modifyModeId = 0;
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { console.log(response); });

    return true;
  };

  @action likeReply = (replyId, bpId) => {
    const { getReply } = this;
    axios.post('/api/board/reply/like', {
      id: replyId,
      uId: this.root.UserStore.userData.id,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            getReply(bpId);
            toast.success(data.message);
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
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
      return;
    }

    // Flag 형식의 checkbox 값 변경시
    if (event.target.name.indexOf('Fl') > -1) {
      if (this.reply[event.target.name]) {
        this.reply = {
          ...this.reply,
          [event.target.name]: 0,
        };
      } else {
        this.reply = {
          ...this.reply,
          [event.target.name]: 1,
        };
      }
      return;
    }

    // 일반적인 값 변경
    this.reply = {
      ...this.reply,
      [event.target.name]: event.target.value,
    };
  };

  replyValidationCheck = () => {
    if (!this.reply.text.trim()) {
      toast.error('댓글 내용을 입력해주세요.');
      return false;
    }
    return true;
  };

  @action setReplyBpId = (bpId) => {
    this.reply.bpId = bpId;
  };

  @action setCommentClear = () => {
    this.reply = {
      text: '',
      bpId: '',
      secretFl: 0,
    };
  }
}

export default ReplyStore;
