import { observable, action } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class ReplyStore {
  @observable reply = {
    text: '',
    bpId: '',
  };

  @observable replyEditId = 0;

  @observable modifyModeId = 0;

  @observable postReplyList = [];

  constructor(root) {
    this.root = root;
  }

  @action setReplyEditId = (id) => {
    this.replyEditId = id;
    this.modifyModeId = 0;
  };

  @action modifyMode = (id) => {
    this.modifyModeId = id;
    this.replyEditId = 0;
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
    })
      .then((response) => {
        if (response.data) {
          toast.success('😊 댓글이 정상적으로 등록되었어요!');
          this.reply = {
            text: '',
            bpId: this.reply.bpId,
          };
          this.getReply(this.reply.bpId);
          this.setReplyEditId(0);
        }
      })
      .catch((response) => { console.log(response); });

    return true;
  };

  @action getReply = (id) => {
    axios.get('/api/board/reply/', {
      params: {
        bpId: id,
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
      params: { id },
    })
      .then((response) => {
        if (response.data) {
          toast.success('😊 댓글이 삭제되었어요!');
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
          toast.success('😳 해당 댓글 좋아요 완료!');
        } else if (response.data === 2) {
          toast.error('😳 이미 해당 댓글을 좋아합니다. ㅠㅠ');
        }
      })
      .catch((response) => { console.log(response); });
  };

  @action onChangeReplyValue = (text) => {
    this.reply = {
      ...this.reply,
      text,
    };
  };

  replyValidationCheck = () => {
    if (!this.reply.text.trim()) {
      this.root.UtilStore.toggleAlert('댓글 내용을 입력해주세요.');
      return false;
    }
    return true;
  };

  @action setReplyBpId = (bpId) => {
    this.reply.bpId = bpId;
  };
}

export default ReplyStore;
