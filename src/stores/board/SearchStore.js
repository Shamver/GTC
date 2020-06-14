import { action, observable } from 'mobx';
import { toast } from 'react-toastify';
import axios from "axios";

class SearchStore {
  @observable searchText = '';

  @observable searchedText = '';

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
    this.searchedText = this.searchText;

    await axios.get('/api/board/post/search', {
      params: {
        userId,
        currentPage: page,
        keyword: this.searchedText,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          console.log(data.result);
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
