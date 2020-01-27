import { action, observable } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class PostStore {
  @observable post = {
    board: '',
    category: '',
    title: '',
    text: '',
    depth: '',
    secret: 'N',
    replyAllow: 'Y',
    secretReplyAllow: 'N',
  };

  @observable boardPostList = {
    '': [],
    free: [],
    trade: [],
    notice: [],
    cash: [],
    qna: [],
    crime: [],
  };

  @observable postView = {};

  @observable postMineList = [];

  constructor(root) {
    this.root = root;
  }

  @action addPost = () => {
    if (!this.postValidationCheck()) {
      return false;
    }

    axios.post('/api/board/post', {
      board: this.post.board,
      category: this.post.category,
      title: this.post.title,
      writer: this.root.UserStore.userData.id,
      content: this.post.text,
      depth: 1,
      secret: this.post.secret,
      replyAllow: this.post.replyAllow,
      secretReplyAllow: this.post.secretReplyAllow,
    })
      .then((response) => {
        if (response.data) {
          this.root.UtilRouteStore.history.push('/free');
          toast.success('😊 포스팅이 등록되었어요!');
          this.post = {
            board: '',
            category: '',
            title: '',
            text: '',
            depth: '',
            secret: 'N',
            replyAllow: 'Y',
            secretReplyAllow: 'N',
          };
        }
      })
      .catch((response) => { console.log(response); });

    return true;
  };

  @action getBoardPostList = (board) => {
    axios.get('/api/board/post', { params: { board } })
      .then((response) => {
        if (response.data) {
          this.boardPostList = {
            ...this.boardPostList,
            [board]: response.data,
          };
        }
      })
      .catch((response) => { console.log(response); });
  };

  @action getPost = (id) => {
    axios.get(`/api/board/post/${id}`, {})
      .then((response) => {
        if (response.data) {
          const [post] = response.data;
          this.postView = post;
        }
      })
      .catch((response) => { console.log(response); });
  };

  @action recommendPost = (postId, isRecommend) => {
    axios.post('/api/board/post/recommend', {
      id: postId,
      uId: this.root.UserStore.userData.id,
      type: isRecommend ? 'R01' : 'R02',
    })
      .then((response) => {
        if (response.data === 1) {
          toast.success('😳 해당 포스팅 투표 완료!');
        } else if (response.data === 2) {
          toast.error('😳 이미 해당 포스팅에 투표가 완료되었어요!');
        }
      })
      .catch((response) => { console.log(response); });
  };


  postValidationCheck = () => {
    const { toggleAlert } = this.root.UtilAlertStore;

    // board
    if (!this.post.board) {
      toggleAlert('게시판을 선택해주세요.');
      return false;
    }

    // category
    if (!this.post.category) {
      toggleAlert('카테고리를 선택해주세요.');
      return false;
    }

    // title
    if (!this.post.title.trim()) {
      toggleAlert('제목을 입력해주세요.');
      return false;
    }

    // text
    if (!this.post.text.trim()) {
      toggleAlert('내용을 입력해주세요.');
      return false;
    }

    return true;
  };

  @action onChangeValue = (event) => {
    if (typeof event === 'string') {
      this.post = {
        ...this.post,
        text: event,
      };
    } else if (this.post[event.target.name] === 'Y') {
      this.post = {
        ...this.post,
        [event.target.name]: 'N',
      };
    } else {
      this.post = {
        ...this.post,
        [event.target.name]: event.target.value,
      };
    }
  };

  @action setPostBoard = (board) => {
    this.post.board = board.toUpperCase();
  };

  @action getDataPostMine = (() => {
    const { userData } = this.root.UserStore;

    if (userData) {
      axios.get('/api/board/post/mine', {
        params: {
          userId: userData.id,
        },
      })
        .then((response) => {
          if (response.data) {
            this.postMineList = response.data;
          }
        })
        .catch((response) => {
          console.log(response);
        });
    } else {
      this.postMineList = [];
    }
  });
}

export default PostStore;
