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
    noticeFl: 0,
  };

  @observable boardPostList = {
    '': [],
    free: [],
    trade: [],
    notice: [],
    cash: [],
    qna: [],
    consult: [],
    crime: [],
    all: [],
  };

  @observable boardPostNoticeList = {
    '': [],
    free: [],
    trade: [],
    notice: [],
    cash: [],
    qna: [],
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

  @observable postMineMaxPage = 0;

  @observable currentPostUpperLower = {
    upper: '',
    lower: '',
  };

  @observable toggleBestPostToken = false;

  @observable replyLockerHash;

  @observable isSearch = false;

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
      notice: this.post.noticeFl,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.root.UtilRouteStore.goBack();
            toast.success(data.message);
            this.setPostClear();
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });

    return true;
  };

  @action modifyPost = async () => {
    if (!this.postValidationCheck()) {
      return false;
    }
    const { userData } = this.root.UserStore;

    await axios.put('/api/board/post', {
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
          this.root.UtilRouteStore.goBack();
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });

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
          this.root.UtilRouteStore.goBack();
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });

    return true;
  };

  @action getBoardPostList = async (board, currentPage) => {
    const { userData } = this.root.UserStore;
    const { searchMode, searchKeyword, searchTarget } = this.root.BoardStore;
    const userId = userData ? userData.id : null;

    if (searchMode) {
      await axios.get('/api/board/post/search', {
        params: {
          board,
          currentPage,
          userId,
          recommend: this.root.BoardStore.bestFilterMode ? 1 : 0,
          keyword: searchKeyword,
          target: searchTarget,
        },
      })
        .then((response) => {
          const { data } = response;
          if (data.success) {
            if (data.code === 1) {
              const realBoard = board.toLowerCase();
              this.boardPostList = {
                ...this.boardPostList,
                [realBoard]: data.result,
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
        .catch((response) => { toast.error(response.message); });
    } else {
      await axios.get('/api/board/post', {
        params: {
          board,
          currentPage,
          userId,
          recommend: this.root.BoardStore.bestFilterMode ? 1 : 0,
        },
      })
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
        .catch((response) => { toast.error(response.message); });
    }
  };

  @action search = () => {
    const { history } = this.root.UtilRouteStore;
    const {
      bestFilterMode, searchMode, searchTarget, searchKeyword,
      currentBoardPath,
    } = this.root.BoardStore;

    const url = `/${currentBoardPath}/page/`;
    let filterUrl;

    if (bestFilterMode && searchMode) {
      filterUrl = `?filter_mode=true&search=${searchKeyword}&search_target=${searchTarget}`;
    } else if (searchMode) {
      filterUrl = `?search=${searchKeyword}&search_target=${searchTarget}`;
    } else if (bestFilterMode) {
      filterUrl = '?filter_mode=true';
    } else {
      filterUrl = '';
    }
    history.push(`${url}1${filterUrl}`);
  };

  @action searchOff = () => {
    const { setKeywordDefault } = this.root.BoardStore;
    this.isSearch = false;
    setKeywordDefault();
  };

  @action getBoardPostNoticeList = async (board, currentPage) => {
    if (currentPage === 1) {
      return;
    }

    const { userData } = this.root.UserStore;
    const userId = userData ? userData.id : null;

    await axios.get('/api/board/post/notice', { params: { board, userId } })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.boardPostNoticeList = {
              ...this.boardPostNoticeList,
              [board]: data.result,
            };
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });
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
      .catch((response) => { toast.error(response.message); });
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
            const { currentBoardPage } = this.root.BoardStore.currentBoardPage;
            const { setCurrentBoardPath } = this.root.BoardStore;
            this.getBoardPostList(post.board.toLowerCase(), currentBoardPage).then(() => {
              setCurrentBoardPath(post.board.toLowerCase());
            });
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });
  };

  @action getModifyPost = (id, isModify) => {
    if (!isModify) {
      return;
    }

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

          if (!isMyPost) {
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
      .catch((response) => { toast.error(response.message); });
  };

  @action getPostUpperLower = async (id) => {
    const that = this;
    const { userData } = this.root.UserStore;
    await axios.get(`/api/board/post/${id}/upperLower`, {
      params: {
        userId: userData.id,
      },
    })
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
      .catch((response) => { toast.error(response.message); });
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
            this.getPost(postId).then();
            toast.success(data.message);
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });
  };

  postValidationCheck = () => {
    // board
    if (!this.post.board) {
      toast.error('게시판을 선택해주세요.');
      return false;
    }

    // category
    if (!this.post.category) {
      toast.error('카테고리를 선택해주세요.');
      return false;
    }

    // title
    if (!this.post.title.trim()) {
      toast.error('제목을 입력해주세요.');
      return false;
    }

    // text
    if (!this.post.text.trim()) {
      toast.error('내용을 입력해주세요.');
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

  @action getPostMine = async (currentPage) => {
    const { userData } = this.root.UserStore;

    await axios.get('/api/board/post/mine', {
      params: {
        userId: userData.id,
        currentPage,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.postMineList = data.result;
            if (data.result.length === 0) {
              this.postMineMaxPage = 0;
            } else {
              const { pageCount } = data.result[0];
              this.postMineMaxPage = pageCount;
            }
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => {
        toast.error(response.message);
      });
  };

  @action getEmbedMedia = async () => {
    await axios.get('iframe.ly/api/oembed?url=https://www.youtube.com/watch?v=iMTblJbmam4&api_key=0037428c3f77431216045c')
      .then((response) => {
        console.log(response.data);
      })
      .catch((response) => {
        toast.error(response.message);
      });
  }

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
      noticeFl: 0,
    };
  }

  @action setClearPostView = () => {
    this.postView = {};
  }

  @action getHash = (hash) => {
    this.replyLockerHash = hash;
  }
}

export default PostStore;
