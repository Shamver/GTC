import { observable, action } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class ReplyStore {
  constructor(root) {
    this.root = root;
  }

  @observable modifyModeId = 0;

  @action modifyReply = () => {
    if (!this.root.BoardStore.replyValidationCheck()) return false;

    axios.put('/api/board/reply', {
      id: this.modifyModeId,
      content: this.root.BoardStore.reply.text,
    }).then((response) => {
      if (response.data) {
        toast.success('😊 댓글이 수정되었어요!');
        this.root.BoardStore.reply.text = '';
        this.root.BoardStore.getReply(this.root.BoardStore.reply.bpId);
        this.root.BoardStore.setReplyEditId(0);
        this.modifyModeId = 0;
      }
    })
      .catch((response) => { console.log(response); });

    return true;
  };

  @action modifyMode = (id) => {
    this.modifyModeId = id;
    this.root.BoardStore.replyEditId = 0;
  };

  @action deleteReply = (id) => {
    axios.delete('/api/reply', {
      params: { id },
    })
      .then((response) => {
        if (response.data) {
          toast.success('😊 댓글이 삭제되었어요!');
          this.root.BoardStore.getReply(this.root.BoardStore.reply.bpId);
          this.root.BoardStore.setReplyEditId(0);
          this.modifyModeId = 0;
        }
      })
      .catch((response) => { console.log(response); });

    return true;
  };
}

export default ReplyStore;
