import { action, observable } from 'mobx';
import { toast } from 'react-toastify';
import axios from 'axios';

class SearchStore {
  @observable searchText = '';

  @observable foundText = '';

  @observable foundMaxPage = 0;

  @observable foundCount = 0;

  @observable foundList = [];

  @observable currentSearchPage = 1;

  @observable isPagination = false;

  constructor(root) {
    this.root = root;
  }

  @action setIsPagination = (isPagination) => {
    this.isPagination = isPagination;
  };

  @action setCurrentSearchPage = (currentSearchPage) => {
    this.currentSearchPage = currentSearchPage;
  };

  @observable judgeFilterMode = (query) => {
    const { search } = query;
    this.foundText = query && search ? search : '';
  };

  @action onSubmit = (e) => {
    if (e.key === 'Enter') {
      this.onSearch();
    }
  };

  @action onSearch = () => {
    const { history } = this.root.UtilRouteStore;

    if (this.searchText.length < 2) {
      toast.error('❗ 검색어는 2자 이상 입력해주세요.');
      return;
    }
    this.foundText = this.searchText;

    history.push(`/search?search=${this.foundText}`);
  };

  @action search = async (page) => {
    const { userData } = this.root.UserStore;
    const userId = userData ? userData.id : null;

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
          this.foundList = data.result.map((item) => {
            let result = item;
            if (item.isMedia) {
              const thumbnail = this.getPostVideoThumbnailUrl(item.content);
              result = {
                ...result,
                thumbnail,
              };
            }
            return result;
          });
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
  };


  @action getPostVideoThumbnailUrl = (text) => {
    if (!text) return text;

    const fullReg = /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([^& \n"><]+)(?:[^ \n"><]+)?/g;
    const oembedReg = /(?:)<oembed(.+?)<\/oembed>/g;

    let resultUrl = text;

    const oembedMatch = text.match(oembedReg);

    if (oembedMatch && oembedMatch.length > 0) {
      const matchParts = oembedMatch[0].split(fullReg);
      resultUrl = `https://img.youtube.com/vi/${matchParts[4]}/0.jpg`;
    }

    return resultUrl;
  };

  @action onChange = (e) => {
    this.searchText = e.target.value;
  }
}

export default SearchStore;
