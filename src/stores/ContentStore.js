import { observable } from 'mobx';
import React from 'react';
import history from '../history';

class ContentStore extends React.Component {
  @observable history_ = history;
}

export default new ContentStore();
