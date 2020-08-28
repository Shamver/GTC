import { action, observable } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class MenuStore {
  @observable menu = {
    id: '',
    type: '',
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
    menu: '',
    name: '',
    path: '',
    desc: '',
    order: '',
    useFl: 1,
  };

  @observable currentMenuType = '';

  @observable menuIcon = '';

  @observable menuList = [];

  @observable categoryList = [];

  @observable permissionLevelList = [];

  @observable useFlagList = [];

  @observable menuTypeList = [];

  @observable isMenuModalToggle = false;

  @observable menuModalMode = '';

  @observable isCategoryModalToggle = false;

  @observable categoryModalMode = '';

  constructor(root) {
    this.root = root;
  }

  @action getMenuList = async () => {
    await axios.get('/api/system/menu/all')
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.menuList = data.result;
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

  @action addMenu = () => {
    if (!this.menuValidationCheck()) {
      return false;
    }

    axios.post('/api/system/menu', this.menu)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
            this.getMenuList().then();
            this.toggleMenuModal('');
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

  @action getMenu = (menu, event) => {
    event.stopPropagation();
    axios.get('/api/system/menu', {
      params: {
        id: menu,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.menu = data.result;
            this.toggleMenuModal('modify');
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });
  };

  @action getUsingMenuList = () => {
    const level = this.root.UserStore.getAuthLevel();
    axios.get('/api/system/menu/use', {
      params: {
        level,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.menuList = data.result;
            this.root.BoardStore.setBoardKinds(data.result);
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

  @action modifyMenu = () => {
    axios.put('/api/system/menu', this.menu)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
            this.getMenuList().then();
            this.toggleMenuModal('');
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

  @action deleteMenu = () => {
    axios.delete('/api/system/menu', {
      params: {
        id: this.menu.id,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
            this.getMenuList().then();
            this.toggleMenuModal('');
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
    axios.post('/api/system/menu/category', this.category)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
            this.getCategoryList(this.category.menu);
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

  @action getCategoryList = (menu, type) => {
    axios.get('/api/system/menu/category/all', {
      params: {
        menu,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.categoryList = data.result;
            this.category.menu = menu;
            this.currentMenuType = type;
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

  @action getCategory = (menu, category) => {
    axios.get('/api/system/menu/category', {
      params: {
        menu,
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
    axios.put('/api/system/menu/category', this.category)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
            this.getCategoryList(this.category.menu);
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
    axios.delete('/api/system/menu/category', {
      params: {
        category: this.category.id,
        menu: this.category.menu,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
            this.getCategoryList(this.category.menu);
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

  @action menuValidationCheck = () => {
    // id
    if (!this.menu.id.trim()) {
      toast.error('게시판을 입력해주세요.');
      return false;
    }

    // name
    if (!this.menu.name.trim()) {
      toast.error('이름을 입력해주세요.');
      return false;
    }

    // path
    if (!this.menu.path.trim()) {
      toast.error('경로를 입력해주세요.');
      return false;
    }

    // order
    if (!this.menu.order.trim()) {
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

  @action setMenuTypeList = (value) => {
    this.menuTypeList = value;
  };

  @action toggleMenuModal = (mode) => {
    if (mode === 'add') {
      this.clearMenu();
    }
    this.isMenuModalToggle = !this.isMenuModalToggle;
    this.menuModalMode = mode;
  }

  @action toggleCategoryModal = (mode) => {
    if (!this.isCategoryModalToggle && !this.category.menu && mode === 'add') {
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

  @action clearMenu = () => {
    this.menu = {
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

    this.menuIcon = '';
  }

  @action setUseFlagList = (value) => {
    this.useFlagList = value;
  }

  @action onChangeMenu = (event) => {
    this.menu = {
      ...this.menu,
      [event.target.name]: event.target.value,
    };
  };

  @action onChangeCategory = (event) => {
    this.category = {
      ...this.category,
      [event.target.name]: event.target.value,
    };
  };

  @action setMenuIcon = () => {
    this.menuIcon = this.menu.icon;
  }

}

export default MenuStore;
