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
          if (response.data) {
            this.replyMineList = response.data;
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
        if (response.data) {
          toast.success('😊 댓글이 정상적으로 등록되었어요!');
          this.reply = {
            text: '',
            bpId: this.reply.bpId,
            secretYN: 'N',
          };
          this.getReply(this.reply.bpId);
          this.setReplyEditId(0);
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
        if (response.data) {
          this.postReplyList = response.data;
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
      if (response.data) {
        toast.success('😊 댓글이 수정되었어요!');
        this.reply.text = '';
        this.getReply(this.reply.bpId);
        this.setReplyEditId(0);
        this.modifyModeId = 0;
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
        if (response.data) {
          console.log(response.data);
          if (response.data === 1) {
            toast.success('😊 댓글이 삭제되었어요!');
          } else if (response.data === 2) {
            toast.error('😳 해당 댓글에 답글이 달려있어 삭제하지 못해요!');
          }

          this.getReply(this.reply.bpId);
          this.setReplyEditId(0);
          this.modifyModeId = 0;
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
        if (response.data === 1) {
          toast.success('😊 해당 댓글 좋아요 완료!');
        } else if (response.data === 2) {
          toast.error('😳 이미 해당 댓글을 좋아합니다. ㅠㅠ');
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
