import { action, observable } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class BoardStore {
  @observable board = {
    id: '',
    name: '',
    path: '',
    order: '',
    useFl: 1,
    permissionLevel: 0,
    icon: '',
    desc: '',
  };

  @observable category = {
    id: '',
    board: '',
    name: '',
    path: '',
    desc: '',
    order: '',
    useFl: 1,
  };

  @observable boardIcon = '';

  @observable boardList = [];

  @observable categoryList = [];

  @observable permissionLevelList = [];

  @observable useFlagList = [];

  @observable isBoardModalToggle = false;

  @observable boardModalMode = '';

  @observable isCategoryModalToggle = false;

  @observable categoryModalMode = '';

  constructor(root) {
    this.root = root;
  }

  @action getBoardList = async () => {
    await axios.get('/api/system/board/all')
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.boardList = data.result;
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

  @action addBoard = () => {
    if (!this.boardValidationCheck()) {
      return false;
    }

    axios.post('/api/system/board', this.board)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
            this.getBoardList().then();
            this.toggleBoardModal('');
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

  @action getBoard = (board, event) => {
    event.stopPropagation();
    axios.get('/api/system/board', {
      params: {
        board,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.board = data.result;
            this.toggleBoardModal('modify');
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });
  };

  @action modifyBoard = () => {
    axios.put('/api/system/board', this.board)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
            this.getBoardList().then();
            this.toggleBoardModal('');
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

  @action deleteBoard = () => {
    axios.delete('/api/system/board', {
      params: {
        board: this.board.id,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
            this.getBoardList().then();
            this.toggleBoardModal('');
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

  // Category Start

  @action addCategory = () => {
    if (!this.categoryValidationCheck()) {
      return false;
    }
    axios.post('/api/system/board/category', this.category)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
            this.getCategoryList(this.category.board);
            this.toggleCategoryModal('');
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

  @action getCategoryList = (board) => {
    axios.get('/api/system/board/category/all', {
      params: {
        board,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.categoryList = data.result;
            this.category.board = board;
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

  @action getCategory = (board, category) => {
    axios.get('/api/system/board/category', {
      params: {
        board,
        category,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.category = data.result;
            this.toggleCategoryModal('modify');
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });
  };

  @action modifyCategory = () => {
    axios.put('/api/system/board/category', this.category)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
            this.getCategoryList(this.category.board);
            this.toggleCategoryModal('');
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

  @action deleteCategory = () => {
    axios.delete('/api/system/board/category', {
      params: {
        category: this.category.id,
        board: this.category.board,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
            this.getCategoryList(this.category.board);
            this.toggleCategoryModal('');
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

  @action boardValidationCheck = () => {
    // id
    if (!this.board.id.trim()) {
      toast.error('게시판을 입력해주세요.');
      return false;
    }

    // name
    if (!this.board.name.trim()) {
      toast.error('이름을 입력해주세요.');
      return false;
    }

    // path
    if (!this.board.path.trim()) {
      toast.error('경로를 입력해주세요.');
      return false;
    }

    // order
    if (!this.board.order.trim()) {
      toast.error('순서를 제대로 입력해주세요.');
      return false;
    }

    return true;
  };

  @action categoryValidationCheck = () => {
    // id
    if (!this.category.id.trim()) {
      toast.error('게시판을 입력해주세요.');
      return false;
    }

    // name
    if (!this.category.name.trim()) {
      toast.error('이름을 입력해주세요.');
      return false;
    }

    // path
    if (!this.category.path.trim()) {
      toast.error('경로를 입력해주세요.');
      return false;
    }

    // order
    if (!this.category.order.trim()) {
      toast.error('순서를 제대로 입력해주세요.');
      return false;
    }

    return true;
  };

  @action setPermissionLevelList = (value) => {
    this.permissionLevelList = value;
  };

  @action toggleBoardModal = (mode) => {
    if (mode === 'add') {
      this.clearBoard();
    }
    this.isBoardModalToggle = !this.isBoardModalToggle;
    this.boardModalMode = mode;
  }

  @action toggleCategoryModal = (mode) => {
    if (!this.isCategoryModalToggle && !this.category.board && mode === 'add') {
      toast.warn('😳 먼저 게시판을 선택해주세요.');
      return false;
    }

    if (mode === 'add') {
      this.clearCategory();
    }
    this.isCategoryModalToggle = !this.isCategoryModalToggle;
    this.categoryModalMode = mode;

    return true;
  }

  @action clearBoard = () => {
    this.board = {
      id: '',
      name: '',
      path: '',
      order: '',
      useFl: 1,
      permissionLevel: 0,
      desc: '',
    };
  }

  @action clearCategory = () => {
    this.category = {
      ...this.category,
      id: '',
      name: '',
      path: '',
      desc: '',
      order: '',
      useFl: 1,
    };

    this.boardIcon = '';
  }

  @action setUseFlagList = (value) => {
    this.useFlagList = value;
  }

  @action onChangeBoard = (event) => {
    this.board = {
      ...this.board,
      [event.target.name]: event.target.value,
    };
  };

  @action onChangeCategory = (event) => {
    this.category = {
      ...this.category,
      [event.target.name]: event.target.value,
    };
  };

  @action setBoardIcon = () => {
    this.boardIcon = this.board.icon;
  }
}

export default BoardStore;
