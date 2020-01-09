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

    }).then((response) => {
      if (response.data) {
        toast.success('😊 댓글이 수정되었어요!');
        this.root.BoardStore.reply.text = '';
      }
    })
      .catch((response) => { console.log(response); });

    return true;
  };

  @action modifyMode = (id) => {
    this.modifyModeId = id;
  };

    return true;
  };
}

export default ReplyStore;
