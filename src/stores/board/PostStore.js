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
    secretFl: 0,
    commentAllowFl: 1,
    secretCommentAllowFl: 0,
  };

  @observable boardPostList = {
    '': [],
    free: [],
    trade: [],
    notice: [],
    cash: [],
    qna: [],
    faq: [],
    consult: [],
    crime: [],
    all: [],
  };

  @observable homePostList = {
    free: [],
    cash: [],
    trade: [],
    notice: [],
    qna: [],
    all: [],
  };

  @observable currentBoardMaxPage = 0;

  @observable postView = {
    id: 0,
  };

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
      secret: this.post.secretFl,
      replyAllow: this.post.commentAllowFl,
      secretReplyAllow: this.post.secretCommentAllowFl,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.root.UtilRouteStore.history.push('/free');
            toast.success('😊 포스팅이 등록되었어요!');
            this.setPostClear();
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

  @action modifyPost = () => {
    if (!this.postValidationCheck()) {
      return false;
    }
    const { userData } = this.root.UserStore;

    axios.put('/api/board/post', {
      id: this.post.id,
      board: this.post.board,
      category: this.post.category,
      title: this.post.title,
      writer: this.root.UserStore.userData.id,
      content: this.post.text,
      secret: this.post.secretFl,
      replyAllow: this.post.commentAllowFl,
      secretReplyAllow: this.post.secretCommentAllowFl,
      userId: userData.id,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.root.UtilRouteStore.history.push('/free');
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { console.log(response); });

    return true;
  };

  @action deletePost = (id) => {
    axios.delete('/api/board/post', {
      params: {
        id,
        writer: this.root.UserStore.userData.id,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.root.UtilRouteStore.history.push('/free');
          toast.success(data.message);
        } else {
          toast.error(data.message);
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
        if (data.success) {
          if (data.code === 1) {
            this.boardPostList = {
              ...this.boardPostList,
              [board]: data.result,
            };

            // 게시글 가져올때 MAX 카운트 셋
            if (data.result.length === 0) {
              this.currentBoardMaxPage = 0;
            } else {
              const { pageCount } = data.result[0];
              this.currentBoardMaxPage = pageCount;
            }
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { console.log(response); });
  };

  @action getHomePostList = async (board) => {
    const { userData } = this.root.UserStore;
    const userId = userData ? userData.id : null;

    await axios.get('/api/board/post', {
      params: {
        board,
        userId,
        currentPage: 1,
        isHome: true,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.homePostList[board] = data.result;
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { console.log(response); });
  };

  @action getPost = async (id) => {
    const { getLately } = this.root.CookieLatelyStore;
    const { userData } = this.root.UserStore;
    const that = this;

    await axios.get(`/api/board/post/${id}`, {
      params: {
        userId: userData.id,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            const [post] = data.result;
            that.postView = post;
            getLately();
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { console.log(response); });
  };

  @action getModifyPost = (id, isModify = false) => {
    const { userData } = this.root.UserStore;
    const { history } = this.root.UtilRouteStore;
    axios.get(`/api/board/post/${id}`, {
      params: {
        userId: userData.id,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          const {
            board, category, title, content,
            secretFl, commentAllowFl, secretCommentAllowFl, isMyPost,
          } = data.result[0];

          if (isModify && !isMyPost) {
            toast.error('수정권한이 없는 게시물입니다.');
            history.push('/');
          }

          this.post = {
            ...this.post,
            id,
            board,
            category,
            title,
            secretFl,
            commentAllowFl,
            secretCommentAllowFl,
            text: content,
          };
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { console.log(response); });
  };

  @action getPostUpperLower = async (id) => {
    const that = this;
    await axios.get(`/api/board/post/${id}/upperLower`)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            const array = data.result;

            // 기존에 있던 데이터를 초기화
            that.currentPostUpperLower = {
              upper: '',
              lower: '',
            };

            for (let i = 0; i < array.length; i += 1) {
              const { isUpper } = array[i];
              if (isUpper) {
                that.currentPostUpperLower.upper = array[i];
              } else {
                that.currentPostUpperLower.lower = array[i];
              }
            }
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
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
        if (data.success) {
          if (data.code === 1) {
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
    // 에디터 수정 시
    if (typeof event === 'string') {
      this.post = {
        ...this.post,
        text: event,
      };
      return;
    }

    // Flag 형식의 checkbox 값 변경시
    if (event.target.name.indexOf('Fl') > -1) {
      if (this.post[event.target.name]) {
        this.post = {
          ...this.post,
          [event.target.name]: 0,
        };
      } else {
        this.post = {
          ...this.post,
          [event.target.name]: 1,
        };
      }
      return;
    }

    // 일반적인 값 변경
    this.post = {
      ...this.post,
      [event.target.name]: event.target.value,
    };
  };

  @action setPostBoard = (board) => {
    this.post.board = board.toUpperCase();
  };

  @action getPostMine = () => {
    const { userData } = this.root.UserStore;

    if (userData) {
      axios.get('/api/board/post/mine', {
        params: {
          userId: userData.id,
        },
      })
        .then((response) => {
          const { data } = response;
          if (data.success) {
            if (data.code === 1) {
              this.postMineList = data.result;
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
      this.postMineList = [];
    }
  };

  @action setPostClear = () => {
    this.post = {
      board: '',
      category: '',
      title: '',
      text: '',
      depth: '',
      secretFl: 0,
      commentAllowFl: 1,
      secretCommentAllowFl: 0,
    };
  }

  @action setClearPostView = () => {
    this.postView = {};
  }
}

export default PostStore;
