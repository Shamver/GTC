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

  @observable currentBoardMaxPage = 0;

  @observable postView = {};

  @observable postMineList = [];

  @observable currentPostUpperLower = {
    upper: '',
    lower: '',
  };

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
        const { data } = response;
        if (data.SUCCESS) {
          if (data.CODE === 1) {
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

  @action getBoardPostList = (board, currentPage) => {
    const { userData } = this.root.UserStore;
    const userId = userData ? userData.id : null;

    axios.get('/api/board/post', { params: { board, currentPage, userId } })
      .then((response) => {
        const { data } = response;
        if (data.SUCCESS) {
          if (data.CODE === 1) {
            this.boardPostList = {
              ...this.boardPostList,
              [board]: data.DATA,
            };

            // 게시글 가져올때 MAX 카운트 셋
            if (data.DATA.length === 0) {
              this.currentBoardMaxPage = 0;
            } else {
              const { pageCount } = data.DATA[0];
              this.currentBoardMaxPage = pageCount;
            }
          } else {
            toast.info(data.MESSAGE);
          }
        } else {
          toast.error(data.MESSAGE);
        }
      })
      .catch((response) => { console.log(response); });
  };

  @action getPost = (id) => {
    const { getLately } = this.root.CookieLatelyStore;
    const { userData } = this.root.UserStore;

    axios.get(`/api/board/post/${id}`, {
      params: {
        userId: userData.id,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.SUCCESS) {
          if (data.CODE === 1) {
            const [post] = data.DATA;
            this.postView = post;
            getLately();
          } else {
            toast.info(data.MESSAGE);
          }
        } else {
          toast.error(data.MESSAGE);
        }
      })
      .catch((response) => { console.log(response); });
  };

  @action getPostUpperLower = (id) => {
    axios.get(`/api/board/post/${id}/upperLower`, {})
      .then((response) => {
        const { data } = response;
        if (data.SUCCESS) {
          if (data.CODE === 1) {
            const array = data.DATA;

            // 기존에 있던 데이터를 초기화
            this.currentPostUpperLower = {
              upper: '',
              lower: '',
            };

            for (let i = 0; i < array.length; i += 1) {
              const { upperOrLower } = array[i];
              if (upperOrLower === 'upper') {
                this.currentPostUpperLower.upper = array[i];
              } else {
                this.currentPostUpperLower.lower = array[i];
              }
            }
          } else {
            toast.info(data.MESSAGE);
          }
        } else {
          toast.error(data.MESSAGE);
        }
      })
      .catch((response) => { console.log(response); });
  };

  @action recommendPost = (postId, type) => {
    axios.post('/api/board/post/recommend', {
      id: postId,
      uId: this.root.UserStore.userData.id,
      type,
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

  @action getPostMine = (() => {
    const { userData } = this.root.UserStore;

    if (userData) {
      axios.get('/api/board/post/mine', {
        params: {
          userId: userData.id,
        },
      })
        .then((response) => {
          const { data } = response;
          if (data.SUCCESS) {
            if (data.CODE === 1) {
              this.postMineList = data.DATA;
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
      this.postMineList = [];
    }
  });
}

export default PostStore;
