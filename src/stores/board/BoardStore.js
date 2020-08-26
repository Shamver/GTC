import { action, observable } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class BoardStore {
  @observable boardKinds = {};

  @observable boardList = [];

  @observable boards = [{
    value: 'NOTICE',
    name: '공지사항',
  }, {
    value: 'FREE',
    name: '자유 게시판',
  }, {
    value: 'TRADE',
    name: '아이템 거래',
  }, {
    value: 'CASH',
    name: '월드락 거래',
  }, {
    value: 'CRIME',
    name: '신고 게시판',
  }, {
    value: 'QNA',
    name: '질문 & 답변',
  }, {
    value: 'CONSULT',
    name: '1:1 문의',
  }];

  @observable categories = {
    BFC01: {
      name: '자유',
      path: 'freedom',
    },
    BFC02: {
      name: '잡담',
      path: 'talk',
    },
    BFC03: {
      name: '토론',
      path: 'toron',
    },
    BFC04: {
      name: '건의',
      path: 'gunhee',
    },
    BNC01: {
      name: '이벤트',
      path: 'event',
    },
    BQC01: {
      name: '시세질문',
      path: 'sease',
    },
  };

  @observable currentBoardPath = '';

  @observable currentBoardName = '';

  @observable currentBoardCategories = [];

  @observable bestFilterMode = false;

  @observable searchMode = false;

  @observable currentBoardPage = 1;

  @observable isPagination = false;

  @observable searchKeyword = '';

  @observable searchTarget = 'title';

  @observable boardCategoryCodeList = [];

  constructor(root) {
    this.root = root;
  }

  @action setBoardList = () => {
    const { menuList } = this.root.SystemMenuStore;
    this.boardList = menuList.filter((data) => (data.type === 'MT01' && data.id !== 'ALL'));
  }


  @action setBoardKinds = (arr) => {
    this.boardKinds = {};
    for (let i = 0; i < arr.length; i += 1) {
      this.boardKinds[arr[i].path.replace('/', '')] = arr[i].name;
    }
  }

  @action setIsPagination = (isPagination) => {
    this.isPagination = isPagination;
  };

  @action setCurrentBoardPage = (currentBoardPage) => {
    this.currentBoardPage = currentBoardPage;
  };

  @observable judgeFilterMode = (query) => {
    const { filter_mode: filterMode, search, search_target: searchTarget } = query;
    this.bestFilterMode = !!(query && filterMode && filterMode === 'true');
    this.searchMode = !!(query && search);
    this.searchKeyword = query && search ? search : '';
    this.searchTarget = query && searchTarget ? searchTarget : 'title';
  };

  @action setCurrentBoardPath = (path) => {
    this.currentBoardPath = path;
    this.currentBoardName = this.boardKinds[path];
  };

  @action setCurrentBoardToId = (id) => {
    axios.get('/api/board', { params: { id } })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.currentBoard = data.result;
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });
  };

  @action setCategoryCodeList = (code) => {
    this.currentBoardCategories = code;
  }

  @action moveBoard = (path) => {
    this.root.UtilRouteStore.history.setCurrentBoardToId('/'.concat(path.toLowerCase()));
  };

  @action boardPathCheck = (path) => {
    const { boardPostList } = this.root.BoardPostStore;
    const { history } = this.root.UtilRouteStore;
    if (!boardPostList[path]) {
      toast.warn('😳 존재하지 않는 게시판입니다.');
      history.push('/');
    }
  };

  @action onSubmit = (e) => {
    if (e.key === 'Enter') {
      this.onSearch();
    }
  };

  @action onSearch = () => {
    const { search } = this.root.BoardPostStore;

    if (this.searchKeyword.length < 2) {
      toast.error('❗ 검색어는 2자 이상 입력해주세요.');
      return;
    }

    this.searchMode = true;
    search();
  };

  @action onChangeTarget = (e) => {
    this.searchTarget = e.target.value;
  };

  @action onChange = (e) => {
    this.searchKeyword = e.target.value;
  };

  @action setKeywordDefault = () => {
    this.searchKeyword = '';
  }
}

export default BoardStore;
