import { action, observable } from 'mobx';
import { toast } from 'react-toastify';

class SearchStore {
  @observable searchText = '';

  @observable searchedText = '';

  constructor(root) {
    this.root = root;
  }

  @action onSubmit = (e) => {
    if (e.key === 'Enter') {
      this.search();
    }
  };

  @action search = () => {
    if (this.searchText.length < 2) {
      toast.error('❗ 검색어는 2자 이상 입력해주세요.');
      return;
    }
    this.searchedText = this.searchText;
    const { history } = this.root.UtilRouteStore;
    history.push('/search');
  };

  @action onChange = (e) => {
    this.searchText = e.target.value;
  }
}

export default SearchStore;
