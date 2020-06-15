import { action, observable } from 'mobx';
import { toast } from 'react-toastify';
import axios from 'axios';

class SearchStore {
  @observable searchText = '';

  @observable foundText = '';

  @observable foundMaxPage = 0;

  @observable foundCount = 0;

  @observable foundList = [];

  constructor(root) {
    this.root = root;
  }

  @action onSubmit = (e) => {
    if (e.key === 'Enter') {
      this.search(1).then(() => {});
    }
  };

  @action search = async (page) => {
    const { history } = this.root.UtilRouteStore;
    const { userData } = this.root.UserStore;
    const userId = userData ? userData.id : null;

    if (this.searchText.length < 2) {
      toast.error('❗ 검색어는 2자 이상 입력해주세요.');
      return;
    }
    this.foundText = this.searchText;

    await axios.get('/api/board/post/search', {
      params: {
        userId,
        currentPage: page,
        keyword: this.foundText,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          console.log(data.result);
          this.foundList = data.result;
          if (data.result.length > 0) {
            this.foundMaxPage = data.result[0].pageCount;
            this.foundCount = data.result[0].count;
          } else {
            this.foundMaxPage = 0;
            this.foundCount = 0;
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });

    history.push('/search');
  };

  @action onChange = (e) => {
    this.searchText = e.target.value;
  }
}

export default SearchStore;
